const express = require('express');
const router = express.Router();
const Esquad = require('../../Esquad/Esquad');

//CRIAR PELOTÃO
router.get("/furriel/platoon/new", (req, res) => {
    Esquad.findAll().then(esquads => {
        // res.json({esquads: esquads});
        res.render("furriel/newPlatoon", {
            esquads: esquads
        });
    });
});

//CRIAR USUÁRIO
router.get("/furriel/user/new", (req, res) => {
    /*
      Users.findAll({
          include:[{model: Platoon, include: Esquad}]
      }).then(users => {
          res.json(users);
      })
      */
      Esquad.findAll({
      }).then(esquads => {
          res.render("furriel/newUser", {
              esquads: esquads
          });
     })
  })

module.exports = router;