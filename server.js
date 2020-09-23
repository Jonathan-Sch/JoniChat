var express = require("express");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.use(cors());

var userData = [{

	"name":"Testperson1",
	"chats":[{"chatpartner":"Elisa", "messages":[{"message1": "First Testmessage"}, {"message2":"Second Testmessage"}]},
		{"chatpartner":"Johan", "messages":[{"message1": "First Lorem"}, {"message2":"Second Lorem"}]}]},
		
		
		{"name":"Testperson2",
		"chats":[{"chatpartner":"Michael", "messages":[{"message1": "First Text"}, {"message2":"Second Text"}]},
			{"chatpartner":"Ludolf", "messages":[{"message1": "First Lorem Ipsum dolor"}, {"message2":"Second Lorem Ipsum dolor"}]}]
	
	
}]


app.listen(3000);

app.get("/user/:name", function(req, res){
	var username = req.params.name;
	var users = showUsers(username);
res.contentType = "application/json";
res.status(200).send(users);

});


function showUsers(username){
	
	console.log(username);
	
	var contactedUsers = [];
	
	for(var i = 0; i < userData.length; i++){
		console.log(userData[i].name);
		for(var j = 0; j <userData[i].chats.length; j++){
			console.log(userData[i].chats[j].chatpartner);
			if(userData[i].chats[j].chatpartner == username){
				contactedUsers.push(userData[i].chats[j].messages);
			}
		}
	}
	return contactedUsers;
}