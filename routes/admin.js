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
    const data = News.find({}, (err, data) => {
        console.log(data)
        res.render("admin/index", {
            title: "Admin",
            data
        });
    });


});

router.get("/news/add", (req, res) => {
    res.render("admin/news-form", {
        title: "Dodaj news",
        body: {},
        errors: {}
    });
});

router.post("/news/add", (req, res) => {
    const body = req.body

    const newsData = new News(body);
    const errors = newsData.validateSync();



    newsData.save((err) => {
        if (err) {
            res.render("admin/news-form", {
                title: "Dodaj news",
                errors,
                body
            });
            return;
        }
        res.redirect('/admin')

    })


});

router.get("/news/delete/:id", (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin')
    })
});

// MongoDB
// Users: admin
// Pass: LD7U84cNUJExSxp

module.exports = router;