const path = require('path')
const router = require('express').Router()

function isAuthed(req, res, next) {
    if(req.user) {
        next()
    } else {
        return res.redirect('/auth/redirect')
    }
}

router.get('/', isAuthed, (req, res, next) => {
    res.render('dashboard')
})

router.get('/logout', (req, res, next) => {
    if(req.user) {
        req.logout()
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

module.exports = router