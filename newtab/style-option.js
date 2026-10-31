// 검색창 모양 옵션(options.html에서 고른 값). 새 탭과 옵션 페이지가 같은 확장 주소라 localStorage를 같이 쓴다.
function applySearchStyle() {
  document.documentElement.classList.toggle("glass", localStorage.getItem("searchStyle") === "glass");
}
applySearchStyle();
// 옵션을 바꾸면 이미 열린 새 탭에도 바로 반영
addEventListener("storage", applySearchStyle);
