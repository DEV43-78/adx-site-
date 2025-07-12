// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, child, update, increment, set } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

// 1. Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD3Xkm1DxO-swh1fBQ5CXWt77pmSP320c8",
  authDomain: "link-shortner-6a2c1.firebaseapp.com",
  projectId: "link-shortner-6a2c1",
  databaseURL: "https://link-shortner-6a2c1-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "link-shortner-6a2c1.appspot.com",
  messagingSenderId: "702481354050",
  appId: "1:702481354050:web:797dce2f2a1302f2590cdb",
  measurementId: "G-Y2FXRH6QVY"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// 3. Extract Short ID
let pathSegments = window.location.pathname.split('/').filter(Boolean);
let shortID = pathSegments[pathSegments.length - 1] || null;

if (!shortID) {
  document.body.innerHTML = "<h2 style='color:red;text-align:center;'>❌ Invalid or Missing ID</h2>";
} else {
  const finalRedirect = `https://staela.net/?v=${shortID}`;
  const playerBox = document.getElementById('playerBox');
  const overlay = document.getElementById('overlayText');

  let state = 0;
  let countdown = 6;
  let intervalId = null;

  // 4. Firebase Realtime DB log
  const trackClickAndView = () => {
    const linkRef = ref(db, `shortLinks/${shortID}`);
    const updates = {
      views: increment(1),
      lastClicked: Date.now()
    };
    update(linkRef, updates);
    logEvent(analytics, "link_clicked", { shortID: shortID });
  };

  function startCountdown() {
    overlay.textContent = `⏳ Please wait ${countdown} sec...`;
    intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        countdown--;
        overlay.textContent = `⏳ Please wait ${countdown} sec...`;
        if (countdown <= 0) {
          clearInterval(intervalId);
          overlay.innerHTML = `<button id="openBtn" class="open-btn">✅ Open Now</button>`;
          document.getElementById("openBtn").addEventListener("click", () => {
            trackClickAndView();
            window.location.href = finalRedirect;
          });
          state = 2;
        }
      }
    }, 1000);
  }

  function refreshAds() {
    if (window.googletag && googletag.pubads) {
      googletag.cmd.push(() => googletag.pubads().refresh());
    }
  }

  // 5. Player click handling
  playerBox.addEventListener('click', () => {
    if (state === 0) {
      window.open("https://obqj2.com/4/9343270", "_blank");
      state = 1;
    } else if (state === 1) {
      startCountdown();
      refreshAds();
    }
  });

  // 6. Count view immediately (on page open)
  trackClickAndView();

  // Refresh on back
  window.addEventListener("pageshow", function (e) {
    if (e.persisted || window.performance.navigation.type === 2) {
      refreshAds();
    }
  });
}
