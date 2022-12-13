const express = require('express');
const router = express.Router();

router.get("/arranchamento", (req,res) => {
    res.render("arranchamento/arranchamento");
    
});


module.exports = router;