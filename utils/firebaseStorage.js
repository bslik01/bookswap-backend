// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const admin = require('firebase-admin');
const serviceAccount = require('../../Downloads/book-swap-3d7fa-firebase-adminsdk-fbsvc-63a0ff27fc.json'); // Téléchargé depuis Firebase Console

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyC-w2g3raRnmo-zfOJLp6w2l4m148XPM5U",
  authDomain: "book-swap-3d7fa.firebaseapp.com",
  projectId: "book-swap-3d7fa",
  storageBucket: "book-swap-3d7fa.firebasestorage.app",
  messagingSenderId: "607682651211",
  appId: "1:607682651211:web:8a554e8619fa8e22a5d9ce",
  measurementId: "G-WCVPYXTDTP"
};

admin.initializeApp(firebaseConfig);

const bucket = admin.storage().bucket();

exports.uploadImage = async (file) => {
  const blob = bucket.file(`book-covers/${Date.now()}_${file.originalname}`);
  const blobStream = blob.createWriteStream({ metadata: { contentType: file.mimetype } });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(file.buffer);
  });
};
