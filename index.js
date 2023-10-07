require('./strateges/discordstrategy')
const Express = require('express')
const { port, mongoUrl } = require('./config.json')
const session = require('express-session')
const storeMongo = require('connect-mongo')
const passport = require('passport')
const path = require('path')
const database = require('./database/database')

//database
database.then(() => console.log('Connected to MongoDB'))

//connect to routes
const authRouter = require('./routes/auth')
const dashboardRouter = require('./routes/dashboard')

const app = Express()

app.use(session({
    secret: 'secret thing that i have no idea but i must change',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    name: 'discord.oauth2',
    store: storeMongo.create({ mongoUrl: mongoUrl })
}))

//passport
app.use(passport.initialize())
app.use(passport.session())

//settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//main
app.get('/', (req, res) => {
    if(!req.user) {
        res.render('index', {
            login: false
        })
    }
    else {
        res.render('index', {
            login: true
        })
    }
})

app.get('/forbidden', (req, res) => {
    res.send('login failed.')
})

//routes
app.use('/auth', authRouter)
app.use('/dashboard', dashboardRouter)

//port
app.listen(port, () => console.log(`App listened to: http://localhost:${port}`))
