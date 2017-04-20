
var brotherhood = true;
var ordeal = true;
var non_member = true;
var vigil = true;

var Larkspur = true;
var Fairfax = true
var San_Rafael = true
var Tiburon = true;
var Novato = true;
var Mill_Valley = true;
var San_Anselmo = true;
var Corte_Madera = true;
var Belvedere = true;

var OALevel
var OALocation

var mailingListExample;
var mailingList;
var messagingList;
var locations = null
var email = null;
var phoneNumber = null;
var level = null;
var name = null;

function readFile(roster) {
    $.getJSON(roster, function(json) {
        var myData = json;
        //console.log(myData.All[0].City)
        //console.log(myData)

        // Search by Location
        locations = myData.All.map(function(a) {return a.City;});

        // Search by Email
        email = myData.All.map(function(a) {return a["Email Address"];});

        //Search by Phone Number
        phoneNumber = myData.All.map(function(a) {return a["Phone Number"];});

        //Search by Level
        level = myData.All.map(function(a) {return a.Level;});

        //Search by Name
        name = myData.All.map(function(a) {return a["Full Name"];});
    });
}

function filterData(roster) {
    $.ajaxSetup({
        async: false
    });
    readFile("roster.js");
        var exampleEmails = "erikgundersen.200@gmail.com,brauliocordova3@gmail.com";
        mailingListExample = exampleEmails.split(',');
        mailingList = email.slice(0);
        messagingList = phoneNumber.slice(0);

        OALevel = level.slice(0);
        OALocation = locations.slice(0);
    //return name.replace(/(\,.*?)\,/g, "$1<br>");;

    // Disable Brotherhood button
    sortData(brotherhood, null);

    return "Working..."
}

function sortData(toggleLevel, toggleLocation){
    console.log("SortData Working...")
    if(toggleLevel == true){
        toggleLevel = false;
    }
    else {
        toggleLevel = true;
    }
    brotherhood = toggleLevel;
    //console.log(brotherhood);
    //console.log(OALevel);

    /* Boot List:
     * Search's Roster for Info
     * Saves email, name, level, locations
     *
    */

    //Find INDEX's of ALL objects with "brotherhood" in them.
    //Remove specified index's
    //Display Names of ALL Index's (remaining)
    //Email Remaining Index's
}

// Client ID and API key from the Developer Console
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

        function sendNewMessage() {
        gapi.client.load('gmail', 'v1', function() {
            var receiver;
            for (var i = 0; i < mailingListExample.length; i++) {
            //Do something
            receiver = mailingListExample[i];
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
