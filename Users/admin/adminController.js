
const express = require('express');
const Platoon = require('../../Platoon/Platoon');
const Esquad = require('../../Esquad/Esquad');
const Users = require('../../Users/Users');
const router = express.Router();
const bcrypt = require('bcryptjs');



//CRIAR ESQUADRÃO
router.get("/admin/esquad/new", (req, res) => {
    res.render("admin/newEsquad");
});

//SALVAR ESQUADRÃO, EDIT
router.post("/esquad/save", (req, res) => {
    var esquad = req.body.esquad;
    Esquad.create({
        nome: esquad
    }).then(()=> {
        res.redirect("/admin/esquad/list");
    });
});

//LISTAR ESQUADRÃO
router.get("/admin/esquad/list", (req, res) => {
    Esquad.findAll().then(esquads => {
        res.render("admin/listEsquad", {
            esquads: esquads
        });
    });
});

//DELETAR ESQUADRÃO
router.post("/admin/esquad/delete", (req, res) => {
    var id = req.body.id;

    Users.findAll().then(users => {
        Platoon.findAll({
            where: { esquadId: id}
        }).then(platoon => {
            Users.destroy({where:{}})
        })
    })
    Esquad.destroy({include:[{model: Platoon, include: Users}],
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/esquad/list");
    })
})

//CRIAR PELOTÃO
router.get("/admin/platoon/new", (req, res) => {
    Esquad.findAll().then(esquads => {
        res.render("admin/newPlatoon", {
            esquads: esquads
        });
    });
});

//SALVAR PELOTAO
router.post("/admin/platoon/save", (req, res) => {
    var esquad = req.body.esquad;
    var platoon = req.body.platoon;
    Platoon.create({
        esquadId: esquad,
        nome: platoon
    }).then(() => {
        res.redirect("/admin/platoon/list");
    })
});

//LISTAR PELOTAO
router.get("/admin/platoon/list", (req, res) => {
    Platoon.findAll({
        include:[{model: Esquad}]
    }).then(platoons => {
        res.render("admin/listPlatoon",{
            platoons: platoons,
        });
    });
});

//CRIAR USUÁRIO
router.get("/admin/user/new", (req, res) => {
  /*
    Users.findAll({
        include:[{model: Platoon, include: Esquad}]
    }).then(users => {
        res.json(users);
    })
    */
    Esquad.findAll({
    }).then(esquads => {
        res.render("admin/newUser", {
            esquads: esquads
        });
   })
})
//AXIOS USUARIO
router.get("/get_data", (req, res, next) => {
    var type = req.query.type;
    var search_query =  req.query.parent_value;
    console.log("TESTE TYPE: " + type);
    console.log("TESTE parent: " + search_query)

    if(type == 'load_platoon'){
        Platoon.findAll({
            include: [{model: Esquad}],
            where: {esquadId: search_query},
        }).then(platoons => {
            res.json(platoons)
        });
    } else {
        res.json("deu ruim")
    }
});

//SALVAR USUARIO
router.post("/admin/user/save", (req, res) => {
    var platoon = req.body.platoon;
    var login = req.body.login;
    var password = req.body.password;
    var name = req.body.name;
    var pg = req.body.pg;
    var perfil = req.body.perfil;
    //bcrypt
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if(isNaN(platoon)){
        res.redirect("/admin/user/new")
    } else {
        Users.create({
            platoonId: platoon,
            login : login,
            password: hash,
            nome: name,
            perfil: perfil,
            patente: pg
        }).then(() => {
            res.redirect("/admin/user/list");
        });
    }
    
});

//LISTAR USUARIO;
router.get("/admin/user/list", (req, res) => {
  
    Users.findAll({   
        include:[{model: Platoon, include: Esquad}]
    }).then(users => {
        // res.json(users);
        res.render("admin/listUser.ejs",{
            users: users
        });
    })
})


module.exports = router;