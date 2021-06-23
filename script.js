// Client ID and API key from the Developer Console
var CLIENT_ID = '986597974446-rkarocjltvgag475rhbsqkeqcn257h5b.apps.googleusercontent.com';
var API_KEY = 'AIzaSyArGiA01ZDTT8HfYqQGCm5tO-FZmar1dls';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listLabels();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
function listLabels() {
  gapi.client.gmail.users.labels.list({
    'userId': 'me'
  }).then(function(response) {
    var labels = response.result.labels;
    appendPre('Labels:');

    if (labels && labels.length > 0) {
      for (i = 0; i < labels.length; i++) {
        var label = labels[i];
        appendPre(label.name)
      }
    } else {
      appendPre('No Labels found.');
    }
  });
}

// function to display primary mail 
function primaryMailBtn(){
        document.getElementById("displayMail").innerHTML = "primaryMail";
}

// function to display sent Mail  
function sentBtn(){
  document.getElementById("displayMail").style.display="block";
  document.getElementById("displayMail").innerHTML= sentMail();
}

// function to display draft Mail 
function draftMailBtn(){
  document.getElementById("displayMail").innerHTML = "draft mail";
}

// Display compose mail div
function composeMailBtn(){
  document.getElementById("popupDiv").style.display="block";
}

// close composeMail div
 function closeFn()
{
  document.getElementById("popupDiv").style.display="none";
}

// Sent button function
function sentMail(){
  var userId = document.getElementById("toId").value;
    var subject = document.getElementById("subjectId").value;
    var txtarea = document.getElementById("textareaId").value;
  var result  = `To : ${userId}  Subject : ${subject}  Message : ${txtarea}`;
  closeFn();
  return result;
}


// function sendToDraft()
// {
// if(document.getElementById("toId").value == "" && document.getElementById("subjectId").value == "" && 
// document.getElementById("textareaId").value == ""){
//   closeFn();
// }else{
//   var to = document.getElementById("toId").value;
//   var subject = document.getElementById("subjectId").value;
//   var msg = document.getElementById("textareaId").value ;
//   document.getElementById("displayDraftMails").innerHTML = `To : ${to}  Subject : ${subject}  Message : ${msg}`
// }
// }

// function sentMail(){
//   var userId = document.getElementById("toId").value;
//   var subject =  document.getElementById("subjectId").value;
//   var txtarea = document.getElementById("textareaId").value;
// fetch(`https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/send`,{
// method : "POST",
// headers:{
//   "Content-Type": "application/json"
// },
// body: JSON.stringify({
//  message: txtarea,
//  subject: subject
// })
// })
// .then((data) => data.json())
//   console.log(userId, subject,txtarea);
// }