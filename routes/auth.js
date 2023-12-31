const router = require('express').Router()
const passport = require('passport')

router.get('/', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}))
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}))

router.get('/logout', (req, res) => {
    if(req.user) {
        req.logout(function(err) {
            res.redirect('/')
        })
    } else {
        res.redirect('/')
    }
})

module.exports = router