var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hola',
  database : 'votaciones_splc'
});
console.log('Test de conexión con la base de datos');
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    console.log('TEST FALLIDO');
    return;
  }
   console.log('connected as id ' + connection.threadId);
   console.log('TEST OK');
   });
