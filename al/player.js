// player.js

// 1. Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD3Xkm1DxO-swh1fBQ5CXWt77pmSP320c8",
  authDomain: "link-shortner-6a2c1.firebaseapp.com",
  projectId: "link-shortner-6a2c1",
  storageBucket: "link-shortner-6a2c1.appspot.com",
  messagingSenderId: "702481354050",
  appId: "1:702481354050:web:797dce2f2a1302f2590cdb",
  measurementId: "G-N4J4YQ125B",
  databaseURL: "https://link-shortner-6a2c1-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// 2. Firebase Init
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 3. Get videoID from URL
let pathSegments = window.location.pathname.split('/').filter(Boolean);
let videoID = pathSegments.length ? pathSegments[pathSegments.length - 1] : null;

// 4. UI Elements
const playerBox = document.getElementById('playerBox');
const overlay = document.getElementById('overlayText');

if (!videoID) {
  document.body.innerHTML = "<h2 style='color:red;text-align:center;font-weight:bold;'>❌ Invalid or Missing Video ID</h2>";
} else {
  const originalLink = `https://1024terabox.com/s/${videoID}`;

  // State Management
  let state = 0;
  let countdown = 6;
  let intervalId = null;

  // Save video link to Firebase (only once)
  function saveVideoLink() {
    const ref = db.ref(`videoStats/${videoID}`);
    ref.once("value", (snap) => {
      if (!snap.exists()) {
        ref.set({
          link: originalLink,
          views: 0,
          createdAt: new Date().toISOString()
        });
      }
    });
  }

  // Increment view count
  function recordView() {
    const ref = db.ref(`videoStats/${videoID}/views`);
    ref.transaction(current => (current || 0) + 1);
  }

  // Analytics event
  function logAnalyticsClick() {
    if (typeof gtag === "function") {
      gtag('event', 'player_click', {
        event_category: 'video',
        event_label: videoID,
        value: 1
      });
    }
  }

  // Countdown logic
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

  // Refresh ADX ads (optional)
  function refreshAds() {
    if (window.googletag && googletag.pubads) {
      googletag.cmd.push(function () {
        googletag.pubads().refresh();
      });
    }
  }

  // 👆 Main Interaction
  playerBox.addEventListener('click', () => {
    if (state === 0) {
      window.open("https://obqj2.com/4/9343270", "_blank"); // Open external ad
      logAnalyticsClick();
      recordView(); // Increment view count
      saveVideoLink(); // Save video entry (once)
      state = 1;
    } else if (state === 1) {
      startCountdown();
      refreshAds();
    }
  });

  // On browser back/forward
  window.addEventListener("pageshow", function (event) {
    if (event.persisted || window.performance.navigation.type === 2) {
      refreshAds();
    }
  });

  // Optional: Firebase Auth check
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("✅ User authenticated:", user.email);
    }
  });
}
