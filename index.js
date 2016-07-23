var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var firebase = require('firebase');

var plivo = require('plivo');
var p = plivo.RestAPI({
  authId: 'MAODA3YJFMNTEZYMNLY2',
  authToken: 'NDFiOGUwMWE1YTZjYjhkOTc5ZmZkZDc2OWI1N2My'
});

var config = {
    databaseURL: "https://sulekha-88a1b.firebaseio.com",
    serviceAccount: "Sulekha-47418b322e6a.json",
};

firebase.initializeApp(config);

var db = firebase.database();
var users = db.ref().child('users');
var business = db.ref().child('business');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('app/index')
});

var router = express.Router();

router.route('/createcode').post(function(req, res, next) {
  var email = req.body.email;
  if(!email) {
    return res.json({ error: 'missing email' });
  }

  users.once("value", function(snapshot) {

    var data = snapshot.val();
    var isExist = false;
    var isUpdate = false;
    var id = '';

    for(var index in data) {
      if(data[index].email === email && data[index].isActive) {
        isExist = true;
      } else {
        if(data[index].email === email) {
          isUpdate = true;
          id = index;
        }
      }
    }
    if (isExist) {
      isExist = false;
      res.status(200).send({isError: true, message: 'E-mail address already exists'});
      return;
    }

    var code = Math.floor(Math.random()*900000) + 100000;

    if (isUpdate) {
      users.child(id).update({
        code: code
      });
      res.status(200).json({ message: 'success' });
      return;
    }

    users.push({
      email: email,
      code: code,
      isActive: false
    });

    res.status(200).json({ message: 'success' });
    next();

  });
})

router.route('/checkcode').post(function(req, res) {
  var email = req.body.email;
  var phone = req.body.phone;
  var name = req.body.name;
  var code = req.body.code.toString();
  var id;

  users.once("value", function(snapshot) {
    var data = snapshot.val();
    var isExist = false;
    for(var index in data) {
      if(data[index].email === email && data[index].code.toString() === code) {
        isExist = true;
        id = index;
      };
    }
    if (isExist) {
      users.child(id).update({
        isActive: true
      });
      res.status(200).json({ message: 'success' });
      isExist = false;
    } else {
      res.json({ isError: true, message: 'Wrong verification code' });
    }

  });

});

app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


//Math.floor(Math.random()*90000) + 10000;