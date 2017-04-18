function readFile(roster) {
    $.getJSON(roster, function(json) {
        var myData = json;
        //console.log(myData.All[0].City)
        //console.log(myData)

        // Search by Location
        var location = myData.All.map(function(a) {return a.City;});

        // Search by Email
        var email = myData.All.map(function(a) {return a["Email Address"];});

        //Search by Phone Number
        var phoneNumber = myData.All.map(function(a) {return a["Phone Number"];});

        //Search by Level
        var level = myData.All.map(function(a) {return a.level;});

        //Search by Name
        var name = myData.All.map(function(a) {return a["Full Name"];});
        return name;
    });
}
