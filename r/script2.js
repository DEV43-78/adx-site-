document.getElementById("form2").addEventListener("submit", function(e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="q2"]:checked');
  if (!selected) {
    alert("Please select an answer before submitting.");
    return;
  }
  // Save answer if needed (optional)
  sessionStorage.setItem("q2", selected.value);
  // Go to final page
  window.location.href = "get-video.html";
});
