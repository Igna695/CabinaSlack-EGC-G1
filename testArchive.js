const fs = require('fs');

const test = require('ava');

test('Probando node', t => {
    t.true(true);
});


 //Test de selección de todas las polls
 test('Probando conexion', c=>{
    connection.query('SELECT * FROM poll', function(err, rows, fields)){
    c.true(true);
}});
