import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-storage.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
  
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

// import { getStorage,ref, uploadBytes  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYOgK8lKXuyRBI7SchDbz8Dz2J76keE6E",
  authDomain: "xmasproject-64015.firebaseapp.com",
  projectId: "xmasproject-64015",
  storageBucket: "xmasproject-64015.appspot.com",
  messagingSenderId: "362890585670",
  appId: "1:362890585670:web:f0c9bd0f320a3d288d4c47",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const sighInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      console.log(user);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);

      if (docSnap.exists()) {
        console.log("User has been register", docSnap.data());
      } else {
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          password: "123456",
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          createdAt: Date.now(),
          lastLoginAt: Date.now(),
        });
      }
    })
    .catch((err) => {
      alert(err);
    });
};

const signIn = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) {
    alert("pleas enter your email and password");
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const userId=docSnap.data().uid;
          localStorage.clear()
          localStorage.setItem("user-id".userId);

          window.location.href = 
            "http://127.0.0.1:5500/index.html"
          ;
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Wrong username or password")
      });
  }
};

const btnLoginWithForm = document.getElementById("btnLoginWithForm");
btnLoginWithForm.addEventListener("click", () => {
  signIn();
  
});


const btnLoginWithGoogle = document.getElementById("btnLoginWithGoogle");
btnLoginWithGoogle.addEventListener("click", () => {
  sighInWithGoogle();
  window.location.replace(
    "http://localhost:5500/index.html"
  );
});
