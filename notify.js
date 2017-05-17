var dynamicRoster;
var staticRoster;
/**
 * Initializes setup
 * @param   {string} roster The name of the roster
 * @returns {string}   void
 */
function initialize(roster) {
    filterData(roster);
    staticSeperation();
    return "";
}
/**
 * Reads roster from JSON file and stores data in myData
 * @param {string} roster The name of the roster
 */
function readFile(roster) {
    $.getJSON(roster, function (json) {
        myData = json;
    });
}
/**
 * Create two new rosters using the roster we found with ajax
 * @param {string} roster The name of the roster
 */
function filterData(roster) {
    $.ajaxSetup({
        async: false
    });
    readFile("roster.js");
    //Set ajax Array equal to new static & dynamic arrays
    staticRoster = JSON.parse(JSON.stringify(myData));
    dynamicRoster = myData;
}
/**
 * Sorts the data on button press
 * @param   {string} toggle    Specific value such as San Rafael
 * @param   {string} attribute Name of category that includes toggle. Ex: locations
 * @returns {string}   Exit the function on void
 */
function sortData(toggle, attribute) {
    staticSeperation();
    dynamicSeperation();
    var indexes = getAllIndexes(eval(attribute + "Static"), toggle);
    if (eval(attribute)[indexes[0]] != 555) {
        for (var i = indexes.length - 1; i >= 0; i--) {
            eval(attribute)[indexes[i]] = 555;
            dynamicRoster.All[indexes[i]] = 555;
        }
        return "Exit"
    }
    if (eval(attribute)[indexes[0]] == 555) {
        for (var i = indexes.length - 1; i >= 0; i--) {
            eval(attribute)[indexes[i]] = eval(attribute + "Static")[indexes[i]];
            dynamicRoster.All[indexes[i]] = staticRoster.All[indexes[i]];
        }
        return "Exit"
    }
}
/**
 * Find all array indexes with specific value
 * @param   {Array} arr Input array
 * @param   {string} val Value in array
 * @returns {number} Index number of value in array
 */
function getAllIndexes(arr, val) {
    var indexes = []
        , i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val) indexes.push(i);
    return indexes;
}
/**
 * Test function built for printing current phone numbers and emails in the console
 */
function displayEmails() {
    dynamicSeperation();
    var carriers = ['@txt.att.net', '@tmomail.net', '@@vtext.com', '@messaging.sprintpcs.com'];
    console.log(dynamicRoster);
    console.log(email);
    for (var i = 0; i < phoneNumber.length; i++) {
        for (var b = 0; b < carriers.length; b++) {
            console.log(phoneNumber[i].replace(/[/-]/g, '').replace(/[' )(']/g, '') + carriers[b]);
        }
    }
}
/**
 * Seperates the Roster data into multiple (easily manageable) sections
 * @returns {function} sets the seperated data only once
 */
var staticSeperation = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            // Search by Location
            locations = staticRoster.All.map(function (a) {
                return a.City;
            });
            //Search by Level
            level = staticRoster.All.map(function (a) {
                return a.Level;
            });
            //Search by level (Static)
            levelStatic = staticRoster.All.map(function (a) {
                return a.Level;
            });
            //Search by level (Static)
            locationsStatic = staticRoster.All.map(function (a) {
                return a.City;
            });
        }
    };
})();
/**
 * Seperates and updates the Roster Data
 */
function dynamicSeperation() {
    //Search by Name
    name = dynamicRoster.All.map(function (a) {
        return a["Full Name"];
    });
    // [[NOTICE]]: There may be an error where email never has anything removed from it. If this occurs, place 'email' right above 'for' loop below :D
    // Search by Email
    email = dynamicRoster.All.map(function (a) {
        return a["Email Address"];
    });
    //Search by Phone Number
    phoneNumber = dynamicRoster.All.map(function (a) {
        return a["Phone Number"];
    });
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
        discoveryDocs: DISCOVERY_DOCS
        , clientId: CLIENT_ID
        , scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        sendEmailButton.onclick = handleSendEmailClick;
        console.log("Client initialized...");
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
    }
    else {
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
    console.log(" sendNewMessage()...");
    sendNewMessage();
}
/**
 * Takes every email left on the roster after filtering, encodes emails into Base64, and sends them.
 */
function sendNewMessage() {
    var myText = document.getElementById("myText").value;
    var mySubject = document.getElementById("mySubject").value;
    dynamicSeperation();
    gapi.client.load('gmail', 'v1', function () {
        var receiver;
        var carriers = ['@mmode.com', '@tmomail.net', '@@vtext.com', '@messaging.sprintpcs.com'];
        for (var i = 0; i < phoneNumber.length; i++) {
            for (var b = 0; b < carriers.length; b++) {
                console.log(phoneNumber[i].replace(/[/-]/g, '').replace(/[' )(']/g, '') + carriers[b]);
                email.push(phoneNumber[i].replace(/[/-]/g, '').replace(/[' )(']/g, '') + carriers[b]);
            }
        }
        for (var i = 0; i < email.length; i++) {
            receiver = email[i];

            // Encrypt in Base64
            var encryptedEmail = btoa("Content-Type:  text/plain; charset=\"UTF-8\"\n" + "Content-length: 5000\n" + "Content-Transfer-Encoding: message/rfc2822\n" + "to: " + receiver + "\n" + "from: \"Talako\" me\n" + "subject: " + mySubject + "\n\n" + myText).replace(/\+/g, '-').replace(/\//g, '_');
            var mailToBeSent = encryptedEmail;
            console.log(mailToBeSent);
            var inquiry = gapi.client.gmail.users.messages.send({
                'userId': "me"
                , 'resource': {
                    'raw': mailToBeSent
                }
            });
            inquiry.execute(function (result) {
                console.log(result);
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
    }).then(function (response) {
        var labels = response.result.labels;
        appendPre('Labels:');
        if (labels && labels.length > 0) {
            for (i = 0; i < labels.length; i++) {
                var label = labels[i];
                appendPre(label.name)
            }
        }
        else {
            appendPre('No Labels found.');
        }
    });
}

/**
 * Changes colors of buttons
 * @param {color} element color of buttons
 */
function switchColors(element) {
    if (element.style.color == "orange") {
        element.style.color = "white";
    }
    else if (element.style.color = "white") {
        element.style.color = "orange";
    }
}
