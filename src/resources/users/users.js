const express = require('express'),
    router = express.Router(),
    User = require('./schema.js'),
    bcrypt = require('bcrypt'),
    BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

/**
 * POST
 * Route: /users/register
 * TODO: debug and test
 *      implement a check for USERNAME ALREADY TAKEN
 *      implement logic for interpreting salted password in the request
 */
router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(hash => {
            let user = new User({
                username: username,
                password: hash
            });
            user.save((err) => {
                if (err) {
                    res.status(500).json({
                        err: err
                    });
                }
                res.status(200).json({
                    msg: username + " successfully registered."
                });
            });
        });
});

/**
 * POST
 * Route: /users/login
 * TODO: debug and test
 */
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let data;
    User.find({username: username})
        .then(user => {
            data = user[0]
            return bcrypt.compare(password, user[0].password);
        })
        .then(passwordMatch => {
            if (!passwordMatch) {
                res.status(403).send();
            }
            res.status(200).json({
                data: data
            })
        })
        .catch(err => {
            console.log("Error authenticating user: ");
            console.log(err);
        })
});

module.exports = router
