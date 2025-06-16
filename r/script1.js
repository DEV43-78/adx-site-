document.getElementById("form1").addEventListener("submit", function(e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="q1"]:checked');
  if (!selected) {
    alert("Please select an answer before continuing.");
    return;
  }
  // Save answer if needed (optional)
  sessionStorage.setItem("q1", selected.value);
  // Go to next page
  window.location.href = "video-post2.html";
});
