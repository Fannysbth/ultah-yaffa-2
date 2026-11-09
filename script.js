(() => {
  "use strict";

  const content = window.STORY_CONTENT;
  const STORAGE_KEY = "save-file-06-progress-v1";
  const FRAGMENTS = ["gallery", "signals", "messages"];
  const state = loadState();
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let currentQuizQuestion = 0;
  let previousFocus = null;
  let toastTimer;

  function loadState() {
    const initial = { opened: false, visitedRooms: [], collectedFragments: [], quizCompleted: false, finalUnlocked: false };
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!parsed || typeof parsed !== "object") return initial;
      return {
        ...initial,
        opened: parsed.opened === true,
        visitedRooms: Array.isArray(parsed.visitedRooms) ? parsed.visitedRooms.filter(id => ["gallery", "signals", "messages"].includes(id)) : [],
        collectedFragments: Array.isArray(parsed.collectedFragments) ? parsed.collectedFragments.filter(id => FRAGMENTS.includes(id)) : [],
        quizCompleted: parsed.quizCompleted === true,
        finalUnlocked: parsed.finalUnlocked === true
      };
    } catch { return initial; }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { /* Private browsing or blocked storage: the story remains playable in memory. */ }
  }

  function maybeUnlock() {
    state.finalUnlocked = FRAGMENTS.every(id => state.collectedFragments.includes(id)) && state.quizCompleted;
    saveState();
    renderProgress();
  }

  function renderProgress() {
    const count = state.collectedFragments.length;
    $("#fragment-count").textContent = String(count);
    $("#progress-label").textContent = `${count + (state.quizCompleted ? 1 : 0)} / 4 recovered`;
    $("#progress-fill").style.width = `${((count + (state.quizCompleted ? 1 : 0)) / 4) * 100}%`;
    FRAGMENTS.forEach(id => {
      const button = $(`[data-room="${id}"]`);
      const tag = $(`#room-state-${id}`);
      if (button && tag) {
        const visited = state.visitedRooms.includes(id);
        const collected = state.collectedFragments.includes(id);
        tag.textContent = collected ? "RECOVERED ✓" : visited ? "VISITED ↗" : "ENTER ↗";
        button.classList.toggle("is-collected", collected);
      }
    });
    $("#gate-status").textContent = state.finalUnlocked ? "READY" : "LOCKED";
    $("#open-ending").disabled = !state.finalUnlocked;
    $("#gate-copy").textContent = state.finalUnlocked
      ? "The file is ready. There is one more thing to tell you."
      : `Recover ${3 - count} more memory fragment${count === 2 ? "" : "s"} and finish the little quest to continue.`;
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2500);
  }

  function setupScrollAnimations() {
    const sections = $$("#story > .chapter-pad, #story > .quiet-page, #story > .letter-section");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      sections.forEach(section => section.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach(section => {
      section.classList.add("reveal-on-scroll");
      observer.observe(section);
    });
  }

  function textOrPlaceholder(value, fallback) {
    return typeof value === "string" && value.trim() ? value : fallback;
  }

  function renderProfile() {
    $("#character-name").textContent = content.character.name;
    $$("[data-profile]").forEach(button => {
      const key = button.dataset.profile;
      const value = content.character[key];
      $("strong", button).textContent = textOrPlaceholder(value, "[NOT ENTERED]");
      button.addEventListener("click", () => {
        $("#profile-note").textContent = textOrPlaceholder(content.character.annotations?.[key], "No annotation filed yet.");
        $$("[data-profile]").forEach(item => item.classList.toggle("active", item === button));
      });
    });
  }

  function makeArchiveCard(item, index, roomId) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `archive-item archive-${roomId}`;
    button.setAttribute("aria-label", `${item.archiveId || `Archive item ${index + 1}`}: ${item.alt || "open item"}`);
    if (item.src) {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt || "Personal archive image";
      image.loading = "lazy";
      image.decoding = "async";
      button.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "image-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><i>IMAGE<br>NOT FILED</i>`;
      button.append(placeholder);
    }
    const caption = document.createElement("span");
    caption.className = "archive-caption";
    caption.textContent = item.archiveId || item.caption || `IMAGE ${String(index + 1).padStart(2, "0")}`;
    button.append(caption);
    if (item.hasFragment) {
      const marker = document.createElement("span");
      marker.className = "fragment-marker";
      marker.textContent = "FRAGMENT INSIDE";
      button.append(marker);
    }
    button.addEventListener("click", () => openViewer(item, index, roomId));
    return button;
  }

  function openRoom(roomId) {
    const room = content.rooms[roomId];
    if (!room) return;
    state.visitedRooms = [...new Set([...state.visitedRooms, roomId])];
    saveState();
    const panel = $("#room-panel");
    $("#room-kicker").textContent = `ARCHIVE ROOM / ${roomId.toUpperCase()}`;
    $("#room-title").textContent = room.title;
    const target = $("#room-content");
    target.replaceChildren();
    const description = document.createElement("p");
    description.className = "room-description";
    description.textContent = room.description;
    target.append(description);
    const grid = document.createElement("div");
    grid.className = `archive-layout archive-layout-${roomId}`;
    room.items.forEach((item, index) => grid.append(makeArchiveCard(item, index, roomId)));
    target.append(grid);
    panel.hidden = false;
    panel.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    renderProgress();
  }

  function openViewer(item, index, roomId) {
    const dialog = $("#viewer");
    previousFocus = document.activeElement;
    $("#viewer-label").textContent = item.archiveId || `${roomId.toUpperCase()} / ITEM ${String(index + 1).padStart(2, "0")}`;
    $("#viewer-caption").textContent = [item.caption, item.metadata].filter(Boolean).join(" — ");
    const body = $("#viewer-content");
    body.replaceChildren();
    if (item.src) {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt || "Personal archive image";
      body.append(image);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "viewer-placeholder";
      placeholder.textContent = "IMAGE NOT FILED — ADD THE ASSET PATH IN content.js";
      body.append(placeholder);
    }
    const collect = $("#collect-fragment");
    const canCollect = item.hasFragment && !state.collectedFragments.includes(roomId);
    collect.hidden = !canCollect;
    collect.onclick = () => {
      state.collectedFragments = [...new Set([...state.collectedFragments, roomId])];
      maybeUnlock();
      dialog.close();
      showToast("Memory fragment recovered.");
      renderProgress();
    };
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    $("#viewer-close").focus();
  }

  function renderQuiz() {
    const box = $("#quiz-box");
    box.replaceChildren();
    if (state.quizCompleted) {
      const result = document.createElement("p");
      result.className = "quiz-complete";
      result.textContent = "QUEST COMPLETE — FINAL PAGE KEY RECOVERED ✓";
      box.append(result);
      return;
    }
    const question = content.quiz[currentQuizQuestion];
    if (!question) return;
    const counter = document.createElement("p");
    counter.className = "quiz-counter";
    counter.textContent = `QUESTION 0${currentQuizQuestion + 1} / 03`;
    const prompt = document.createElement("h3");
    prompt.textContent = question.question;
    const answers = document.createElement("div");
    answers.className = "answer-list";
    const feedback = document.createElement("p");
    feedback.className = "quiz-feedback";
    feedback.setAttribute("aria-live", "polite");
    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.textContent = answer;
      button.addEventListener("click", () => {
        $$(".answer-button", answers).forEach(item => { item.disabled = true; });
        const correct = index === question.correct;
        button.classList.add(correct ? "answer-correct" : "answer-gentle");
        feedback.textContent = correct ? question.correctNote : question.wrongNote;
        const next = document.createElement("button");
        next.type = "button";
        next.className = "text-button quiz-next";
        next.textContent = currentQuizQuestion === content.quiz.length - 1 ? "FINISH QUEST →" : "NEXT QUESTION →";
        next.addEventListener("click", () => {
          currentQuizQuestion += 1;
          if (currentQuizQuestion >= content.quiz.length) {
            state.quizCompleted = true;
            maybeUnlock();
            showToast("Final page key recovered.");
          }
          renderQuiz();
        });
        box.append(next);
      });
      answers.append(button);
    });
    box.append(counter, prompt, answers, feedback);
  }

  function renderLetter() {
    $("#letter-from").textContent = content.letter.from;
    const body = $("#letter-body");
    body.replaceChildren();
    const opening = document.createElement("p");
    opening.textContent = content.letter.opening;
    body.append(opening);
    content.letter.paragraphs.forEach(text => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      body.append(paragraph);
    });
    $("#letter-signoff").textContent = content.letter.closing;
    $("#letter-postscript").textContent = content.letter.postscript;
  }

  $("#open-file").addEventListener("click", () => {
    state.opened = true;
    saveState();
    $("#intro").hidden = true;
    $("#story").hidden = false;
    renderProgress();
    document.querySelector("#profile").scrollIntoView({ block: "start" });
  });
  $("#reset-progress").addEventListener("click", () => {
    state.opened = true;
    state.visitedRooms = [];
    state.collectedFragments = [];
    state.quizCompleted = false;
    state.finalUnlocked = false;
    currentQuizQuestion = 0;
    $("#quiet-page").hidden = true;
    $("#letter").hidden = true;
    $("#ending-gate").hidden = false;
    $("#room-panel").hidden = true;
    renderQuiz();
    maybeUnlock();
    showToast("Archive progress reset.");
  });
  $$(".room-link").forEach(button => button.addEventListener("click", () => openRoom(button.dataset.room)));
  $("#close-room").addEventListener("click", () => $("#room-panel").hidden = true);
  $("#viewer-close").addEventListener("click", () => $("#viewer").close());
  $("#viewer").addEventListener("click", event => { if (event.target === $("#viewer")) $("#viewer").close(); });
  $("#viewer").addEventListener("close", () => previousFocus?.focus?.());
  $("#open-ending").addEventListener("click", () => {
    if (!state.finalUnlocked) return;
    $("#ending-gate").hidden = true;
    $("#quiet-page").hidden = false;
    $("#quiet-page").focus();
    $("#quiet-page").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#reveal-letter").addEventListener("click", () => {
    $("#quiet-page").hidden = true;
    $("#letter").hidden = false;
    $("#letter").scrollIntoView({ behavior: "smooth", block: "start" });
    $("#letter-title").focus?.();
  });
  $("#replay").addEventListener("click", () => {
    state.opened = false;
    state.visitedRooms = [];
    state.collectedFragments = [];
    state.quizCompleted = false;
    state.finalUnlocked = false;
    currentQuizQuestion = 0;
    saveState();
    $("#story").hidden = true;
    $("#intro").hidden = false;
    $("#room-panel").hidden = true;
    $("#quiet-page").hidden = true;
    $("#letter").hidden = true;
    $("#ending-gate").hidden = false;
    renderQuiz();
    renderProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  renderProfile();
  renderQuiz();
  renderLetter();
  setupScrollAnimations();
  if (state.opened) {
    $("#intro").hidden = true;
    $("#story").hidden = false;
  }
  renderProgress();
})();
