create user 'votaciones-user'@'%' identified by password '*373989C21D194102CC8F3ACA0E0055CD10BD5506';

grant select, insert, update, delete 
		on `votaciones_splc`.* to 'votaciones-user'@'%';