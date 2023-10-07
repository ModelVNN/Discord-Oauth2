const DiscordStrategy = require('passport-discord').Strategy
const passport = require('passport')
const { clientId, clientSecret } = require('../config.json')
const Schema = require('../models/discordUsers')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await Schema.findById(id)
    if(user) {
        done(null, user)
    } else {
        new Error('')
    }
})

passport.use(new DiscordStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: 'auth/redirect',
    scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await Schema.findOne({ Id: profile.id })

        if(user) {
            done(null, user)
        } else {
            const newUser = await Schema.create({
                Id: profile.id,
                Name: profile.username
            })
            done(null, newUser)
        }
    } catch(err) {
        console.log(err)
        done(err, null)
    }
}))