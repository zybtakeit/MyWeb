var mysql = require('mysql');
var DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
});


module.exports =new DB;
  