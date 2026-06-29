function showPage(page) {
  const textPage = document.getElementById("textPage");
  const text2Page = document.getElementById("text2Page");
  const text3Page = document.getElementById("text3Page");

  const tabText = document.getElementById("tabText");
  const tabText2 = document.getElementById("tabText2");
  const tabText3 = document.getElementById("tabText3");

  textPage?.classList.remove("active");
  text2Page?.classList.remove("active");
  text3Page?.classList.remove("active");

  tabText?.classList.remove("active");
  tabText2?.classList.remove("active");
  tabText3?.classList.remove("active");

  if (page === "text") {
    textPage?.classList.add("active");
    tabText?.classList.add("active");
  }

  if (page === "text2") {
    text2Page?.classList.add("active");
    tabText2?.classList.add("active");
  }

  if (page === "text3") {
    text3Page?.classList.add("active");
    tabText3?.classList.add("active");

    if (text3Page && typeof resetGame === "function") {
      setTimeout(resetGame, 0);
    }
  }
}
