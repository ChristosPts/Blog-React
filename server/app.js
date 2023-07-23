const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs')

const salt = bcrypt.genSaltSync(10);
const secret = "diwjo123waEPLj190";

const PORT = 5000;

// Use the cors middleware with the allowed origin and credentials set to true
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://chpidevtest:0mR9dKv1squafltT@cluster0.xdi4s0z.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req,res) => {
    const {username, password} = req.body
    try {
        const userDoc = await User.create({ 
            username, 
            password : bcrypt.hashSync(password, salt),
        })
        res.json(userDoc)
    } catch (e){
        res.status(400).json(e)
    }
    
})
 
app.post('/login', async (req,res) => {
    const {username, password} = req.body
    const userDoc = await User.findOne({ username})
    const passCheck = bcrypt.compareSync(password, userDoc.password)
    if (passCheck) {
        //logged in
        jwt.sign ({username, id:userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true }).json({
                id: userDoc._id,
                username,
              });
        })
    } else {
        res.status(400).json('wrong.credentials')
    }
})


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    jwt.verify(token, secret, (err, info) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ error: 'Invalid token' });
      }
      res.json(info);
    });
});
  
app.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
});


app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok')
});

app.post('/post',uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length -1 ]
    const newPath = path + '.' + ext

    fs.renameSync(path, newPath)

    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title, 
      summary, 
      content, 
      cover:newPath,
    })

    res.json({files:req.file})
})



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})