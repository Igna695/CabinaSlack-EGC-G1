var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
global.token = require('./token');

var rtm = new RtmClient(global.token);
rtm.start();
var primero = true;
var user = null;
let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
      if (c.is_member && c.name ==='testbot') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
 	rtm.sendMessage('Hora de trabajar, ya estoy aquí de nuevo.', channel);
});

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
    if (message.channel === channel)
        console.log(message);
});

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
if(primero){
    if (message.channel === channel)
        rtm.sendMessage("Oye, atentos, <@" + message.user + "> tiene algo que decir.", message.channel);
primero = false;
if(user===null){
	user = message.user;
}
}
else if(){
	
}
});



