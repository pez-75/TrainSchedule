// 1. Initialize Firebase

var config = {
  apiKey: "AIzaSyDpAxGBh68HZAPxee4PEu2o0nDPdKii6_s",
  authDomain: "train-scheduler-21ab8.firebaseapp.com",
  databaseURL: "https://train-scheduler-21ab8.firebaseio.com",
  projectId: "train-scheduler-21ab8",
  storageBucket: "train-scheduler-21ab8.appspot.com",
  messagingSenderId: "28374269530"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial value-s
var trainName=" ";
var destination="";
var freq="";
var trainTime="";

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  trainTime = $("#time-input").val().trim();
  freq = $("#freq-input").val().trim();
  // console.log(trainTime);

// Creates local "temporary" object for holding train data
var newTrain = {
  name:  trainName,
  destination: destination,
  firstTrain: trainTime,
  frequency: freq
};

   // Uploads train data to the database
   database.ref().push(newTrain);
   
  // Logs everything to console

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");

  return false;

});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;
  
  var timeArr = tFirstTrain.split(":");
  console.log(timeArr);
 
   var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
      var maxMoment = moment.max(moment(), trainTime);
      var tMinutes;
      var tArrival;
 
 var differenceTimes = moment().diff(trainTime, "minutes"); 

 console.log(differenceTimes);
 
 var tRemainder = differenceTimes % tFrequency;
 console.log(tRemainder);

 var tMinutes = tFrequency - tRemainder;

 // To calculate the arrival time, add the tMinutes to the currrent time
 var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 

//console.log(tArrival);
//console.log(differenceTimes); 
console.log(tMinutes);
console.log(tArrival);  
  // Add each train's data into the table
  $("#train-table").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
    tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td><td>" );



});

