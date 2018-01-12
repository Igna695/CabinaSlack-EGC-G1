var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var API = process.env.SLACK_TOKEN
var ayud = "Estos son los comandos disponibles en el bot: \n\n *Buenas:* el bot te saludará cordialmente. \n *get polls:* muestra un listado de las encuestas disponibles junto con su id. \n *get questions from poll x:* Muestra el listado de preguntas para una encuesta. x se corresponde con el id de la encuesta.";

var rtm = new RtmClient(API);
rtm.start();

let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
      if (c.is_member && c.name ==='testbot') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

//rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
//  rtm.sendMessage("/vote Gonzalo es gitano? [Si,No,Velazke]", channel);
//});

var mysql      = require('mysql');
var queryString = 'SELECT title FROM poll';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
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
	var msg = message.text;
	
	if(msg==='get polls'){

	connection.query('SELECT * FROM poll', function(err, rows, fields){
		if(err) throw err;
	
		for(var i in rows){
			rtm.sendMessage('*ID:* '+rows[i].id+' -- *Encuesta:* '+rows[i].title, channel);
			}
	
		});
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

	if(msg==='Buenas' || message.text==='Hola'){
	rtm.sendMessage('Buenas <@'+message.user+'>. Espero que tenga un buen día', channel);

}
if (msg=='help' || msg==='Help'){
	rtm.sendMessage(ayud, channel);
}



		
});
//connection.end();














