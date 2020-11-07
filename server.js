if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const services = require('./backend/services');

const { users, categories, likedItems } = require('./backend/db');

app.use(express.static(__dirname + '/public'));
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.get('/about', (req, res) => {
  res.render('about.ejs')
})

app.get('/advices1', (req, res) => {
  res.render('advices1.ejs')
})

app.get('/categories', (req, res) => {
  let renderCategories = categories;
  let authData = { state: false }
  let userLikedItems = [];
  if (req.user) {
    authData.state = true;
    authData.name = req.user.name;
    renderCategories.arches = categories.arches.map(item => {
      return { ...item, added: Boolean(likedItems[`${req.user.id}`]['arches'][`${item.id}`]) };
    });
    const addedArchesList = Object.keys(likedItems[`${req.user.id}`].arches);
    for (let i = 0; i < categories.arches.length; i++) {
      if (addedArchesList.includes(categories.arches[i].id.toString())) {
        userLikedItems.push(categories.arches[i]);
      }
    }
    ;
  }
  console.log(userLikedItems);
  res.render('categories.ejs', { categories: renderCategories, authData, userLikedItems });
})

app.get('/main', (req, res) => {
  let authData = { state: false }
  if (req.user) {
    authData.state = true;
    authData.name = req.user.name;
  }
  res.render('main.ejs', { authData })
})

app.get('/services', (req, res) => {
  res.render('services.ejs')
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    services.sendMail.sendRegisterMail(req.body.email);
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userId = Date.now().toString();
    users.push({
      id: userId,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    likedItems[`${userId}`] = { arches: {} };
    res.redirect('/main')
  } catch {
    res.redirect('/register')
  }
})

app.post('/likeItem', checkAuthenticated, (req, res) => {
  const { itemId, itemCategory } = req.body;
  likedItems[`${req.user.id}`][`${itemCategory}`][`${itemId}`] = true;
  res.send(200);
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

app.post('/sendMail', (req, res) => {
  services.sendMail.sendMailToMonAmour(req.body);
  res.redirect('/main')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000)