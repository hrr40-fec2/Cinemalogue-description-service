var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));

app.listen(port, function(){
  console.log('Server started at port ', port);
});