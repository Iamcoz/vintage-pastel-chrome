// 옵션 창: 고른 값을 저장하고 미리보기를 바로 고친다. 기본값과 글꼴 목록은 settings.js에 있다.
function save(key, value) {
  localStorage.setItem(key, value);
  applyLook();
}

const text = document.getElementById("logoText");
text.value = getSetting("logoText");
// 비우면 기본값(iamcoz)으로 돌아간다
text.oninput = () => text.value.trim() ? save("logoText", text.value.trim()) : (localStorage.removeItem("logoText"), applyLook());

for (const [id, list] of [["logoFont", FONTS], ["logoWeight", WEIGHTS]]) {
  const select = document.getElementById(id);
  for (const [value, label] of list) select.append(new Option(id === "logoFont" ? `${value} (${label})` : label, value));
  select.value = getSetting(id);
  select.onchange = () => save(id, select.value);
}

for (const radio of document.querySelectorAll('input[name="searchStyle"]')) {
  radio.checked = radio.value === getSetting("searchStyle");
  radio.onchange = () => save("searchStyle", radio.value);
}
