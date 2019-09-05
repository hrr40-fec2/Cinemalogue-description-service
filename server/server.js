const app = require('./app.js');
const port = 3002;

app.listen(port, function() {
  console.log('Server started at port ', port);
});

