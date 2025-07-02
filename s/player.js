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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. Extract Video ID from URL
let pathSegments = window.location.pathname.split('/').filter(Boolean);
let videoID = pathSegments.length ? pathSegments[pathSegments.length - 1] : null;

if (!videoID) {
  document.body.innerHTML = "<h2 style='color:red;text-align:center;font-weight:bold; margin-top:50px;'>❌ Invalid or Missing Video ID</h2>";
} else {

  const playerBox = document.getElementById('playerBox');

  playerBox.addEventListener('click', () => {
    window.location.href = `https://www.staela.net/s1/${videoID}`;
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("✅ User is authenticated");
    }
  });
}
