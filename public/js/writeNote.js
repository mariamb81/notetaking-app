console.log("writeNote.js is running");
let googleUser;

window.onload = (event) => {
  
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    //   const welcome = document.getElementById("write-header").innerHTML = ("What's on your mind, " + user.displayName + "?");
    //   alert("Hello, " + user.displayName + "!");
      var month = (new Date()).getMonth().toString();
      var year = (new Date()).getFullYear().toString();
      var day = (new Date()).getDate().toString();
        console.log(month+"/",day+"/"+year);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  const labelText = document.querySelector('#label');
  console.log("function running")
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    created: Date.now(),
    label: labelText.value
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    labelText.value = "";
    
  });
};


// const clickbutton = document.querySelector("#view");
// console.log(clickbutton)
// // clickbutton.addEventListener("click", e => {
// //     console.log("button clicked")
// //     //window.location = 'viewNotes.html';
// // });