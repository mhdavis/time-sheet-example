// Initialize Firebase
var config = {
  apiKey: "AIzaSyBAHOzXYhcTdTVL1D-3sd-W_Mvwph9KUhY",
  authDomain: "time-sheet-example.firebaseapp.com",
  databaseURL: "https://time-sheet-example.firebaseio.com",
  projectId: "time-sheet-example",
  storageBucket: "time-sheet-example.appspot.com",
  messagingSenderId: "329016603791"
};
firebase.initializeApp(config);

let database = firebase.database()

$(document).on("click", "#submit-button", function() {
  event.preventDefault();
  console.log("click handler entered");
  database.ref("/users").push(
    {
    name: $("#input-employee-name").val().trim(),
    role: $("#input-employee-role").val().trim(),
    startDate: $("#input-employee-start-date").val().trim(),
    rate: $("#input-employee-rate").val().trim()
  }
);
});

database.ref("/users").on("child_added", function(snapshot) {
  console.log(snapshot.val());
  let $tr = $("<tr>");

  let $name = $("<td>").addClass("name");
  $name.text(snapshot.val().name);
  $tr.append($name);

  let $role = $("<td>").addClass("role");
  $role.text(snapshot.val().role);
  $tr.append($role);

  let $startDate = $("<td>").addClass("start-date");
  $startDate.text(snapshot.val().startDate);
  $tr.append($startDate);

  let $monthlyRate = $("<td>").addClass("monthly-rate");
  $monthlyRate.text(snapshot.val().rate);
  $tr.append($monthlyRate);

  $("#employee-table-body").append($tr);

});
