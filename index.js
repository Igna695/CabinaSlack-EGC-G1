var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var {WebClient} = require('@slack/client');
var API = process.env.SLACK_TOKEN;

var rtm = new RtmClient(API);
rtm.start();

var web = new WebClient(API);
let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
      if (c.is_member && c.name ==='testbot') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

rtm.on(CLIENT_EVENTS.WEB.message, function () {
  rtm.sendMessage("/vote Gonzalo es gitano? [Si,No,Velazke]", channel);
});

var mysql      = require('mysql');
var queryString = 'SELECT title FROM poll';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hola',
  database : 'votaciones_splc'
});

//connection.query('SELECT * FROM poll', function(err, rows, fields){
//	if(err) throw err;
	
//	for(var i in rows){
//		console.log('Poll title: ', rows[i].title);
//		}
//	});



//rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {

//	connection.query('SELECT * FROM poll', function(err, rows, fields){
//		if(err) throw err;
	
//		for(var i in rows){
//			rtm.sendMessage(rows[i].title, channel);
//			}
//		});

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
	if(message.text==='encuestas'){
	
	connection.query('SELECT * FROM poll', function(err, rows, fields){
		if(err) throw err;
	
		for(var i in rows){
			rtm.sendMessage(rows[i].title, channel);
			}
	
		});
	}

	if(message.text.includes('Benavides')||message.text.includes('benavide')||message.text.includes('benavides')){
		rtm.sendMessage('Be careful my friend <@'+message.user+'>. El profesor podría estar en esta sala.', channel);
	}

	if(message.text==='Buenas' || message.text==='Hola'){
	web.chat.postMessage(API, channel, 'hola');
	rtm.sendMessage('Buenas <@'+message.user+'>. Espero que tenga un buen día', channel);
	}

	if(message.text==='k'){
		var at ={
			as_user: true,
      attachments: [
				{
					color:"red",
					text:"Viajecito",
					fallback: "Book your flights at https://flights.example.com/book/r123456",
					actions: [
						{
							type: "button",
							text: "Book flights 🛫",
							url: "https://flights.example.com/book/r123456",
							style: "primary"
						},
						{
							type: "button",
							text: "Cancel travel request",
							url: "https://requests.example.com/cancel/r123456",
							style: "danger"
						}
					]
				}
			]
		};
		
	return	web.chat.postMessage(message.channel, '', at);
	}		
});
//connection.end();














