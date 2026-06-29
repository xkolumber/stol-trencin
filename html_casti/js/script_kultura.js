const galleryImages = [
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_104--1_1--2013_08_16_--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Krajina s vŕbou",
    meta: "olej na plátne / približne 1950",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_158--1_1--2013_08_12_--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Dedinský motív",
    meta: "olej na plátne / približne 1952",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_188--1_1--2013_09_13--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Slovenská krajina",
    meta: "olej na plátne / približne 1954",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_197--1_1--2013_09_13--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Ženy pri práci",
    meta: "olej na plátne / približne 1951",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_238--1_1--2013_09_18--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Na poli",
    meta: "olej na plátne / približne 1953",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_244--1_1--2013_08_15_--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Pred domom",
    meta: "olej na plátne / približne 1955",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_273--1_1--2013_08_13_--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Jesenná krajina",
    meta: "olej na plátne / približne 1956",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_287--1_1--2013_09_13--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Chalupy pod kopcom",
    meta: "olej na plátne / približne 1949",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_307--1_1--2013_08_13_--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Ráno na dedine",
    meta: "olej na plátne / približne 1950",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_317--1_1--2013_09_12--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Pastier",
    meta: "olej na plátne / približne 1957",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_323--1_1--2013_09_05--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Podvečer",
    meta: "olej na plátne / približne 1952",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_324--1_1--2013_08_12_--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Lúka pri lese",
    meta: "olej na plátne / približne 1958",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_332--1_1--2013_08_12_--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "V zime",
    meta: "olej na plátne / približne 1953",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_334--1_1--2013_09_13--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Cesta domov",
    meta: "olej na plátne / približne 1954",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_389--1_1--2013_09_16--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Zátišie",
    meta: "olej na plátne / približne 1948",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_566--1_1--2013_08_13_--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Kostolík",
    meta: "olej na plátne / približne 1955",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_1237--1_1--2013_09_13--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Vidiecka cesta",
    meta: "olej na plátne / približne 1956",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_1293--1_1--2013_09_13--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Po daždi",
    meta: "olej na plátne / približne 1957",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_1464--1_1--2013_09_13--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Kopanice",
    meta: "olej na plátne / približne 1951",
  },
  {
    src: "../images/bazovsky_KOCR_opt/GBT--O_1599--1_1--2013_09_13--LP_A4.jpg",
    title: "Bazovský, Miloš Alexander",
    artwork: "Letný deň",
    meta: "olej na plátne / približne 1958",
  },
];
let currentImage = 0;

function generateGrid() {
  const grid = document.getElementById("galleryGrid");
  let html = "";
  galleryImages.forEach((item, index) => {
    html += `<img src="${item.src}" alt="${item.artwork}" onclick="openImage(${index})" />`;
  });
  grid.innerHTML = html;
}

function showPage(page) {
  document.getElementById("textPage").classList.remove("active");
  document.getElementById("galleryPage").classList.remove("active");
  document.getElementById("tabText").classList.remove("active");
  document.getElementById("tabGallery").classList.remove("active");

  if (page === "text") {
    document.getElementById("textPage").classList.add("active");
    document.getElementById("tabText").classList.add("active");
  }
  if (page === "gallery") {
    document.getElementById("galleryPage").classList.add("active");
    document.getElementById("tabGallery").classList.add("active");
    closeImage();
  }
}

function closePanel() {
  window.close();
}

function openImage(index) {
  currentImage = index;
  renderImage();
  document.getElementById("galleryGrid").style.display = "none";
  document.getElementById("galleryDetail").classList.add("active");
}

function closeImage() {
  document.getElementById("galleryGrid").style.display = "grid";
  document.getElementById("galleryDetail").classList.remove("active");
}

function renderImage() {
  const item = galleryImages[currentImage];

  document.getElementById("modalImage").src = item.src;
  document.getElementById("imageTitle").innerHTML = item.title;
  document.getElementById("imageArtwork").innerHTML = item.artwork;
  document.getElementById("imageMeta").innerHTML = item.meta;

  const total = galleryImages.length;
  const maxDots = 6;
  let start = 0;

  if (total > maxDots) {
    start = currentImage - Math.floor(maxDots / 2);

    if (start < 0) start = 0;

    if (start + maxDots > total) start = total - maxDots;
  }

  let dots = "";
  for (let i = start; i < Math.min(start + maxDots, total); i++) {
    dots += `<div class="dot ${i === currentImage ? "active" : ""}"></div>`;
  }

  document.getElementById("dots").innerHTML = dots;
}

function nextImage() {
  currentImage++;
  if (currentImage >= galleryImages.length) currentImage = 0;
  renderImage();
}

function prevImage() {
  currentImage--;
  if (currentImage < 0) currentImage = galleryImages.length - 1;
  renderImage();
}

generateGrid();
