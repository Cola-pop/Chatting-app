// initialize our libraries
const express     = require('express'),
bodyParser        = require('body-parser'),
mongoose          = require('mongoose'),
app               = express(),
http              = require('http'),
server            = http.createServer(app);

var io            = require('socket.io').listen(server);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// initialize message mongoose JSON and the mongodb database URL
const Message = mongoose.model('Message',{ name : String, message : String});
const dbUrl = 'mongodb+srv://dbUser:mikehrag@chatsum-a6e6q.azure.mongodb.net/checksum?retryWrites=true';

// our get route that sends messages from the client side to the server
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  });
});

app.get('/messages/:user', (req, res) => {
  var user = req.params.user;
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  });
});

// our post route that uses the sockets to post the messages
app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);

    var savedMessage = await message.save();
    console.log('saved');

    var censored = await Message.findOne({message:'badword'});
    if(censored)
    await Message.remove({_id: censored.id});
    else
    io.emit('message', req.body);
    res.sendStatus(200);
  }
  catch(error){
    res.sendStatus(500);
    return console.log('error', error);
  }
  finally{
    console.log('Message Posted');
  }

});

// our socket connection that also shows when a new session has been created
io.on('connection', () => {
  console.log('A user is connected');
});

// the connection to our database
mongoose.connect(dbUrl, (err) => {
  console.log('mongodb connected, error:', err);
});

// the server listener
server.listen(process.env.PORT, process.env.IP);
