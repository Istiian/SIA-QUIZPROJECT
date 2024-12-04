const express = require("express");
const router = express.Router();
const session = require("express-session");

router.get("/", function(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error destroying session');
        }

        res.render("Home", {
            title: 'GeoChallenge',
            IfLogIn: false,  // Set IfLogIn to false after logout
            Username: null   // Clear the Username after logout
        });
    });
});


module.exports = router;
