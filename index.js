const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConfig = require('./db.config');
const User = require('./user.model');
const Chat = require('./user_model');
const app = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const {unless} = require('express-unless');
const errors = require('./error');
const { query } = require('express');
const multer=require('multer');
const path= require('path');
// const file=require("fs")
const model = require('./model')
const bp = require('body-parser')
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/',(req, res) => {
res.send('We are at home')
});
app.use("/product", require('./users.routes'));
app.use('/uploads', express.static(__dirname +'/uploads/'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads')
      console.log(storage);
},

filename: function (req, file, cb) {
cb(null, new Date().toISOString()+file.originalname)
}
})

var upload = multer({ storage: storage })
// console.log(upload);

app.post('/upload', upload.single('myFile'), async(req, res, next) => {
console.log("file")
const file = req.file
// console.log(file);
if (!file) {
  const error = new Error('Please upload a file')
  error.httpStatusCode = 400

  return next("hey error")
}

const imagepost= new model({
image: file.path
})

const savedimage= await imagepost.save()
res.json(savedimage)

})

app.get('/image',async(req, res)=>{
 const image = await model.find()
 res.json(image)

});

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=>{
    console.log('server is started', PORT);

    

});
const io = require('socket.io')(server, {cors: {origins: "*:*"}});

        
        const connectedUser = new Set();
        io.use(function(socket, next){
            if (socket.handshake.query && socket.handshake.query.token){
              jwt.verify(socket.handshake.query.token, 'Snippet_SceretKey', function(err, decoded) {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
              });
            }
            else {
                console.log("Authentication error");
              next(new Error('Authentication error'));
            }    
          }).
        
        on('connection', (socket)=>{
            
            socket.join('test');
            console.log("connected Successfully", socket.id);
            connectedUser.add(socket.id);
            console.log(socket.decoded);
            io.emit('connected-user', connectedUser.size);
            socket.on('disconnect', ()=>{
                console.log("Disconnected SuccessFully", socket.id);
                connectedUser.delete(socket.id);
                io.emit('connected-user', connectedUser.size);
            });
        
            socket.on('message', async (data)=>{
                console.log(data);
                if(data == undefined){
                    return callback({message});
                }
                const user = await User.findOne({email:socket.decoded.data});
                

                let model = {
                    message : data.message,
                    socket_id : socket.id,
                    date:  Date.now(),
                    user_id: user._id,

                }
                console.log(model);
                const chat = new Chat(model);
                chat.save()
                
            //    .then((response) => {
            //     return callback(null, response);
                
            //      }).catch((error) => {
            //         return callback(error);
            //     });
           
                console.log(data);
                socket.emit('message-receive', data);
                socket.broadcast.emit('message-receive', data);
                
          });
        });

        app.use("/users", require('./users.routes'));
app.use("/product", require('./users.routes'));
app.get('/users',(req, res) => {
  res.send('We are at home')
  });
app.get('/product',(req, res) => {
  res.send('We are at Product page')
  });
  app.use("/uploads",express.static("uploads"))


        auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/userLogin", methods: ["POST"] },
            { url: "/users/ownerLogin", methods: ["POST"] },
            { url: "/users/shopAdminLogin", methods: ["POST"] },
            { url: "/users/adminLogin", methods: ["POST"] },
            { url: "/users/userRegister", methods: ["POST"] },
            { url: "/users/ownerRegister", methods: ["POST"] },
            { url: "/users/shopAdminRegister", methods: ["POST"] },
            { url: "/product/vegtables", methods: ["POST"] },
            { url: "/product/getoneproduct/:_id", methods: ["GET"] },
            { url: "/product/getonedata/:_id/review", methods: ["GET"] },
            { url: "/product/getonedata/:_id/addCart", methods: ["GET"] },
            { url: "/product/getonedata/:_id/deleteCart", methods: ["GET"] },
            { url: "/product/todoregister", methods: ["POST"] },
            { url: "/product/todoget", methods: ["GET"] },
            { url: "/product/ratingsort", methods: ["GET"] },
            { url: "/users/cart", methods: ["GET"] },
            { url: "/users/cartone/:_id", methods: ["GET"] },
            { url: "/users/addOrder/:_id", methods: ["GET"] },
            { url: "/users/addorder1/:_id", methods: ["GET"] },
            { url: "/users/getOrder", methods: ["GET"] },
            { url: "/users/getorders", methods: ["GET"] },
            { url: "/users/getallOrder", methods: ["GET"] },
            { url: "/users/getuserorder/:_id", methods: ["GET"] },
            { url: "/users/getIdorder/:_id", methods: ["GET"] },
            { url: "/users/profile", methods: ["Post"] },
            { url: "/product/getimageproduct", methods: ["GET"] },
            { url: "/product/oneimageproduct/:_id", methods: ["GET"] },
          ],
    })
);




app.use(errors.errorHandler);

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('Database Connected');
    },
    (error) => {
        console.log('Database can`t be connected' + error);
    }
);
