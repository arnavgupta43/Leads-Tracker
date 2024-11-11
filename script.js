
//importing the code form the firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
//adding the database Url
const firebaseConfig = {
  databaseURL:
    "https://leads-tracker-app-aaafb-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//creating a reference of the database
const referenceInDB = ref(database, "leads");

//selecting each buuton and inputs
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.querySelector("#delete-btn");

//OnValue function check the changes made in the database and feteches the values
onValue(referenceInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

//remove function removes the data from the database
deleteBtn.addEventListener(
  "click",
  function () {
    remove(referenceInDB);
    ulEl.innerHTML = "";
  },
  false
);

// Add a new lead from the input
inputBtn.addEventListener(
  "click",
  function () {
    push(referenceInDB, inputEl.value);

    inputEl.value = "";
  },
  false
);

// Render function to display the links
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    let url = leads[i];
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    listItems += `<li><a target='_blank' href="${url}">${leads[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}
