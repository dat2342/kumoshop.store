// var submitButton = document.getElementById("btn");
// submitButton.addEventListener("click", handleClick);

// const email = document.getElementById("inputemail");
// const passWord = document.getElementById("inputpass");
// let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// var showPass = document.getElementById("checkbox");
// var labelShow = document.getElementById("onpass");
// labelShow.innerText = "Show password";
// passWord.type = "password";

// checkbox.addEventListener("change", function () {
//   if (this.checked) {
//     passWord.type = "text";
//     labelShow.innerText = "Hide password";
//   } else {
//     passWord.type = "password";
//     labelShow.innerText = "Show password";
//   }
// });

// var formData = JSON.parse(localStorage.getItem("formData"));
// console.log(formData);

// JSON.parse(localStorage.getItem("formData")).some((data) =>
//   console.log(data.pwd)
// );

// function signIn(e) {
//   let email = document.getElementById("inputemail").value,
//     pwd = document.getElementById("inputpass").value;

//   let exist =
//     formData.length >= 0 &&
//     JSON.parse(localStorage.getItem("formData")).some(
//       (data) =>
//         data.email.toLowerCase() == email.toLowerCase() && data.pwd == pwd
//     );
//   if (!exist) {
//     alert("Incorrect login credentials");

//   } if(exist) {
//     window.location.href = "../HomePage.html";
//   }
// }

// function handleClick(e) {
//   var invalidEmail = document.getElementById("invalidemail");
//   var invalidPass = document.getElementById("invalidpass");

//   if (email.value == "") {
//     invalidEmail.innerText = "Email is empty";
//   } else if (!filter.test(email.value)) {
//     invalidEmail.innerText = "Wrong email";
//   } else {
//     invalidEmail.innerText = "";
//   }

//   if (passWord.value == "") {
//     invalidPass.innerText = "Password is empty";
//   } else if (passWord.value.length < 6) {
//     invalidPass.innerText = "Passwords must be at least 6 characters";
//   } else {
//     invalidPass.innerText = "";
//   }

//   if (
//     !email.value == "" &&
//     email != null &&
//     filter.test(email.value) &&
//     !passWord.value == "" &&
//     passWord != null &&
//     passWord.value.length >= 6
//   ) {
//     signIn(e);
//   } else {
//     e.preventDefault();
//   }
// }
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getStorage,ref, uploadBytes  } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-storage.js";
import { getAuth, GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged,createUserWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";
import { getFirestore,collection, getDoc,setDoc, deleteDoc,doc,onSnapshot   } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBYOgK8lKXuyRBI7SchDbz8Dz2J76keE6E",
    authDomain: "xmasproject-64015.firebaseapp.com",
    projectId: "xmasproject-64015",
    storageBucket: "xmasproject-64015.appspot.com",
    messagingSenderId: "362890585670",
    appId: "1:362890585670:web:f0c9bd0f320a3d288d4c47"
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);


const signOutGoogle = () => {
  signOut(auth)
    .then(() => {
      console.log("Google signed out");
    })
    .catch((error) => {
      alert(error);
    });
};

const btnLoginWithGoogle = document.getElementById("btnLoginWithGoogle");
const btnSignOutWithGoogle = document.getElementById("btnSignOutWithGoogle");


const signUp = async () => {
  // const uid=uuidv4();
  const email = document.getElementById("inputemail").value;
  const firstName = document.getElementById("inputfirstname").value;
  const lastName = document.getElementById("inputlastname").value;
  const password = document.getElementById("password").value;
  const displayName = firstName + " " + lastName;
  const phoneNumber = null;
  const photoURL = null;
  const createdAt = Date.now();
  const lastLoginAt = Date.now();

  if (email.value === "" || password.value === "") {
    alert("Vui Lòng Không Đẻ tróng");
  } else {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // // Signed up
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      
      if (docSnap.exists()) {
        console.log("User has been register", docSnap.data());
      } else {
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: email,
          password: password,
          displayName: displayName,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          createdAt: createdAt,
          lastLoginAt: lastLoginAt,
        });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage);
    });
  }


};

const register = document.getElementById("btnRegister");

register.addEventListener("click", (e) => {
  e.preventDefault();
  signUp();
});
