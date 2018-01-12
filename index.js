var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var {WebClient} = require('@slack/client');
var API = process.env.SLACK_TOKEN
var ayud = "Estos son los comandos disponibles en el bot: \n\n *Buenas:* el bot te saludará cordialmente. \n *get polls:* muestra un listado de las encuestas disponibles junto con su id. \n *get questions from poll x:* Muestra el listado de preguntas para una encuesta. x se corresponde con el id de la encuesta.";


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

var mysql      = require('mysql');
var queryString = 'SELECT title FROM poll';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hola',
  database : 'votaciones_splc'
});

rtm.on(RTM_EVENTS.MESSAGE, function(message) {

	if(msg==='get polls'){

	connection.query('SELECT * FROM poll', function(err, rows, fields){
		if(err) throw err;
	
		for(var i in rows){
			rtm.sendMessage('*ID:* '+rows[i].id+' -- *Encuesta:* '+rows[i].title, channel);
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

	if(message.text==='button'){
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

	if(msg.includes('get questions from poll')){
		var pollid=msg.substring(24,msg.length);

		connection.query('SELECT * FROM question where poll_id='+pollid, function(err, rows, fields){
			if(rows.length<1){
				rtm.sendMessage('No existe o no hay preguntas para la encuesta '+pollid, channel);
			}
		
			for(var i in rows){
				rtm.sendMessage(rows[i].title, channel);
			}
				
		});

	}

	if (msg=='help' || msg==='Help'){
		rtm.sendMessage(ayud, channel);
	}		
			
});














