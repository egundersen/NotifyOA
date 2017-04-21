//Temporary Variables (This will all be removed later, so theyeres no point paying attention to them :p)
var mailingListExample;
//End of temporary variables

var dynamicRoster;
var staticRoster;
var myData = null;
var level = null;
var locations = null
var email = null;
var phoneNumber = null;
var name = null;

//## This function is called on startup. It starts every other function
function initialize(roster){
    filterData(roster);
    staticSeperation();
    document.write(name.replace(/(\,.*?)\,/g, "$1<br>"));
    console.log(dynamicRoster);

    // This is a make-shift temporary toggle Brotherhood button. [[ I will Delete this and move it to HTML ]]
    //sortData(brotherhood, null);
    //sortData(brotherhood, null);
    //sortData(brotherhood, null);
}

//## Read Roster from JSON file and store data in 'myData'
function readFile(roster) {
    $.getJSON(roster, function(json) {
        myData = json;
    });
}

//## Create new "rosters" using the ajax roster we created above /\
function filterData(roster) {
    $.ajaxSetup({
        async: false
    });
    readFile("roster.js");
    var exampleEmails = "erikgundersen.200@gmail.com,brauliocordova3@gmail.com,555";
    mailingListExample = exampleEmails.split(',');
    //console.log(myData.All[0].City)

    //Set ajax Array equal to new static & dynamic arrays
    staticRoster = JSON.parse(JSON.stringify(myData));
    dynamicRoster = myData;

}

//## Called every time someone presses a button. This disables/enables levels & location searches
function sortData(toggle, attribute){
    /*staticSeperation();
    dynamicSeperation();
    console.log("SortData called...")
    var indexes = getAllIndexes(eval(attribute), toggle);
    if (dynamicRoster.All[indexes[0]] != 555) {
        for (var i = indexes.length -1; i >= 0; i--)
            dynamicRoster.All[indexes[i]] = 555;
            console.log("All Names Removed, add names...")
            console.log(dynamicRoster);
            // The line of code below displays names. Add CSS to the below code so the names don't take up the whole screen.
            //document.write(name.replace(/(\,.*?)\,/g, "$1<br>"));
            return "Exit"
    }
    if (dynamicRoster.All[indexes[0]] == 555) {
        for (var i = indexes.length -1; i >= 0; i--)
            dynamicRoster.All[indexes[i]] = staticRoster.All[indexes[i]];
            console.log("All Names Includes, removing names...")
            console.log(dynamicRoster);
            // The line of code below displays names. Add CSS to the below code so the names don't take up the whole screen.
            //document.write(name.replace(/(\,.*?)\,/g, "$1<br>"));
            return "Exit"
    }*/
    staticSeperation();
    dynamicSeperation();
    console.log("SortData called...")
    var indexes = getAllIndexes(eval(attribute), toggle);
    var attributeVariable = eval(attribute)
    console.log(eval(attribute)[indexes[0]]);
    if (eval(attribute)[indexes[0]] != 555) {
        for (var i = indexes.length -1; i >= 0; i--) {
            eval(attribute)[indexes[i]] = 555;
            dynamicRoster.All[indexes[i]] = 555;
        }
            console.log("All Names Removed, add names...")
            console.log(dynamicRoster);
            // The line of code below displays names. Add CSS to the below code so the names don't take up the whole screen.
            //document.write(name.replace(/(\,.*?)\,/g, "$1<br>"));
            return "Exit"
    }
    if (eval(attribute)[indexes[0]] == 555) {
        console.log("Oh... look at that!@!!!!!!!!!!!!!!!!!!!!!")
        for (var i = indexes.length -1; i >= 0; i--) {
            eval(attribute)[indexes[i]] = staticRoster.All.map(function(a) {return a.attributeVariable;});
            dynamicRoster.All[indexes[i]] = staticRoster.All[indexes[i]];
        }
            //console.log(staticRoster.All.map(function(a) {return a.eval(attribute);}));
            console.log("All Names Includes, removing names...")
            console.log(dynamicRoster);
            // The line of code below displays names. Add CSS to the below code so the names don't take up the whole screen.
            //document.write(name.replace(/(\,.*?)\,/g, "$1<br>"));
            return "Exit"
    }
}

//## Find all array indexes with specific value
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function displayEmails() {
    dynamicSeperation();
    console.log(email);
}

//## Seperate Roster data into multiple (easily manageable) sections
function staticSeperation() {
    dynamicSeperation();
    // Search by Location
    locations = staticRoster.All.map(function(a) {return a.City;});
    //Search by Level
    level = staticRoster.All.map(function(a) {return a.Level;});
}

//## Updates the new update and email lists
function dynamicSeperation() {
    //Search by Name
    name = dynamicRoster.All.map(function(a) {return a["Full Name"];});
    // [[NOTICE]]: There may be an error where email never has anything removed from it. If this occurs, place 'email' right above 'for' loop below :D
    // Search by Email
    email = dynamicRoster.All.map(function(a) {return a["Email Address"];});
    //Search by Phone Number
    phoneNumber = dynamicRoster.All.map(function(a) {return a["Phone Number"];});
}

// Client ID and API key from the Google Developer Console
var CLIENT_ID = '996403111728-re3kbokqm6f1qo8go3f02rcigfet4j7s';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://mail.google.com/';


var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var sendEmailButton = document.getElementById('send-email-button');

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
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
     signoutButton.onclick = handleSignoutClick;
     sendEmailButton.onclick = handleSendEmailClick;

     console.log(mailingListExample);
     console.log("placeholder emails have been sent...");
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
    sendEmailButton.style.display = 'block';
    listLabels();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    sendEmailButton.style.display = 'none';
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
 *  Send an email upon button click.
 */
function handleSendEmailClick(event) {
    console.log("Handling sendNewMessage()...");
    sendNewMessage();
}

//## Simply Put, this function takes every email left on the roster after filtering (dynamicRoster), encodes the message/emails into Base64, and finally sends the email
function sendNewMessage() {
    dynamicSeperation();
    gapi.client.load('gmail', 'v1', function() {
        var receiver;
        for (var i = 0; i < mailingListExample.length; i++) { //replace [mailingListExample] w/ [email]
            receiver = mailingListExample[i]; //replace [mailingListExample] w/ [email]

            // Encode to Base64
            var to = receiver,
            subject = 'Hello World',
            content = 'send a Gmail.'

            var base64EncodedEmail = btoa(
                "Content-Type:  text/plain; charset=\"UTF-8\"\n" +
                "Content-length: 5000\n" +
                "Content-Transfer-Encoding: message/rfc2822\n" +
                "to: " + receiver + "\n" +
                "from: \"test\" <erikgundersen.200@gmail.com>\n" +
                "subject: Hello world\n\n" +

                "The actual message text goes here"
            ).replace(/\+/g, '-').replace(/\//g, '_');

            var mail= base64EncodedEmail;
                console.log(mail);
            var request = gapi.client.gmail.users.messages.send({
                'userId': "me",
                'resource': {
                    'raw': mail
                }
            });
            request.execute(function(response){
                console.log(response);
            });
        }
    });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
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
