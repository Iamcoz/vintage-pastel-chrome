// 새 탭 설정(옵션 창에서 고른 값). 새 탭과 옵션 창이 같은 확장 주소라 localStorage를 같이 쓴다.
// 크롬 프로필마다 저장소가 따로라, 회사 프로필에서는 로고 글자를 따로 정할 수 있다.
const DEFAULTS = { searchStyle: "pink", logoText: "iamcoz", logoFont: "Google Sans", logoWeight: "500" };

// 고를 수 있는 글꼴(모두 Google Fonts, 굵기 400/500/700 지원 확인)
const FONTS = [
  ["Google Sans", "기본"],
  ["Nunito", "둥근"],
  ["Quicksand", "둥글고 가는"],
  ["Poppins", "기하학"],
  ["Fredoka", "말랑한"],
  ["Playfair Display", "세리프"],
];
const WEIGHTS = [["400", "보통"], ["500", "조금 두껍게"], ["700", "두껍게"]];

function getSetting(key) {
  return localStorage.getItem(key) ?? DEFAULTS[key];
}

function applyLook() {
  const root = document.documentElement, font = getSetting("logoFont"), weight = getSetting("logoWeight");
  root.classList.toggle("glass", getSetting("searchStyle") === "glass");
  root.style.setProperty("--logo-font", `"${font}"`);
  root.style.setProperty("--logo-weight", weight);
  let link = document.getElementById("logo-font");
  if (!link) {
    link = Object.assign(document.createElement("link"), { id: "logo-font", rel: "stylesheet" });
    document.head.append(link);
  }
  link.href = `https://fonts.googleapis.com/css2?family=${font.replaceAll(" ", "+")}:wght@${weight}&display=block`;
  const logo = document.querySelector(".logo");
  if (logo) logo.textContent = getSetting("logoText");
}

applyLook();
document.addEventListener("DOMContentLoaded", applyLook);
// 옵션을 바꾸면 이미 열린 새 탭에도 바로 반영
addEventListener("storage", applyLook);
