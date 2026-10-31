// 고른 검색창 모양을 저장한다. 새 탭은 style-option.js로 같은 값을 읽는다.
const current = localStorage.getItem("searchStyle") || "pink";

for (const radio of document.querySelectorAll('input[name="style"]')) {
  radio.checked = radio.value === current;
  radio.onchange = () => localStorage.setItem("searchStyle", radio.value);
}
