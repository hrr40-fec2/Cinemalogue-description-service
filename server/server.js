const app = require('./app.js');
const port = process.env.PORT || 3002;

app.listen(port, function() {
  console.log('Server started at port ', port);
});

