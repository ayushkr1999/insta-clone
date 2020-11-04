const express = require('express');
const fileUpload = require('express-fileupload');

const connectDB = require('./config/db.js');
const users = require('./routes/api/users');
// // const profile = require('./routes/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');
// const auth2 = require('./routes/api/auth2');
// const auth3 = require('./routes/api/auth3');
// var fs = require('fs');
const auth2 =require('./middleware/auth')

const app = express();

app.use(express.json({extended:false}));



// Connect to MongoDB
connectDB();

app.use(fileUpload());

// Use Routes
app.use('/api/users', users);
// app.use('/profile', profile);
// app.use('/api/classes', classes);
app.use('/api/auth', auth);
app.use('/api/posts', posts);
// app.use('/api/auth3', auth3);

//sere static assest in production
if(process.env.NODE_ENV =='production'){
    app.use(express.static('client2/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client2','build','index.html'))
    })
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
