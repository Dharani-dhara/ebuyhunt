const bcryptjs = require('bcryptjs');
const userService = require('./users.services');
const path = require('path');
const fs = require("fs");
const express = require('express');
const Rider = require('./rider.model')
const Ride = require('./ride.model')
//const jwt_decode = require('jwt-decode');
const User = require('./user.model');


exports.userRegister = async (req, res, next) => {

    const username = req.body.username
    const email = req.body.email
    const password1 = req.body.password;
    const salt = bcryptjs.genSaltSync(10);

    const password = bcryptjs.hashSync(password1, salt);
    const bikeName = req.body.bikeName
    const bikeNumber = req.body.bikeNumber
    const phoneNumber = req.body.phoneNumber
    const houseNo = req.body.houseNo
    const streetName = req.body.streetName
    const city = req.body.city
    const landMark = req.body.landMark
    const pincode = req.body.pincode

    try {

        console.log("try function")
       
      
        
        var obj = {

        
            img:req.file.filename
                
        }
      
        const rider = await Rider.create({ username, email, password, bikeName, bikeNumber, phoneNumber, houseNo, streetName, city, landMark, pincode });
        req.files.forEach((e) => {
            let img=e.filename
            rider.path.push(img)
        
             });
             rider.save()
        
        return res.status(201).send(rider);


    } catch (error) {
        console.log(error);
        console.log("rider")
        res.status(500).send("something went wrong");
    }

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

exports.getallRider = async (req, res, next) => {

    try {

        const rider = await Rider.find();

        res.status(200).json({ success: true, data: rider })

    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.getoneRider = async (req, res, next) => {

    try {
        const { _id } = req.params
        const individualuser = await Rider.findOne({ _id: _id });

        res.status(200).json({ success: true, data: individualuser })
        console.log(individualuser)
    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.createride = async (req, res, next) => {
    const _id = req.user.data
    let { startlang, startlat, endlang, endlat,ridename } = req.body;
    //   const id=req.body.id
    let ridecreater = await Rider.findOne({ _id: _id })

    try {

        console.log(ridecreater.username)

        let createRiderData = {
            creator: _id,
            ridename:ridename,
            creatorname: ridecreater.username,
            start: {
                lang: startlang,
                lat: startlat
            },
            end: {
                lang: endlang,
                lat: endlat
            }
        }


        const ride = await Ride.create(createRiderData);
        return res.status(201).send(ride);


    } catch (error) {
        console.log(error);
        console.log("rider")
        res.status(500).send("something went wrong");
    }

};

exports.getallRide = async (req, res, next) => {

    try {

        const ride = await Ride.find();

        res.status(200).json({ success: true, data: ride})
       

    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.getoneRide = async (req, res, next) => {

    try {
        const { _id } = req.params
        const individualride = await Ride.findOne({ _id: _id });

        res.status(200).json({ success: true, data: individualride })
       // console.log(individualride)
        console.log(individualride.requestor)
    } catch (err) {

        res.status(400).json({ success: false })

    }

}

exports.addrider = async (req, res, next) => {
    const _id = req.user.data //Rider id
    
    const id = req.body.id 
    let rider = await Rider.findOne({ _id: _id })

    try {

        const ride = await Ride.findOne({ _id: id })
        // console.log("RIDE" + " " + ride.id)
        // console.log("Rider" + " " + rider)
        if (!ride) {
            res.status(500).send("Ride not found");
            return;
        }else if(ride.rideStatus === 'end'){
            res.status(500).send("Ride already End");
            return;
        }
        else
        {
            console.log(ride.rideStatus)
            const riderIndex = ride.requestor.findIndex((rider) => rider._id == _id);
            console.log(riderIndex)
            if (riderIndex < 0 ) {
    
            let riders = {
                _id: rider._id,
                ridername: rider.username,
                ridernumber: rider.phoneNumber
            }
            console.log(ride.creatorname)
            const updateRide = await Ride.findByIdAndUpdate(id, { $push: { 'requestor': riders } }, {
                new: true
            });
            return res.status(201).send(updateRide);
        }
        console.log("riderIndex")
        return res.status(201).send("Rider Already Register");
        }

    } catch (error) {
        console.log(error);
        console.log("rider")
        res.status(500).send("something went wrong");
    }

};

exports.checkrider = async (req, res, next) => {
    const _id = req.body._id //rider id
   const status = req.body.status
    const id = req.body.id
    let rider = await Rider.findOne({ _id: _id })

    try {

        const ride = await Ride.findOne({ _id: id })
        // console.log("RIDE" + " " + ride.id)
        // console.log("Rider" + " " + rider)
        if (!ride) {
            res.status(500).send("Ride not found");
            return;
        }

        const riderIndex = ride.requestor.findIndex((rider) => rider._id == _id);
        //check rider's position
        if (riderIndex > 0) {
            ride.requestor[riderIndex].Status=status
           ride.save()

            res.status(201).send(ride)
           
        }
        else{
            res.status(500).send("Rider not found");
            return;
        }
        

    } catch (error) {
        console.log(error);
        console.log("rider")
        res.status(500).send("something went wrong");
    }

};

// exports.adminLogin = (req, res, next) => {
//     const { email, phoneNumber, password } = req.body;
//     userService.adminLogin({ email, phoneNumber, password }, (error, result) => {
//         if (error) {
//             return next(error);
//         }
//         return res.status(200).send({
//             message: "Success",
//             data: result,
//         });
//     });
// };







// exports.shopgetdata = async (req, res, next) => {

//     try {

//         const users = await User.find({ "userType": "shopAdmin" });

//         res.status(200).json({ success: true, data: users })

//     } catch (err) {

//         res.status(400).json({ success: false })

//     }

// }

// exports.deleteUser = async (req, res) => {
//     try {
//         const { _id } = req.params;

//         const deletuser = await User.findOneAndDelete({ _id: _id })
//         console.log(deletuser);
//         res.status(201).json(deletuser);

//     } catch (error) {
//         res.status(422).json(error);
//     }
// }

// exports.updateUser = async (req, res) => {
//     try {
//         const { _id } = req.params;

//         const updateduser = await User.findByIdAndUpdate(_id, req.body, {
//             new: true
//         });

//         console.log(updateduser);
//         res.status(201).json(updateduser);

//     } catch (error) {
//         res.status(422).json(error);
//     }
// }









