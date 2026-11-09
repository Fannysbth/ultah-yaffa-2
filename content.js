/*
 * SAVE FILE_06 — personal content lives here.
 * Replace bracketed placeholders with facts and words you are happy to share.
 * Use paths relative to this file, for example: "assets/photos/photo-01.webp".
 */

window.STORY_CONTENT = {
  character: {
    name: "Tysa Yaffa Seremilka Simbolon",
    role: "Certified Best Friend",
    class: "Rare Kind of Human",
    ability: "Mampu bikin suasana jadi lebih hangat hanya dengan kehadirannya",
    weakness: " Ga bisa foto sekali jepret",
    annotations: {
      role: "Bukan sekadar sahabat tersertifikasi, tapi juga seseorang yang tanpa sadar membuat momen-momen sederhana terasa layak dikenang. Karakter penting dalam cerita ini, bukan sekadar figuran yang lewat",
      class: "Manusia langka dengan kehadiran yang selalu terasa hangat. Punya kemampuan membuat orang nyaman, mengubah momen kecil menjadi kenangan, dan membawa kepribadian yang tidak bisa ditemukan pada karakter lain",
      ability: "Memiliki kemampuan alami untuk membuat suasana terasa lebih hangat hanya dengan kehadirannya. Tidak perlu usaha berlebihan atau hal-hal dramatis. Entah bagaimana, keberadaannya saja bisa membuat hari biasa terasa sedikit lebih istimewa",
      weakness: "Meski memiliki banyak kelebihan, mengambil foto sempurna dalam satu kali jepretan masih menjadi misi sampingan yang belum berhasil diselesaikan. Termasuk melupakan sosok yang satu itu"
    }
  },
  rooms: {
    gallery: {
      title: "The Memory Gallery",
      description: "A photo archive, arranged by the hands that remember it.",
      fragmentId: "gallery",
      items: [
        { src: "assets/photos/1.jpeg", alt: "Photo 01 placeholder", caption: "moment terakhir explore Jogja, tapi sempet hujan n badmood" },
        { src: "assets/photos/2.jpeg", alt: "Photo 02 placeholder", caption: "tema dcnya lontong sayur, ga pernah se match ini bajunya" },
        { src: "assets/photos/3.jpg", alt: "Photo 03 placeholder", caption: "foto di kafe korean lucyu" },
        { src: "assets/photos/4.jpg", alt: "Photo 04 placeholder", caption: "ngerayain ultah gw, tanpa sadar ultah anda ga dirayain, dirayain sih tapi di agam" },
        { src: "assets/photos/5.jpg", alt: "Photo 05 placeholder", caption: "ke kafe gelato yang lucyu, cuma pas itu ujan kita jadinya ngegrab, motorku di titip di kos mu" },
        { src: "assets/photos/6.jpg", alt: "Photo 06 placeholder", caption: "main ke parangtritis bagian bukan pantainya"},
        { src: "assets/photos/7.jpg", alt: "Photo 07 placeholder", caption: "finally akhirnya sidang juga ya bu after semua perjaungan" , hasFragment: true },
        { src: "assets/photos/8.jpg", alt: "Photo 08 placeholder", caption: "kafe hidden gem yang andanya kek rada ga tenang karena ada revisian s word ampe gosendin laptop" },
        { src: "assets/photos/9.jpg", alt: "Photo 09 placeholder", caption: "kafe di dunia lain yang lucyu tapi rada serem sekitarnya, pake prinsip trabas aj, bandal" },
        { src: "assets/photos/10.jpg", alt: "Photo 10 placeholder", caption: "ini saya menemani anda buat proposal s word" }
      ]
    },
    signals: {
      title: "The Signal Archive",
      description: "A record of calls. No durations or dates are inferred here.",
      fragmentId: "signals",
      items: Array.from({ length: 7 }, (_, index) => ({
        src: `assets/calls/${index + 1}.jpeg`, alt: `Call screenshot ${String(index + 1).padStart(3, "0")} placeholder`,
        archiveId: `SIGNAL LOG #${String(index + 1).padStart(3, "0")}`,
        hasFragment: index === 4
      }))
      
    },
    messages: {
      title: "The Message Vault",
      description: "Conversation fragments, handled with care. Add only messages you have permission to share.",
      fragmentId: "messages",
      items: [
        { src: "assets/chats/1.jpeg", alt: "Chat screenshot 01 placeholder", caption: "chat ini yang ga kerasa jadi rutinitas buat kita, kek klo ga call kek something miss, ceritanya from info main to info call " },
        { src: "assets/chats/2.jpeg", alt: "Chat screenshot 02 placeholder", caption: "ga cuma grup berem berem yang bahaya kalau kebongkar, chat kita juga bahaya, isinya julid poll, apalgi kalo subjectnya satu org itu" },
        { src: "assets/chats/3.jpeg", alt: "Chat screenshot 03 placeholder", caption: "kabarnya sampai sekrang saya taknak buat qris hahaah, tp ngapain, udah ga pernah saling talang menalangin :)" },
        { src: "assets/chats/4.jpeg", alt: "Chat screenshot 04 placeholder", caption: "kangen info main lah, when yh muncul lagi kata kata itu", hasFragment: true },
        { src: "assets/chats/5.jpeg", alt: "Chat screenshot 04 placeholder", caption: "selain info main dan call, juga info jj ya, tapi fotonya itu itu aja hahahaha"}
      ]
    }
  },
  quiz: [
  {
    question: "Kapan Ultah FANNY",
    answers: [
      "30 Nov",
      "30 Des",
      "20 Nov"
    ],
    correct: 0,
    correctNote: "Benar. Yes, 30 NOV, rill ga nerima kata lupa atau latepost atau belated birthday.",
    wrongNote: "Oi salah Oi, 30 NOV WAJIB INGAT"
  },
  {
    question: "Apa respons paling mungkin dari Yaffa ketika ditanya mau makan apa?",
    answers: [
      "ke sini aja",
      "Apa aja asal bukan itu",
      "Terserah, ikut aja"
      
    ],
    correct: 2,
    correctNote: "lalap lalap, awak juga yang mikir",
    wrongNote: "Bisa saja, tergantung tingkat kelaparannya."
  },
  {
    question: "Yaffa hari ini happy ga?",
    answers: [
      "GA",
      "happy poll",
      "b aj"
    ],
    correct: 1,
    correctNote: "selalu happy ye jangan hari ni aj",
    wrongNote: "harus happy dongs gmn seh"
  }
],
  letter: {
  from: "Your Bestii yang paling cantik Fanny",
  opening: "Dear Yaffa,",

  paragraphs: [
    "Happy birthday, Yaffa! Welcome to your 22nd chapter of life. Rasanya agak aneh juga melihat kita semakin dewasa, padahal kadang kelakuan masih seperti orang yang belum selesai tutorial hidupnya. Semoga di umur yang baru ini, kamu semakin banyak menemukan alasan untuk bahagia, semakin menikmati hidup, dan semakin mengenal dirimu sendiri.",

    "Semoga di umur yang baru ini kamu semakin dekat dengan Tuhan, semakin bertumbuh dalam iman, dan selalu menemukan ketenangan dalam setiap doa yang kamu panjatkan. Semoga Tuhan senantiasa membimbing setiap langkahmu, memberikan hikmat dalam setiap keputusan, menguatkanmu ketika menghadapi masa-masa sulit, dan memberkati segala rencana serta impian yang sedang kamu perjuangkan. Semoga kamu selalu dipenuhi rasa syukur, sukacita, dan damai sejahtera, semakin menjadi pribadi yang baik, semakin mengasihi orang-orang di sekitarmu, dan tidak pernah lupa bahwa dalam setiap musim kehidupan, Tuhan selalu punya rencana yang indah untukmu.",

    "Aku berharap semoga kamu selalu diberikan kesehatan, kebahagiaan, ketenangan, dan banyak hal baik dalam setiap langkahmu. Semoga segala sesuatu yang sedang kamu usahakan perlahan menemukan jalannya, segala doa yang kamu simpan diam-diam satu per satu terwujud, dan kamu selalu dikelilingi orang-orang yang tulus menyayangimu. Jangan lupa untuk selalu sayang sama orang tua, membahagiakan mereka, dan semoga kamu selalu punya banyak kesempatan untuk membuat mereka bangga.",

    "Semoga kamu segera mendapatkan pekerjaan di tempat yang benar-benar kamu inginkan, dengan lingkungan yang baik, orang-orang yang menyenangkan, kesempatan berkembang, dan tentunya segala hal yang pantas kamu dapatkan. Semoga perjalanan menuju masa depan yang kamu impikan terasa lebih ringan, penuh kesempatan, dan tidak membuatmu kehilangan kesenangan dalam menjalani hidup. Pelan-pelan saja, tidak perlu buru-buru membandingkan perjalananmu dengan orang lain.",

    "Dan tentu saja, semoga segera dipertemukan dengan seseorang yang baik, tulus, sabar, dan benar-benar tahu cara memperlakukan kamu dengan baik. Yang demen sama kamu melebihi T, yang effort-nya tidak perlu diminta, yang bisa diajak cerita tentang hal random sampai hal serius, dan yang tidak membuatmu mempertanyakan apakah kamu layak disayang. Semoga nanti kalau sudah waktunya, kamu mendapatkan love story yang menyenangkan dan tidak kalah seru dari cerita-cerita yang biasa kita bahas.",

    "Satu hal lagi yang paling aku harapkan: semoga kita masih punya banyak kesempatan untuk ketemu, main bareng, jalan-jalan, ngobrol random, dan membuat kenangan baru. Semoga jarak, kesibukan, dan segala urusan masing-masing tidak membuat kita kehilangan kesempatan untuk kembali menghabiskan waktu bersama. I really hope we get to meet and hang out again soon.",

    "Jalani 22 tahun ini dengan lebih banyak tertawa, lebih banyak mencoba hal baru, lebih banyak pengalaman seru, dan lebih banyak hari yang membuatmu merasa bahwa hidup ternyata menyenangkan. Semoga ada banyak kejutan baik, kesempatan yang tidak disangka-sangka, tempat baru untuk dikunjungi, makanan enak untuk dicoba, dan cerita-cerita baru yang suatu hari bisa kita kenang sambil tertawa lagi.",

    "Happy 22nd birthday once again, Yaffa. Semoga semua yang baik menemukan jalannya menuju kamu, semoga hal-hal yang kamu tunggu segera datang, dan semoga kamu selalu punya alasan untuk tersenyum. Here's to another year of growing, learning, laughing, and living your life to the fullest. You deserve so many good things."
  ],

  closing: "With love,\nFanny",

  postscript: "P.S. This is definitely not the last chapter. Masih banyak cerita, tempat, makanan, dan momen random yang belum kita alami bareng. Jadi jangan cepat-cepat tamat, ya. We still have a lot of catching up to do."
}
};
