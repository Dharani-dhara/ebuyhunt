const bcryptjs = require('bcryptjs');
const userService = require('./users.services');
const path = require('path');
const fs = require("fs");
const express = require('express');
const Image= require ('./imageproduct')
//const jwt_decode = require('jwt-decode');
const User = require('./user.model');
const Order = require('./order')

const Cart = require('./cart.models')
const Product = require('./product_model');
const Category1 = require('./categories_model');
const Todo = require('./todo');

exports.userRegister = async (req, res, next) => {
    console.log(req.body)
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.userRegister(req.body, (error, result) => {
        if (error) {
            return res.send(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.getdata = async (req, res, next) => {

    try {

        const users = await User.find({ "userType": "user" });

        res.status(200).json({ success: true, data: users })

    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.getoneuser = async (req, res, next) => {

    try {
        const { _id } = req.params
        const individualuser = await User.findOne({ _id: _id });

        res.status(200).json({ success: true, data: individualuser })
        console.log(individualuser)
    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.shopRegister = async (req, res, next) => {
    console.log(req.body)
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.shopRegister(req.body, (error, result) => {
        if (error) {
            return res.send(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.shopgetdata = async (req, res, next) => {

    try {

        const users = await User.find({ "userType": "shopAdmin" });

        res.status(200).json({ success: true, data: users })

    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;

        const deletuser = await User.findOneAndDelete({ _id: _id })
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { _id } = req.params;

        const updateduser = await User.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}

exports.shopAdminRegister = async (req, res, next) => {
    console.log(req.body)
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.shopAdminRegister(req.body, (error, result) => {
        if (error) {
            return res.send(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.userLogin = (req, res, next) => {
    const { email, password } = req.body;
    userService.userLogin({ email, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.adminLogin = (req, res, next) => {
    const { email, phoneNumber, password } = req.body;
    userService.adminLogin({ email, phoneNumber, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.shopAdminLogin = (req, res, next) => {
    const { email, password } = req.body;
    userService.shopAdminLogin({ email, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.ownerLogin = (req, res, next) => {
    const { email, password } = req.body;
    userService.ownerLogin({ email, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "Authorized User" });

};

exports.vegetableGet = async (req, res, next) => {
    console.log("all");
    try {
        var product = await Product.aggregate([{ '$sort': { 'product_price': -1 } }])
        console.log(product)
        res.json(product)
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};

//  exports.sort = async (req, res, next) => {
//     console.log("all");
//    try{
//    var product=await Product.sort({product_price:1})
//     console.log(product)
//     res.json(product)
//    }catch(error){
// console.log("error")
// res.json(error)
//    }
//  };

//  exports.sortbyprice1 = async (req, res, next) => {
//     console.log("all");
//    try{
//    var product=await Product.aggregate([{'$sort': {'product_price': 1}}])
//     console.log(product)
//     res.json(product)
//    }catch(error){
// console.log("error")
// res.json(error)
//    }
//  };

//  exports.sortbyprice2 = async (req, res, next) => {
//     console.log("all");
//    try{
//    var product=await Product.aggregate([{'$sort': {'product_price':-1}}])
//     console.log(product)
//     res.json(product)
//    }catch(error){
// console.log("error")
// res.json(error)
//    }
//  };

//  exports.sortbyprice2 = async (req, res, next) => {
//     console.log("all");
//    try{
//    var product=await Product.aggregate([{'$sort': {'product_price':-1}}])
//     console.log(product)
//     res.json(product)
//    }catch(error){
// console.log("error")
// res.json(error)
//    }
//  };

exports.Productregister = async (req, res, next) => {
   
    const owner = req.user.data
    
    const Category = req.body.Category
    const product_name = req.body.product_name
    const product_price = req.body.product_price 
    const product_description = req.body.product_description 
    const product_isLikeMe = req.body.product_isLikeMe
    const product_image = req.body.product_image
    const secondary_image = req.body.secondary_image
    const quantity = req.body.quantity
    //const { _id } = req.params;
    const user = await User.findOne({ _id:owner })
    console.log(owner)
       try {
        console.log("USER" + user)
       const addr = [{
        phoneNumber: user.phoneNumber,
        houseNo: user.houseNo,
        streetName: user.streetName,
        city: user.city,
        landMark: user.landMark,
        pincode: user.pincode,
        shopName:user.shopName,
        shopEmail:user.shopEmail,
        shopNumber:user.shopNumber,
    }]
    const newProduct = await Product.create({
        quantity,secondary_image,product_image,Category, product_name,product_price,product_description,product_isLikeMe,
                        address: addr[0]
                    });
                    return res.status(201).send(newProduct);
               

 
    }
    catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }

   
};

exports.Product = async (req, res, next) => {
    const owner = req.user.data
    
    const Cname = req.body.Cname
    const product_name = req.body.product_name
    const product_price = req.body.product_price 
    const product_description = req.body.product_description 
    const product_isLikeMe = req.body.product_isLikeMe
    
    const quantity = req.body.quantity
    // const category = await Category1.findOne({ _id: Category  });
    // //const { _id } = req.params;
    // const Cname = category.name;
    const user = await User.findOne({ _id:owner })
    try {
        console.log("USER" + user)
       const addr = [{
        phoneNumber: user.phoneNumber,
        houseNo: user.houseNo,
        streetName: user.streetName,
        city: user.city,
        landMark: user.landMark,
        pincode: user.pincode,
        shopName:user.shopName,
        shopEmail:user.shopEmail,
        shopNumber:user.shopNumber,
        email:user.email,
        username:user.username,
    }]
    var obj = {
       
        img:req.file.filename,
       
    }
    var product = await Image.findOne({product_name:product_name})
    if(!product){
        const newProduct = await Image.create({path:obj.img, Cname,quantity, product_name,product_price,product_description,product_isLikeMe,
            address: addr[0]});
                        return res.status(201).send(newProduct);;
    }else{
        const { _id } = product._id;
        const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': quantity} }, {
            new: true
        });
        res.status(201).json(updateduser);
        console.log("item present")
    }
    
} catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
}

};

exports.getimageproduct = async (req, res) => {
    console.log(req.params);
     //const {_id} = req.params;
     console.log("all");
    try {
        var product = await Image.find()
        console.log(product[0]._id)
        res.json(product)
    } catch (error) {
        console.log("error")
        res.json(error)
    }
}
    
exports.oneimageproduct = async (req, res) => {
        console.log(req.params);
      
        try {
            const { _id } = req.params;
            console.log(_id);
            var product = await Image.findOne({_id:_id})
            console.log(product._id)
            res.json(product)
        } catch (error) {
            console.log("error")
            res.json(error)
        }
}

exports.Todoregister = (req, res, next) => {
    console.log("ee");
    //const{ Category, product_name, product_price, product_description, product_isLikeMe, product_image, secondary_image} = req.body;
    userService.Todoregister(req.body, (error, result) => {
        if (error) {
            return res.send(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.Todoget = async (req, res, next) => {
    console.log("all");
    try {
        var todo = await Todo.find()
        console.log(todo)
        res.json(todo)
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};

exports.getone = async (req, res, next) => {
    console.log(req.query.Category);
    try {
        let category = req.query.Category
        const product = await Category1.findOne({ name: { $eq: category } });
        const productid = product.id
        const product1 = await Image.find({ Category: { $eq: productid } });
        console.log(productid)
        console.log(product1)
        //res.json(product)
        return res.status(200).send({
            message: "Success",
            data: product1,
        });
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};

exports.createProductReview = async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findOne({ _id: _id });
    if (product) {
        if (product.reviews.find((x) => x.name === req.body.name)) {
            return res
                .status(400)
                .send({ message: 'You already submitted a review' });
        }
        const review = {
            name: req.body.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        product.reviews.push(review);

        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((a, c) => c.rating + a, 0) /
            product.reviews.length;
        let rate = Math.round((product.rating + Number.EPSILON) * 100) / 100


        console.log("rate" + rate)

        //product.ratings.push(rate);
        //product.ratings.push(product.rating);
        //product.push({rating:rate})
        console.log(product.reviews)
        //const updatedProduct1 = await product.save( {_id:_id}, { ratings:rate  })
        const updatedProduct = await product.save();

        let updatequery = await Product.findOneAndUpdate({ _id: _id }, { ratings: rate });

        console.log(updatequery)
        res.status(201).send({
            message: 'Review Created',
            review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            rating: product.rating,
        });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}

exports.ratingsort = async (req, res, next) => {
    console.log("all");
    try {
        var product = await Product.aggregate([{ '$sort': { ratings: -1 } }])
        console.log(product[1].ratings)
        res.json(product[0].ratings)
    } catch (error) {
        console.log("error")
        res.json(error)
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { _id } = req.params;

        const deletuser = await Image.findOneAndDelete({ _id: _id })
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { _id } = req.params;

        const updateduser = await Image.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        // console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}

exports.getonedata = async (req, res, next) => {

    try {
        const { _id } = req.params
        const individualuser = await Image.findOne({ _id: _id });

        res.status(200).json({ success: true, data: individualuser })
        console.log(individualuser)
    } catch (err) {

        res.status(400).json({ success: false })

    }

}

// exports.addCart = async (req, res,next) => {
//    try{
//     const owner=req.user.data
//     const quantity=req.body.quantity
//     const {_id} = req.params;
//     const cart=await Cart.findOne({owner})
//     const product = await Product.findOne({_id:_id});
//     if (product) {
//         console.log(owner)
//       console.log(_id+ " "+ quantity+ " "+product.product_price)
//      // res.status(404).send(product);
//       const product1 =[{
//         item:product._id,
//         qty:quantity,
//         price:product.product_price * quantity,
//         image:product.product_image
//     }]
//     console.log({product1})
//   cart.owner=req.user.data 
// //cart.items.push(product1);
//   await cart.save();
// Cart.collection.insertMany(product1, function (err, docs) {
//     if (err){ 
//         return console.error(err);
//     } else {
//       console.log("Multiple documents inserted to Collection");
//     }
//   });

//     console.log(product._id+" "+product1[0].qty+" "+product1[0].price)
//    // res.redirect("/cart");
//     } 
//    }catch(err){

//         res.status(404).send(err);
//       }

//   }

exports.cart = async (req, res, next) => {
    try {
        console.log(req.user.data)
        const owner = req.user.data
        const cart = await Cart.find();

        res.status(200).send(cart);

    } catch {
        console.log("error")
    }
}

exports.addCart = async (req, res, next) => {
    const owner = req.user.data
    const quantity = req.body.quantity
    const { _id } = req.params;
    const cart = await Cart.findOne({ owner })
    try {
        const cart = await Cart.findOne({ owner });
        const item = await Image.findOne({ _id: _id });
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        const price = item.product_price;
        const name = item.product_name;
        //If cart already exists for user,
        if (cart) {

            const itemIndex = cart.items.findIndex((item) => item._id == _id);
            //check if product exists or not
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += quantity;

                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)
                cart.items[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            } else {
                cart.items.push({ _id, name, quantity, price });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)
                await cart.save();
                res.status(200).send(cart);
            }
        } else {
            //no cart exists, create one
            const newCart = await Cart.create({
                owner,
                items: [{ _id, name, quantity, price }],
                bill: quantity * price,
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

exports.deleteCart = async (req, res, next) => {
    const owner = req.user.data;
    const { _id } = req.params;
    // const quantity=req.body.quantity
    try {
        let cart = await Cart.findOne({ owner });

        const itemIndex = cart.items.findIndex((item) => item._id == _id);

        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            // item.quantity -= quantity;
            cart.bill -= item.quantity * item.price;
            if (cart.bill < 0) {
                cart.bill = 0
            }
            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0)
            cart = await cart.save();

            res.status(200).send(cart);
        } else {
            res.status(404).send("item not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}

// exports.cartOne = async(req,res,next) => {
//     const owner=req.user.data
//     const quantity=req.body.quantity
//     const {_id} = req.params;
//     //const cart=await Cart.findOne({owner})
//     try {
//         console.log(owner)
//         const cart = await Cart.findOne({ owner });
//         console.log({cart})

//     } catch (error) {
//     console.log(error);
//     res.status(500).send("something went wrong");
//     }
// }

exports.cartOne = async (req, res, next) => {
    const owner = req.user.data
    const quantity = req.body.quantity
    const { _id } = req.params;
    //const cart=await Cart.findOne({owner})
    try {
        console.log("hello")
        const cart = await Cart.findOne({ owner });
        const item = await Image.findOne({ _id: _id });
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        const price = item.product_price;
        const name = item.product_name;
        //If cart already exists for user,
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item._id == _id);
            //check if product exists or not
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity = quantity;
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                cart.items[itemIndex] = product;
                await cart.save();
                console.log(cart)
                res.status(200).send(cart);
            } else {
                cart.items.push({ _id, name, quantity, price });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)
                await cart.save();
                res.status(200).send(cart);
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

exports.addOrder = async (req, res, next) => {
    const owner = req.user.data
const delivery_mode=req.body.delivery_mode
    const quantity = req.body.quantity
    const _id = req.body._id;
    const user = await User.findOne({ _id:owner })
    console.log(owner)

    
    console.log(user)
    try {
        console.log(user)
        const order = await Order.findOne({ owner });
        const item = await Image.findOne({ _id: _id });
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        const ownerName = user.username;
        const price = item.product_price;
        const name = item.product_name;
        //If cart already exists for user,
        const addr = [{
            phoneNumber: user.phoneNumber,
            houseNo: user.houseNo,
            streetName: user.streetName,
            city: user.city,
            landMark: user.landMark,
            pincode: user.pincode
        }]

        if (order) {
            order.ownerName = ownerName;
            order.address[0] = addr[0];
            console.log(addr[0].phoneNumber)
            const itemIndex = order.items.findIndex((item) => item._id == _id);
            //check if product exists or not
            if (itemIndex > -1) {

                let product = order.items[itemIndex];
                product.quantity += quantity;
                order.bill = order.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)
console.log(user.username)
                order.items[itemIndex] = product;
                await order.save();
              
                const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': -quantity} }, {
                    new: true
                });
                res.status(200).send(order);
            } else {

                order.ownerName = ownerName,
                order.delivery_mode = delivery_mode,
                order.items.push({ _id, name, quantity, price });
                order.bill = order.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)
                await order.save();
                const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': -quantity} }, {
                    new: true
                });
                res.status(200).send(order);
            }
        } else {
            //no cart exists, create one
            const newOrder = await Order.create({
                owner, ownerName,delivery_mode,
                items: [{ _id, name, quantity, price }],
                bill: quantity * price,
                address: addr[0]
            });
            const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': -quantity} }, {
                new: true
            });
            return res.status(201).send(newOrder);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

exports.getOrder = async (req, res) => {
    try {
        var owner = req.user.data
        console.log(owner)
        const order = await Order.find();
        const orderIndex = order.findIndex((order) => order.owner == owner);
        const length = order[orderIndex].items.length
        res.status(500).send(length);
        console.log(length)
    } catch {
        res.status(404).send("err")
    }
}

exports.getallOrder = async (req, res) => {
    try {
        var owner = req.user.data
        console.log(owner)
        const order = await Order.find();
        // //const itemIndex = order.owner.findIndex((order1) => order1.owner ==  owner);
        // console.log(order1[1].owner)
        // var order=await Order.find({owner})
        res.status(200).send(order)
        console.log(order.length)
    } catch {
        res.status(404).send("err")
    }
}

exports.getuserorder = async (req, res) => {
    try {
        const owner = req.params
        const individualuser = await Order.findOne({ owner });

        if(individualuser){
            res.status(200).json({ success: true, data: individualuser })
        console.log(owner)
        }
        else{
            res.status(400).json({ success: true, data: "no Order" })
            console.log("no Order")
        }
        
    } catch {
        console.log("err")
    }
}

exports.getIdorder = async (req, res) => {
    try {
        const owner = req.params
        const individualuser = await Order.findOne({ _id:owner });

        if(individualuser){
            res.status(200).json({ success: true, data: individualuser })
        console.log(owner)
        }
        else{
            res.status(400).json({ success: true, data: "no Order" })
            console.log("no Order")
        }
        
    } catch {
        console.log("err")
    }
}

exports.getorders = async (req, res, next) => {

    try {

        const order = await Order.find();

        res.status(200).json({ success: true, data: order, length: order.length })

    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.addorder1 = async (req, res, next) => {
    let ownerName = req.body.ownerName;
    const phoneNumber=req.body.phoneNumber;
    const houseNo = req.body.houseNo;
    const streetName = req.body.streetName;
    const landMark = req.body.landMark;
    const city = req.body.city;
    const delivery_mode=req.body.delivery_mode;
    const pincode = req.body.pincode;
    const owner1=req.body.owner1;
    const quantity = req.body.quantity
    const { _id } = req.params;
    console.log(req.body);
 
   
    try {
        
        const order = await Order.findOne( {owner1});
        const item = await Image.findOne({ _id: _id });
        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        console.log("order" + order)
        //const ownerName= ownerName;
        const price = item.product_price;
        const name = item.product_name;
        //If cart already exists for user,
        const addr = [{
            phoneNumber: phoneNumber,
            houseNo: houseNo,
            streetName: streetName,
            city: city,
            landMark: landMark,
            pincode: pincode
        }]

        if (order) {
            order.ownerName = ownerName;
            order.delivery_mode = delivery_mode,
            order.address[0] = addr[0];
            console.log(addr[0].phoneNumber)
            const itemIndex = order.items.findIndex((item) => item._id == _id);
            //check if product exists or not
            if (itemIndex > -1) {

                let product = order.items[itemIndex];
                product.quantity += quantity;
                order.bill = order.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                order.items[itemIndex] = product;
                await order.save();
                const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': -quantity} }, {
                    new: true
                });
                res.status(200).send(order);
            } else {

                order.ownerName = ownerName
                order.items.push({ _id, name, quantity, price });
                order.bill = order.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)
                await order.save();
                const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': -quantity} }, {
                    new: true
                });
                res.status(200).send(order);
            }
        } else {
            //no cart exists, create one
            const newOrder = await Order.create({
                owner1, ownerName,delivery_mode,
                items: [{ _id, name, quantity, price }],
                bill: quantity * price,
                address: addr[0]
            });
            const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': -quantity} }, {
                new: true
            });
            return res.status(201).send(newOrder);
        }
    }
    catch (error) {
        console.log(error)
        console.log(req.body);
        res.status(500).send("something went wrong");
    }
}

exports.cancelbyuser = async (req, res, next) => {
    const owner = req.user.data;
    const { _id } = req.params;
    const quantity=req.body.quantity
    try {
        const order = await Order.findOne({ owner });
        const itemIndex = order.items.findIndex((item) => item._id == _id);

        if (itemIndex > -1) {
            let product = order.items[itemIndex];
            product.quantity -= quantity;
            order.bill = order.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0)
            order.items[itemIndex].quantity = product.quantity ;
            await order.save();
            const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': quantity} }, {
                new: true
            });
            res.status(200).json( order.items[itemIndex].quantity);
        } else {
            res.status(404).send("item not found");
        }
        console.log(order.items[itemIndex].name)
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}

exports.cancelbyadmin = async (req, res, next) => {
    const owner = req.user.data;
    const { _id } = req.params;
    // const quantity=req.body.quantity
    try {
        let order = await Order.findOne({ owner });

        const itemIndex = order.items.findIndex((item) => item._id == _id);

        if (itemIndex > -1) {
            let item = order.items[itemIndex];
            // item.quantity -= quantity;
            order.bill -= item.quantity * item.price;
            if (order.bill < 0) {
                order.bill = 0
            }
            order.items.splice(itemIndex, 1);
            order.bill = order.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0)
            order = await order.save();
            const updateduser = await Image.findByIdAndUpdate(_id, { $inc: {'quantity': quantity} }, {
                new: true
            });
            res.status(200).send(order);
        } else {
            res.status(404).send("item not found");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}




// try{
//     var owner=req.params._id
//     console.log(owner)
//     const order = await Order.find();
//     const orderIndex = order.findIndex((order) => order.owner ==  owner);
//     const length=order[orderIndex].items.length
//     res.status(500).send({length:length,data:order[orderIndex].items});
//     console.log(length)
//         }catch{
//             res.status(404).send("err")
//         }
//     }