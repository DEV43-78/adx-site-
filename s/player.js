// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3Xkm1DxO-swh1fBQ5CXWt77pmSP320c8",
  authDomain: "link-shortner-6a2c1.firebaseapp.com",
  projectId: "link-shortner-6a2c1",
  storageBucket: "link-shortner-6a2c1.appspot.com",
  messagingSenderId: "702481354050",
  appId: "1:702481354050:web:797dce2f2a1302f2590cdb",
  measurementId: "G-N4J4YQ125B"
};

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 3. Extract videoID from URL
let pathSegments = window.location.pathname.split('/').filter(Boolean);
let videoID = pathSegments.length ? pathSegments[pathSegments.length - 1] : null;

if (!videoID) {
  document.body.innerHTML = "<h2 style='color:red;text-align:center;font-weight:bold;'>❌ Invalid or Missing Video ID</h2>";
} else {
  const originalLink = `https://1024terabox.com/s/${videoID}`;
  const playerBox = document.getElementById('playerBox');
  const overlay = document.getElementById('overlayText');

  let state = 0; // 0 = first click (open ad), 1 = countdown, 2 = ready
  let countdown = 6;
  let intervalId = null;

  function startCountdown() {
    overlay.textContent = `⏳ Please wait ${countdown} sec...`;
    intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        countdown--;
        overlay.textContent = `⏳ Please wait ${countdown} sec...`;
        if (countdown <= 0) {
          clearInterval(intervalId);
          overlay.innerHTML = `<button id="openBtn" class="open-btn">✅ Open in App</button>`;
          document.getElementById("openBtn").addEventListener("click", () => {
            window.location.href = originalLink;
          });
          state = 2;
        }
      }
    }, 1000);
  }

  function refreshAds() {
    if (window.googletag && googletag.pubads) {
      googletag.cmd.push(function () {
        googletag.pubads().refresh();
      });
    }
  }

  playerBox.addEventListener('click', () => {
    if (state === 0) {
      window.open("https://obqj2.com/4/9257743", "_blank"); // Open ad in new tab
      state = 1;
      return;
    }
    if (state === 1) {
      startCountdown();
      refreshAds();
    }
  });

  window.addEventListener("pageshow", function (event) {
    if (event.persisted || window.performance.navigation.type === 2) {
      refreshAds();
    }
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("✅ User is authenticated");
    }
  });
}
