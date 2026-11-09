# SAVE FILE_06 — The Last Page Doesn't Exist

A mobile-first, static birthday storytelling experience for Yaffa. It uses HTML, CSS, and vanilla JavaScript only: no build step, package manager, backend, or database.

## Project files

- `index.html` — semantic page structure and story chapters.
- `style.css` — visual system, responsive layouts, and reduced-motion rules.
- `script.js` — archive interactions, quiz, progress, optional local saving, and ending unlock.
- `content.js` — all editable personal content and asset paths.
- `assets/` — add your own photos and screenshots here.

## Personalize the experience

Open `content.js` and replace bracketed text with details you know are true. The profile, quiz, captions, letter, and creator name are all in this file. Remove any paragraph or quiz question that does not feel right. Do not put private messages online unless everyone shown has agreed.

The letter currently contains marked placeholders. Replace them with your own words before sharing. The site deliberately does not invent Yaffa's personality, shared memories, call metadata, or photo context.

## Add photographs and screenshots

1. Put files in the matching folder: `assets/photos/`, `assets/calls/`, or `assets/chats/`.
2. Prefer optimized WebP or JPEG images. Keep the original privately if it contains sensitive details.
3. In `content.js`, set an item's `src`, for example `"assets/photos/photo-01.webp"`.
4. Write concise, useful `alt` text. Use `caption` only for a caption you can stand behind.
5. The archive arrays include ten photo entries, ten call entries, and four chat entries. Add or remove entries as needed.
6. Keep `hasFragment: true` on one item in each room so all three collectibles remain discoverable. Each room should have exactly one such item.

Items without an image path display a labeled placeholder and remain clickable. Images load lazily as visitors open a room.

## Change colors and fonts

Edit the custom properties at the top of `style.css`: `--paper`, `--ink`, `--blue`, `--red`, and `--gold`. Font links in `index.html` are optional; system fallbacks keep the site readable if Google Fonts are unavailable. Replace the font-family variables in `style.css` to use other fonts.

## Progress and privacy

Progress is saved in the browser's `localStorage` under `save-file-06-progress-v1`. Only completion state is stored, not profile data or media. If storage is blocked, the story still works for the current visit. `RESET` clears story progress; `REPLAY THE STORY` clears progress and returns to the opening. For a fully fresh test, clear that key in the browser's site storage.

## Run locally

Open `index.html` directly in a modern browser. No local server is required. Test in a current version of Chrome, Firefox, Safari, or Edge. Remote fonts are optional; all essential content is local.

## Publish with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder (keep `index.html` at the repository root).
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then save.
5. Wait for GitHub Pages to publish and open the URL shown in the Pages settings. A project site typically uses `https://YOUR-USERNAME.github.io/REPOSITORY/`.
6. To update the story, edit `content.js` and upload the new media files. Relative asset paths work beneath a repository subpath; do not change them to `/assets/...`.

## Share checklist

- Replace creator name and every personal placeholder in `content.js`.
- Add only photographs and screenshots you have permission to share.
- Check captions and alt text against the actual media.
- Verify each room has one `hasFragment: true` item.
- Complete the quiz and collect all three fragments; confirm the ending unlocks.
- Check the viewer with mouse, keyboard, and Escape.
- Try `RESET` and `REPLAY THE STORY`.
- Open the deployed page at 360px, 390px, 768px, and 1440px widths; check for horizontal scrolling and readable controls.
- Check that the deployed repository-subpath URL loads all CSS, JavaScript, and media.
