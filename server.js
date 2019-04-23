const express     = require('express'),
bodyParser = require('body-parser'),
mongoose    = require('mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const Message = mongoose.model('Message',{ name : String, message : String});
const dbUrl = 'mongodb+srv://dbUser:mikehrag@chatsum-a6e6q.azure.mongodb.net/checksum?retryWrites=true';

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  });
});

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if(err)
    sendStatus(500);
    res.sendStatus(200);
  });
});

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  });
});

io.on('connection', () => {
  console.log('A user is connected');
});

mongoose.connect(dbUrl, (err) => {
  console.log('mongodb connected, error:', err);
});

var server = app.listen(3000, () => {
  console.log('Server is running on port', server.address().port);
});
