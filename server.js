var express     = require('express'),
    bodyParser = require('body-parser'),
    mongoose    = require('mongoose');

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Message = mongoose.model('Message',{ name : String, message : String});

var dbUrl = 'mongodb+srv://dbUser:mikehrag@chatsum-a6e6q.azure.mongodb.net/checksum?retryWrites=true';
mongoose.connect(dbUrl, (err) => {
   console.log('mongodb connected', err);
});

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  });
});

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    res.sendStatus(200);
  });
});

var server = app.listen(3000, () => {
  console.log('Server is running on port', server.address().port);
});
