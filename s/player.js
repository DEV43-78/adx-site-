// player.js
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

let pathSegments = window.location.pathname.split('/').filter(Boolean);
let videoID = pathSegments.length ? pathSegments[pathSegments.length - 1] : null;

if (!videoID) {
  document.body.innerHTML = "<h2 style='color:red;text-align:center; font-weight:bold;'>❌ Invalid or Missing Video ID</h2>";
} else {
  const originalLink = `https://terasharelink.com/s/${videoID}`;
  const shortLink = `https://www.staela.net/s/${videoID}`;
  document.getElementById('shortLinkDisplay').innerHTML = `<a href="${shortLink}" style="color:white;text-decoration:none;">${shortLink}</a>`;

  const playerBox = document.getElementById('playerBox');
  const overlay = document.getElementById('overlayText');
  let started = false;

  playerBox.addEventListener('click', () => {
    if (started) return;
    started = true;

    let countdown = 10;
    overlay.textContent = `⏳ Please wait ${countdown} sec...`;

    const interval = setInterval(() => {
      countdown--;
      overlay.textContent = `⏳ Please wait ${countdown} sec...`;

      if (countdown === 0) {
        clearInterval(interval);
        overlay.innerHTML = `<button id="openBtn" class="open-btn">✅ Open in App</button>`;

        document.getElementById('openBtn').addEventListener('click', () => {
          window.location.href = originalLink;
        });
      }
    }, 1000);
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User is authenticated");
    }
  });
}
