var str = String.toString(message.user);
		if(map.has(str)){
			var aux = map.valueOf(str);
			aux=aux+1;
			if(aux===3){
				map.delete(str);
				map.set(str,0);
				return web.channels.kick(message.channel, message.user);
			}
			else{
				map.delete(str);
				map.set(str,aux);
			}
		}
		else{
			map.set(str,1)
		}
