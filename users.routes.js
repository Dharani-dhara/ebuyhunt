const userController = require('./users.controllers');
const userService = require('./users.services');
const path = require('path');
const fs = require("fs");
const express = require('express');
const User = require('./user.model');
const Auth = require('./auth')
const upload = require('./multer');
const Image = require ('./imageproduct')
const Cart = require('./cart.models')
const routes = express.Router();
routes.use(express.json());
routes.use(express.urlencoded());
//user
routes.post("/userRegister", userController.userRegister);
routes.post("/userLogin", userController.userLogin);
routes.get("/getoneuser/:_id",userController.getoneuser)
routes.get("/cart",Auth.authenticateToken,userController.cart)
routes.get("/getdata",userController.getdata);
//shop
routes.post("/shopRegister", userController.shopRegister);
routes.get("/shopgetdata", userController.shopgetdata);
routes.post("/shopAdminRegister", userController.shopAdminRegister);
routes.post("/userLogin", userController.userLogin);
routes.post("/ownerLogin", userController.ownerLogin);
routes.post("/shopAdminLogin", userController.shopAdminLogin);
routes.post("/adminLogin", userController.adminLogin);
routes.get("/user-profile", userController.userProfile);
routes.get("/vegetableGet",Auth.authenticateToken, userController.vegetableGet);
routes.post("/vegtables", Auth.authenticateToken,userController.Productregister);
routes.get("/getone", userController.getone);

routes.get("/ratingsort",userController.ratingsort)
routes.get("/deleteuser/:_id",userController.deleteUser)
routes.post("/updateuser/:_id",userController.updateUser)

routes.get("/deleteproduct/:_id",userController.deleteProduct)
routes.post("/updateproduct/:_id",userController.updateProduct)
routes.get("/getonedata/:_id",userController.getonedata)
routes.get("/getonedata/:_id/addCart", Auth.authenticateToken ,userController.addCart)
routes.get("/getonedata/:_id/deleteCart", Auth.authenticateToken ,userController.deleteCart)
routes.get("/cartone/:_id", Auth.authenticateToken ,userController.cartOne)
routes.get("/getonedata/:_id/review",userController.createProductReview)
routes.post("/todoregister",userController.Todoregister)
routes.get("/addOrder/:_id", Auth.authenticateToken ,userController.addOrder)
routes.get("/addorder1/:_id", Auth.authenticateToken ,userController.addorder1)

routes.get("/getOrder", Auth.authenticateToken ,userController.getOrder)
routes.get("/getorders", Auth.authenticateToken ,userController.getorders)
routes.get("/getallOrder", Auth.authenticateToken ,userController.getallOrder)
routes.get("/getuserorder/:_id", Auth.authenticateToken ,userController.getuserorder)
routes.get("/getIdorder/:_id", Auth.authenticateToken ,userController.getIdorder)
routes.get("/todoget",userController.Todoget)
routes.get("/todoget",userController.Todoget)
// routes.get("/cart",  async (req, res) => {
//     const owner = req.body.owner;
//     try {
//         const cart = await Cart.findOne({ owner});
//     if (cart && cart.items.length > 0) {
//          res.status(200).send("cart");
         
//     } else {
//           res.send("null");
//           console.log(owner)
//     }
//     } catch (error) {
//         res.status(500).send();
//     }
//     });

routes.post("/profile",upload.single('image'),Auth.authenticateToken,userController.Product)
routes.get("/getimageproduct",Auth.authenticateToken,userController.getimageproduct)
routes.get("/oneimageproduct/:_id",Auth.authenticateToken,userController.oneimageproduct)

module.exports = routes;