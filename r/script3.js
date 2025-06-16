window.onload = function () {
  const q1 = sessionStorage.getItem("q1") || "Not Answered";
  const q2 = sessionStorage.getItem("q2") || "Not Answered";

  const answersList = document.getElementById("answers");
  answersList.innerHTML = `
    <li>1. Fortuner Manufacturer: <strong>${q1}</strong></li>
    <li>2. Electric Car: <strong>${q2}</strong></li>
  `;

  // Optional: clear session storage if you want to reset quiz later
  sessionStorage.clear();
};
