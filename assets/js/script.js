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
  let $tr = $("<tr>");

  let $name = $("<td>").addClass("name text-center");
  $name.text(snapshot.val().name);
  $tr.append($name);

  let $role = $("<td>").addClass("role text-center");
  $role.text(snapshot.val().role);
  $tr.append($role);

  let $startDate = $("<td>").addClass("start-date text-center");
  $startDate.text(snapshot.val().startDate);
  $tr.append($startDate);

  let $monthlyRate = $("<td>").addClass("monthly-rate text-center");
  $monthlyRate.text(snapshot.val().rate);
  $tr.append($monthlyRate);

  let momentStartDate = moment(snapshot.val().startDate, "MM/DD/YYYY");
  let momentMonthsWorked = momentStartDate.diff(moment(), 'months');
  let $monthsWorked = $("<td>").addClass("months-worked text-center");
  $monthsWorked.text(JSON.stringify(momentMonthsWorked * -1) + " months");
  $tr.append($monthsWorked);

  $("#employee-table-body").append($tr);

});
