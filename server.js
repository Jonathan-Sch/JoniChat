var express = require("express");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.use(cors());

var userData = {

	"Testperson1":{
		"name":"Testperson1",
		"created": new Date(),
		"chats":{
			"Elisa" : [{
				"messagetitle":"message1",
				"content":"First Testmessage",
				"wasread":true,
				"date": new Date()
			},
             {
				"messagetitle":"message2",
				"content":"Second Testmessage",
				"wasread":true,
				"date": new Date()
				}
			
			],
			"Johan" : [{
				"messagetitle":"message1",
				"content":"First Lorem",
				"wasread":true,
				"date": new Date()
			},
             {
				"messagetitle":"message2",
				"content":"Second Lorem",
				"wasread":true,
				"date": new Date()
				}
			
			]
		}
	},
	"Testperson2":{
		"name":"Testperson2",
		"created": new Date(),
		"chats":{
			"Michael" : [{
				"messagetitle":"message1",
				"content":"First Text",
				"wasread":true,
				"date": new Date()
			},
             {
				"messagetitle":"message2",
				"content":"Second Text",
				"wasread":true,
				"date": new Date()
				}
			
			],
			"Ludolf" : [{
				"messagetitle":"message1",
				"content":"First Lorem Ipsum dolor",
				"wasread":true,
				"date": new Date()
			},
             {
				"messagetitle":"message2",
				"content":"Second Lorem Ipsum dolor",
				"wasread":false,
				"date": new Date()
				}
			
			],
			"Elisa" : [{
				"messagetitle":"message1",
				"content":"First Testperson2 text",
				"wasread":true,
				"date": new Date()
		}]
		
		}
	}
		
	
	
}


app.listen(3000);

app.get("/user/:name/:searchname", function(req, res){
	var username = req.params.name;
	var searchname = req.params.searchname;
	var selectedusers = showMessages(username, searchname);
res.contentType = "application/json";
res.status(200).send(selectedusers);

});

app.get("/user/:name/:searchname/:messageTitle", function(req, res){
	var username = req.params.name;
	var searchname = req.params.searchname;
	var messageTitle = req.params.messageTitle;
	console.log("Server MessageTitle: "+messageTitle)
	var selectedusers = showSingleMessage(username, searchname, messageTitle);
res.contentType = "application/json";
res.status(200).send(selectedusers);

});

app.get("/user/:name", function(req, res){
	var currentUser = req.params.name;
	var messagedUsers = (showContactedUsers(currentUser));
	res.contentType = "application/json";
	console.log("get function: "+messagedUsers)
	console.log("get get: "+Object.keys(messagedUsers))
	res.status(200).send(messagedUsers);
})

app.get("/user", function(req,res){
	
	var users = showAllUsers();
	res.contentType="application/json";
	res.status(200).send(users);
	
})

app.post("/message/:absender/:empfaenger", function(req, res){

	var absender = req.params.absender;
	var receiver = req.params.empfaenger;
	var message = req.body;
	
	postNewMessage(absender, receiver, message);
	res.status(200).send("Message successfully posted!")
	
	
})

app.put("/user/:name/:searchname/:messageTitle", function(req, res){
	var newMessage = req.body;
	var username = req.params.name;
	var searchname = req.params.searchname;
	var messageTitle = req.params.messageTitle;
	console.log("Server MessageTitle modified: "+messageTitle)
	console.log(req.body+" req.body")
	var selectedusers = editSingleMessage(username, searchname, messageTitle, newMessage);
res.contentType = "application/json";
res.status(200).send(selectedusers);

});


function postNewMessage(absender, receiver, message){
	
	
	if(userData[receiver]["chats"][absender] == undefined){
		userData[receiver]["chats"][absender] = []
	}
	
	userData[receiver]["chats"][absender].push(message);
	
	console.log("Absender: "+absender)
	console.log("Empfänger: "+receiver),
	console.log(message);
}



function showMessages(username, searchname){
	
	console.log(username);
	

	
	return userData[username]["chats"][searchname];
}

function showSingleMessage(username, searchname, messageTitle){
	


console.log("object.keys "+ Object.keys(userData[username]["chats"][searchname]))
console.log(userData[username]["chats"][searchname][0]);

var anzahlMessages = Object.keys(userData[username]["chats"][searchname]);
for(var i = 0; i < anzahlMessages.length; i++){
	if(userData[username]["chats"][searchname][i]["messagetitle"] == messageTitle){
		console.log("user gefunden = "+ userData[username]["chats"][searchname][i])
		return userData[username]["chats"][searchname][i];
		
	}
}


	return null;
	
	
}

function editSingleMessage(username, searchname, messageTitle, newMessage){
	


	console.log("object.keys "+ Object.keys(userData[username]["chats"][searchname]))
	console.log(userData[username]["chats"][searchname][0]);

	var anzahlMessages = Object.keys(userData[username]["chats"][searchname]);
	for(var i = 0; i < anzahlMessages.length; i++){
		if(userData[username]["chats"][searchname][i]["messagetitle"] == messageTitle){
			console.log("user gefunden = "+ userData[username]["chats"][searchname][i])
			 userData[username]["chats"][searchname][i] = newMessage;
			
		}
	}


		return null;
		
		
	}


function showContactedUsers(username){

	var contactedUser = {};
	var notRead = 0;
	
			var chatpartner = Object.keys(userData[username]["chats"]);
		
	for (var i = 0; i < chatpartner.length; i++){
		//console.log(chatpartner[0])
		notRead = 0;
		for(var j = 0; j < userData[username]["chats"][chatpartner[i]].length; j++){
	
		
		//console.log(Object.keys(userData[username]["chats"]))
		if(userData[username]["chats"][chatpartner[i]][j]["wasread"] === false){
			notRead++;
		}
	}
		contactedUser[chatpartner[i]] = notRead; 
		console.log(Object.keys(contactedUser))
	}
	console.log(Object.keys(contactedUser)+" 178");
//	return Object.keys(userData[username]["chats"]);
	
	return contactedUser;
}

function showAllUsers(){
	
return Object.keys(userData);
	
}