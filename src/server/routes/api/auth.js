const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const upload = require('../../utils/upload');
const { createUserToken } = require('../../utils/token');

router.post('/sign-up', (req, res) => {
    const { email, password, profilePicture } = req.body;

    if (!email || !password)
        //missing || !profilePicture
        res.status(400).send({ error: 'Missing Credentials.', body: req.body });

    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) return res.status(400).send({ error: 'E-Mail exists already.' });

            return req.files && req.files.picture ? upload(req.files.picture) : Promise.resolve();
        })
        .then(pictureUrl => {
            const hashedPassword = bcrypt.hashSync(password, 10);
            return new User({
                email,
                password: hashedPassword,
                profilePicture: pictureUrl,
                name: req.body.name
            }).save();
        })
        .then(user => {
            const token = createUserToken(user);
            res.send({ token });
        });
});

router.post('/sign-in', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).send({ error: 'Missing Credentials.' });

    User.findOne({ email }).then(existingUser => {
        if (!existingUser) return res.status(400).send({ error: 'User does not exist.' });

        const passwordsMatch = bcrypt.compareSync(password, existingUser.password);

        if (!passwordsMatch) return res.status(400).send({ error: 'Password is incorrect.' });

        const token = createUserToken(existingUser);
        res.send({ token });
    });
});

module.exports = router;
