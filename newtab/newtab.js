// 검색창 버튼 동작. 크롬 기본 새 탭 버튼과 비슷하게 Google 페이지로 보낸다.
const input = document.querySelector('input[name="q"]');

// AI 모드: Google 검색 주소에 udm=50을 붙이면 AI 모드로 열린다(Google이 공식 문서로 밝힌 값은 아니다)
function openAiMode() {
  const q = input.value.trim();
  location.href = "https://www.google.com/search?udm=50" + (q ? "&q=" + encodeURIComponent(q) : "");
}
document.getElementById("ai").onclick = openAiMode;
// +: 크롬에서는 AI 모드에 파일을 붙이는 버튼이라 AI 모드를 연다
document.getElementById("plus").onclick = openAiMode;
document.getElementById("lens").onclick = () => { location.href = "https://lens.google.com/"; };

// 음성 검색: 크롬 내장 음성 인식. 말이 끝나면 바로 검색한다
document.getElementById("mic").onclick = () => {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return;
  const rec = new Recognition();
  rec.lang = "ko-KR";
  input.placeholder = "말씀하세요";
  rec.onresult = e => { input.value = e.results[0][0].transcript; document.getElementById("search").submit(); };
  rec.onend = () => { if (input.placeholder === "말씀하세요") input.placeholder = "Google에 물어보기"; };
  // 확장 페이지에서는 마이크 권한이 막혀 실패할 수 있다. 조용히 끝나지 않게 알려 준다
  rec.onerror = e => { input.placeholder = e.error === "not-allowed" ? "마이크를 쓸 수 없어요" : "음성을 듣지 못했어요"; };
  rec.start();
};
