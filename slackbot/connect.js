var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'votaciones_splc'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
   console.log('connected as id ' + connection.threadId);
   });
