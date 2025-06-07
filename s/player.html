// 1. Firebase Configuration & Initialization
const firebaseConfig = {
  apiKey: "AIzaSyD3Xkm1DxO-swh1fBQ5CXWt77pmSP320c8",
  authDomain: "link-shortner-6a2c1.firebaseapp.com",
  projectId: "link-shortner-6a2c1",
  storageBucket: "link-shortner-6a2c1.appspot.com",
  messagingSenderId: "702481354050",
  appId: "1:702481354050:web:797dce2f2a1302f2590cdb",
  measurementId: "G-N4J4YQ125B"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. Extract Video ID from URL
let pathSegments = window.location.pathname.split('/').filter(Boolean);
let videoID = pathSegments.length ? pathSegments[pathSegments.length - 1] : null;

// 3. Validate and Proceed
if (!videoID) {
  document.body.innerHTML = "<h2 style='color:red;text-align:center; font-weight:bold;'>❌ Invalid or Missing Video ID</h2>";
} else {
  const originalLink = `https://teraboxlinke.com/s/${videoID}`;

  // 4. DOM Elements
  const playerBox = document.getElementById('playerBox');
  const overlay = document.getElementById('overlayText');

  // 5. Countdown Logic
  let started = false;
  let countdown = 10;
  let intervalId = null;
  let refreshIntervalId = null;

  function startTimer() {
    overlay.textContent = `⏳ Please wait ${countdown} sec...`;

    intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        countdown--;
        overlay.textContent = `⏳ Please wait ${countdown} sec...`;

        if (countdown <= 0) {
          clearInterval(intervalId);
          overlay.innerHTML = `<button id="openBtn" class="open-btn">✅ Open in App</button>`;

          document.getElementById('openBtn').addEventListener('click', () => {
            overlay.textContent = "▶️ Redirecting...";
            clearInterval(refreshIntervalId); // Stop ad refresh loop
            window.location.href = originalLink;
          });
        }
      }
    }, 1000);
  }

  // 6. Refresh AdX Ads
  function refreshAds() {
    if (window.googletag && googletag.pubads) {
      googletag.cmd.push(function () {
        googletag.pubads().refresh();
      });
    }
  }

  // 7. Start 30-Second Auto Refresh Loop
  function startAdRefreshLoop() {
    refreshIntervalId = setInterval(() => {
      refreshAds();
      console.log("🔄 AdX ads refreshed every 30 sec");
    }, 30000); // 30 seconds
  }

  // 8. Player Box Click Event
  playerBox.addEventListener('click', () => {
    if (started) return;
    started = true;
    startTimer();
    refreshAds();         // Initial refresh
    startAdRefreshLoop(); // Start loop
  });

  // 9. Refresh ads on page restore (back/forward)
  window.addEventListener("pageshow", function (event) {
    if (event.persisted || window.performance.navigation.type === 2) {
      refreshAds();
    }
  });

  // 10. Firebase Auth State Check
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("✅ User is authenticated");
    }
  });
}
