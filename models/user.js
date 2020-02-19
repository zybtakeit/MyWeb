var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
})
var str="";

class User(user){
  this.name = user.name;
  this.password = user.password;
  console.log("create success");
};

User.prototype.save = function save(callback){
  var user = {
   name: this.name,
   password: this.password,
  };
  connection.connect();
  connection.query('INSERT INTO user（account, password) VALUES (?,?)',[this.name,this.password],
    function(err, data){
     if(err){
       callback(err,  data);
       connection.end();
      }
    });
};

User.get = function get(username, callback){
  connection.connect();
  connection.query('SELECT * FROM user WHERE username = ?',[username],function(err, data)    {
    if(err){
      connection.end();
      callback(err, null);
    }
    if(data){
      str = JSON.stringify(data);
      str = JSON.parse(str);
      callback(err, str);
    }else{
      callback(err, null);
    }
  });
};

module.exports = User;
  
      