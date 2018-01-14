var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var {WebClient} = require('@slack/client');
var API = process.env.SLACK_TOKEN
var rtm = new RtmClient(API);
var web = new WebClient(API);

rtm.start();

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
  password : '1234',
  database : 'votaciones_splc'

});

function getRandomColor() {

	var letters = '0123456789ABCDEF';
	var color = '#';

	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
}
  
rtm.on(RTM_EVENTS.MESSAGE, function(message) {
	var msg = message.text;

	if(msg==='!polls'){

		connection.query('SELECT * FROM poll', function(err, rows, fields){
			if(err){ throw err;}
			var ar = [];

			for(var i in rows){
				var aux = { color: getRandomColor(),
							 text: "*Nº "+ rows[i].id + "* - " + rows[i].title+"",
							 fallback:"",
							 mrkdwn_in:["text"]};			 
				ar.push(aux);
			}

			var res = ar;	

			var at ={
				as_user: true,
				attachments: res
			};

			return	web.chat.postMessage(message.channel, '', at);
		});
	}

	if(msg==='Buenas' || msg==='Hola'){
		rtm.sendMessage('Buenas <@'+message.user+'>. Espero que tenga un buen día', channel);
	}

	if(msg.startsWith('¿poll')){

		var pollid=msg.substring(6,msg.length);

		connection.query('SELECT * FROM question where poll_id='+pollid, function(err, rows, fields){
			if(rows.length<1){
				rtm.sendMessage('No existe o no hay preguntas para la encuesta '+pollid, channel);
			}

			var ar = [];

			for(var i in rows){

				var aux = { color: getRandomColor(),
							 text: rows[i].title,
							 fallback:""};			 
				ar.push(aux);
			}

			var res = ar;	

			var at ={
				as_user: true,
				attachments: res
			};

			return	web.chat.postMessage(message.channel, '', at);
		});

	}

	if (msg==='!help'){
		var ayud ={
			as_user: true,
			attachments: [
				{
					color:"danger",
					text:"*Comandos disponibles:*",
					fallback: "",
					mrkdwn_in:["text"]
				},
				{
					color:"#ADFF2F",
					text:"*Buenas:* EGC_bot te saludará cordialmente.",
					fallback: "",
					mrkdwn_in:["text"]
				},
				{
					color:"#ADFF2F",
					text:"*!wiki:* Enlaces a cada uno de los apartados de la wiki.  ",
					fallback: "",
					mrkdwn_in:["text"]
				},
				{
					color:"#ADFF2F",
					text:"*!polls:* Listado de las encuestas disponibles con su identificativo.",
					fallback: "",
					mrkdwn_in:["text"]
				},
				{
					color:"#ADFF2F",
					text:"*¿poll x:* Listado de respuestas para la encuesta número 'x'. ",
					fallback: "",
					mrkdwn_in:["text"]
				}
				
			]
		};

		return	web.chat.postMessage(message.channel, '', ayud);
	}		
	
	if (msg=='!wiki'){

		var wiki ={
			as_user: true,
			  attachments: [
				{
					color:"#ff9900",
					text:"WIKI EGC",
					fallback: "",
					actions: [
						{
							type: "button",
							text: "Inicio",
							url: "https://1984.lsi.us.es/wiki-egc/index.php/2017/2018",
							style: "primary"
						},
						{
							type: "button",
							text: "Jornadas",
							style: "primary",
							url: "https://1984.lsi.us.es/wiki-egc/index.php/Jornadas_EGC_-_17/18"
						},
						{
							type: "button",
							text: "Teoría",
							style: "primary",
							url: "https://1984.lsi.us.es/wiki-egc/index.php/Teor%C3%ADa_-_17/18"
						},
						{
							type: "button",
							text: "Trabajo",
							style: "primary",
							url: "https://1984.lsi.us.es/wiki-egc/index.php/Trabajo_-_17/18"
						},
						{
							type: "button",
							text: "Notas",
							style: "primary",
							url: "https://1984.lsi.us.es/wiki-egc/index.php/Notas_-_17/18"
						}
					]
				}
			]
		};

		return	web.chat.postMessage(message.channel, '', wiki);
	}
});














