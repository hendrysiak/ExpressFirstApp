const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', (req, res) => {
    new Quiz({
        title: `Pytanie1`,
        vote: 0
    })
    res.render('quiz', {
        title: 'Quiz'
    });
});

module.exports = router;