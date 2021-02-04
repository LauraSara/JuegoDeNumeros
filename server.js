const express = require("express");
app = express();
port = 8000;
const session = require('express-session');

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/static', express.static("static"));
app.use( express.json() );
app.use( express.urlencoded({extended:true}));
app.use(session({secret: 'codingdojorocks'})); 


app.get("/", (req, res) => {
  console.log(req.session.email);
  console.log(req.session.password);

  if(req.session.email != undefined)
      res.render("bienvenida", {email:  req.session.email});
  else 
      res.redirect('/login');

});

app.get("/login", (req,res) => {
  if(req.session.email != undefined)
      res.redirect('/');
  else
      res.render("inicio");
});

app.post("/procesar", (req,res) => {
  req.session.email = req.body.email;
  req.session.password = req.body.password;
  console.log(req.session.email);
  console.log(req.session.password);

  res.redirect('/');
});

app.get("/salir", (req,res) => {
  req.session.email = undefined;
  req.session.password = undefined;
  res.redirect('/login');

});

app.get("/OK", (req,res) => {
  res.redirect('index');
});

let numNuevo ;

app.get('/index', (req, res) => {
    req.session.numAleatorio = Math.floor(Math.random() * 100);
    console.log("numero aleatorio es:" +req.session.numAleatorio);
    console.log("numero nuevo es:" +numNuevo);
    res.render('index', {numAleatorio: req.session.numAleatorio, numNuevo});
});

app.get('/jugar', (req, res) => {
  console.log("numero aleatorio es:" +req.session.numAleatorio);
    res.redirect('/');
});

app.post('/jugar', (req, res) => {
    numNuevo = req.body.numNuevo;
    console.log("numero aleatorio es:" +req.session.numAleatorio);
    console.log("numero nuevo JUGAR es:" +numNuevo);
    res.render('index', {numAleatorio: req.session.numAleatorio, numNuevo});
});

app.get("/restart", function(req, res){
  number = Math.floor((Math.random()*100));
  restart = true;
  req.session.numAleatorio= undefined;
  numNuevo= undefined;
  console.log("numero:"+ numNuevo);
  console.log("numero aleatorio es:" +req.session.numAleatorio);
  res.redirect("/");
});


app.listen(8000, function() {
  console.log("listening on port 8000");
});