var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();


var plivo = require('plivo');
var p = plivo.RestAPI({
  authId: 'MANMQ5NGI3OTVJYTEYYW',
  authToken: 'MmJmMDhlODNkZmEzODM5MzEzNmQ4YjllNmQ1ZmM2'
});


var params = {
    'dst' : '+841268462485',
    'text' : "This randomly generated text can be used in your layout (webdesign , websites, books, posters ... ) for free. This text is entirely free of law. Feel free to link to this site by using the image below or by making a simple text link"
};

p.send_message(params, function (status, response) {
    console.log('Status: ', status);
    console.log('API Response:\n', response);
    var uuid = response['message_uuid'];
    var params1 = {'record_id': uuid};
    p.get_message(params1, function(status, response1){
      console.log("Your SMS was split into " + response1['units'] + ' units');
    });
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('app/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
