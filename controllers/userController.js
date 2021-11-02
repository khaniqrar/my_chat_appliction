const { validationResult } = require("express-validator");
var md5 = require('md5');
const dbConnection = require("../utils/dbConnection");

// Home Page
exports.homePage = async (req, res, next) => {
    dbConnection.query("SELECT * FROM `users` WHERE `id`='" + req.session.userID + "'", function (error, row) {
        if (row.length !== 1) {
            return res.redirect('/logout');
        }

        res.render('home', {
            user: row[0]
        });
    });

}

// Register Page
exports.registerPage = (req, res, next) => {
    res.render("register");
};

// User Registration
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }

    try {

        var que = "INSERT INTO users (name, email, password) VALUES ('" + body._name + "', '" + body._email + "', '" + md5(body._password) + "')";

        dbConnection.query(que, function (error, rows) {
            if (rows.affectedRows !== 1) {
                return res.render('register', {
                    error: 'Your registration has failed.'
                });
            }
            req.session.userID = rows.insertId;
            return res.redirect('/chats');


        });

    } catch (e) {
        next(e);
    }
};

// Login Page
exports.loginPage = (req, res, next) => {
    res.render("login");
};

// Login User
exports.login = async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('login', {
            error: errors.array()[0].msg
        });
    }

    try {
        dbConnection.query("SELECT * FROM users WHERE email='" + body._email + "' AND password='" + md5(body._password) + "' LIMIT 1", function (error, row) {
            if (row.length != 1) {
                return res.render('login', {
                    error: 'Invalid email address.'
                });
            }


            if (row[0]) {
                req.session.userID = row[0].id;
                return res.redirect('/chats');
            }

            res.render('login', {
                error: 'Invalid Password.'
            });

        });


    }
    catch (e) {
        next(e);
    }

}
