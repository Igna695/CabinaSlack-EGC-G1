var mysql      = require('mysql');
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var {WebClient} = require('@slack/client');
var API = process.env.SLACK_TOKEN;
var ayud = "Estos son los comandos disponibles en el bot: \n\n *Buenas:* el bot te saludará cordialmente. \n *!polls:* muestra un listado de las encuestas disponibles junto con su id. \n *¿poll x:* Muestra el listado de preguntas para una encuesta. x se corresponde con el id de la encuesta.";



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

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'votaciones_splc'
});


//Test de conexión
connection.connect(function(err) {
    console.log('Test de conexión con la base de datos');
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    console.log('TEST FALLIDO');
    return;
  }
   console.log('connected as id ' + connection.threadId);
   console.log('TEST OK');
   });

 //Test de selección de todas las polls
 connection.query('SELECT * FROM poll', function(err, rows, fields){
    console.log('\nTest de select en la base de datos');
    if(err){
        console.error('Error al hacer SELECT de la base de datos'+ err.stack);
        console.log('TEST FALLIDO');
    } 
    console.log('TEST OK');
});


//Test del comando Buenas/Hola
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function(message) {
var msg;

    msg = 'Buenas';
    rtm.sendMessage(msg, channel);
    
    if(msg==='Buenas' || msg==='Hola'){
        console.log('\nTest del comando Buenas');
        rtm.sendMessage('Buenas. Espero que tenga un buen día', channel);
        console.log('TEST OK');
        }else
        console.log('TEST FALLIDO');
});


//Test del comando !help
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function(message) {
    var msg3;
    
        msg3 = '!help';
        rtm.sendMessage(msg3, channel);

        if (msg3==='!help'){
            console.log('\nTest del comando !help');
            rtm.sendMessage(ayud, channel);
            console.log('TEST OK');
        }else 
        console.log('TEST FALLIDO');	

});

//Test del comando ¿poll
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function(message) {
    var msg2;
    
        msg2 = '¿poll';
        rtm.sendMessage(msg2, channel);
        
        if(msg2==='¿poll'){
            console.log('\nTest del comando ¿poll');
            connection.query('SELECT * FROM question where poll_id='+1, function(err, rows, fields){
                if(err){
                    console.error('Error al hacer SELECT de la base de datos'+ err.stack);
                    console.log('TEST FALLIDO');
                }
                if(rows.length<1){
                    rtm.sendMessage('No existe o no hay preguntas para la encuesta '+msg2, channel);     
                    console.log('TEST OK');
                }
            for(var i in rows){
                rtm.sendMessage('*- '+rows[i].title+':* '+rows[i].description+'\n', channel);
            }
            console.log('TEST OK');
            
        
            });
        }
});