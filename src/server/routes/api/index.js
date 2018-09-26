const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const authRoutes = require('./auth');
const { userMiddleware, checkLoggedIn } = require('../../utils/middleware');
const { createUserToken } = require('../../utils/token');
const Match = require('../../models/Match');

router.use(userMiddleware);

router.get('/', (req, res) => {
    res.send({ hello: true });
});

router.get('/protected', checkLoggedIn, (req, res) => {
    console.log('USER', req.user);
    res.send({ success: true });
});

//User Routes

router.get('/profile', checkLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(req.params.id);
});

// router.delete('/profile/:id', checkLoggedIn, (req, res) => {
//     User.findById(req.param.body)
//         .then(profile => user.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

router.put('/profile', checkLoggedIn, (req, res) => {
    const { name, age, gender, description, preferences, city } = req.body;
    User.findByIdAndUpdate(
        req.user._id,
        { name, age, gender, description, preferences, city },
        { new: true }
    )
        .then(user => {
            const token = createUserToken(user);
            res.send({ token });
        })
        .catch(error => {
            console.log(error);
        });
});

router.get('/match', checkLoggedIn, (req, res) => {
    User.find({}).then(result => {
        res.send(result);
    });
});

router.get('/match/existing', checkLoggedIn, (req, res) => {
    Match.find({ from: req.user._id, confirmed: true }).then(existingMatch => {
        res.send(existingMatch);
    });
});

router.get('/match/delete', checkLoggedIn, (req, res) => {
    Match.findOneAndRemove({
        $and: [{ $or: [{ from: req.user._id }, { to: req.user._id }] }],
        confirmed: true
    }).then(() => {
        res.send({ success: true });
    });
});

router.post('/match', checkLoggedIn, (req, res) => {
    Match.findOne({
        from: req.body.otherUser,
        to: req.user._id
    })
        .then(existingMatch => {
            if (existingMatch) {
                existingMatch.confirmed = true;
                existingMatch.channel = Math.random()
                    .toString(36)
                    .substring(2, 12);
                return existingMatch.save();
            } else {
                return new Match({
                    from: req.user._id,
                    to: req.body.otherUser
                }).save();
            }
        })
        .then(match => {
            res.send(match);
        });
});

router.use('/auth', authRoutes);

router.use((req, res) => {
    res.status(404).send({ error: 'not-found' });
});

module.exports = router;
