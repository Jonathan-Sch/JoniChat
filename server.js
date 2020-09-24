var express = require("express");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.use(cors());

var userData = [{

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
				"wasread":true,
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
		
	
	
}]


app.listen(3000);

app.get("/user/:name/:searchname", function(req, res){
	var username = req.params.name;
	var searchname = req.params.searchname;
	var selectedusers = showMessages(username, searchname);
res.contentType = "application/json";
res.status(200).send(selectedusers);

});

app.get("/user/:name", function(req, res){
	var currentUser = req.params.name;
	var messagedUsers = showContactedUsers(currentUser);
	res.contentType = "application/json";
	res.status(200).send(messagedUsers);
})

app.get("/user", function(req,res){
	
	var users = showAllUsers();
	res.contentType="application/json";
	res.status(200).send(users);
	
})


function showMessages(username, searchname){
	
	console.log(username);
	
	var contactedUsers = [];
	
	
	
	for(var i = 0; i < userData.length; i++){
	
	
		var Data = userData[i][username];


			for(var j = 0; j <Data["chats"][searchname].length; j++){
		
				
					contactedUsers.push(Data["chats"][searchname][j]);
				
		
		
		}
	}
	return contactedUsers;
}


function showContactedUsers(username){
	var messagedUsers = [];
	for(var i = 0; i < userData.length; i++){
		
		var Data = userData[i][username];
		
	
		
		var names = Object.keys(Data["chats"])
		console.log(names)
		
		for(var j = 0; j < names.length; j++){
			
		
			messagedUsers.push(names[j]);
		}
		
		
			
		
	}
	return messagedUsers;
}

function showAllUsers(){
	
var Users = [];
	
	for(var i = 0; i < userData.length; i++){
		console.log(userData[i]);
		
			var createdUser = (Object.keys(userData[i]))
			console.log(createdUser)
			Users.push(createdUser);
			
		
	}
	return Users;
}