const express = require("express");
const News = require('../models/news');
const router = express.Router();


router.all("*", (req, res, next) => {
    if (!req.session.admin) {
        res.redirect("login"); //sprawdź, czy jest sesja, przy kierowaniu dowolnej metody na admina

        return;
    }
    next(); // wywołuje pozostałe requesty
});

/* GET home page. */
router.get("/", (req, res) => {
    // const newsData = new News({
    //     title: 'Tytuł testowy',
    //     description: 'Opis'
    // });
    // newsData.save((err) => {
    //     console.log(err);
    // })

    res.render("admin/index", {
        title: "Admin"
    });
});

router.get("/news/add", (req, res) => {
    res.render("admin/news-form", {
        title: "Dodaj news"
    });
})


// MongoDB
// Users: admin
// Pass: LD7U84cNUJExSxp

module.exports = router;