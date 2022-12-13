const express = require('express');
const app = express();
const connection = require('./database/database');
const usersModel = require('./Users/Users');
const platoonModel = require('./Platoon/Platoon');
const esquadModel = require('./Esquad/Esquad');
const adminController = require('./Users/admin/adminController');
const arranchamentoController = require('./Arranchamento/arranchamentoController');
const furrielController = require('./Users/furriel/furrielController');
const bodyParser = require('body-parser')

//bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//controllers
app.use("/", adminController);
app.use("/", furrielController);
app.use("/", arranchamentoController);


//connection bd
connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados!");
}).catch((msgErro) => {
    console.log(msgErro);
});

//view engine
app.set('view engine', 'ejs');

//statics
app.use(express.static('public'));

let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let date = ("0" + date_ob.getDate());
console.log(date);
console.log(hours);
console.log(hours + ":" + minutes);
console.log(date_ob);

app.get("/", (req, res) => {
    var teste = "teste";
    res.render("index", {
        teste: teste
    });
});

app.listen(8000, function(err){
    if(err){
        console.log(err)
    } else {
        console.log("Efetuado com sucesso")
    }
});