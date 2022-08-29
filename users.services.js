const User = require('./user.model');
const Todo = require('./todo');
const bcrypt = require('bcryptjs');
const auth = require('./auth');
const Product = require('./product_model');

async function userLogin({ email, password }, callback) {
    const user = await User.findOne({
        $or: [{
          "email": email
        }, {
          "phoneNumber": email
        },]
      });

   // const user1 = await User.findOne({ phoneNumber });
    // console.log(user1.password)
    //console.log(phoneNumber)
    if (user != null ) {
        // if (user) {
        //     if (bcrypt.compareSync(password, user.password)) {
        //         const token = auth.generateAccessToken(user._id);
        //         console.log("user")
        //         return callback(null, { ...user.toJSON(), token });
        //     }
        //     else {
        //         return callback({
        //             message: "Invalid username/password",
        //         });
        //     }
        // }
        // else if (user1) {
        //     if (bcrypt.compareSync(password, user1.password)) {
        //         const token = auth.generateAccessToken(user1._id);
        //         console.log("user1")
        //         return callback(null, { ...user1.toJSON(), token });
        //     }
        //     else {
        //         return callback({
        //             message: "Invalid username/password",
        //         });
        //     }
        // }
        //  else {
        //     return callback({
        //         message: "Invalid username/password",
        //     });
        // }
        if (bcrypt.compareSync(password, user.password)) {
                    const token = auth.generateAccessToken(user._id);
                    console.log("user")
                    return callback(null, { ...user.toJSON(), token });
                }
                else {
                    return callback({
                        message: "Invalid password",
                    });
                }

    }
    else {
        return callback({
            message: "Invalid username",
        });
    }

}

async function adminLogin({ email, phoneNumber, password }, callback) {
    const user = await User.findOne({ email });

    const user1 = await User.findOne({ phoneNumber });
    // console.log(user1.password)
    console.log(phoneNumber)
    if (user != null || user1 != null) {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = auth.generateAccessToken(user._id);
                console.log("user")
                return callback(null, { ...user.toJSON(), token });
            }
            else {
                return callback({
                    message: "Invalid username/password",
                });
            }
        }
        else if (user1) {
            if (bcrypt.compareSync(password, user1.password)) {
                const token = auth.generateAccessToken(user1._id);
                console.log("user1")
                return callback(null, { ...user1.toJSON(), token });
            }
            else {
                return callback({
                    message: "Invalid username/password",
                });
            }
        } else {
            return callback({
                message: "Invalid username/password",
            });
        }

    }
    else {
        return callback({
            message: "Invalid username/Password",
        });
    }

}

async function userRegister(params, callback) {

    if (params.username === undefined) {
        return callback({ message: "Username Required" });
    }

    params["userType"] = 'user';
    console.log(params)
    const user = new User(params);
    await user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}

async function shopRegister(params, callback) {
    if (params.username === undefined) {

        return callback({ message: "Username Required" });
    }
    params["userType"] = 'shop';

    const user = new User(params);
    user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}

async function shopAdminLogin({ email, password }, callback) {
    const user = await User.findOne({ email });

    if (user != null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(email);
            return callback(null, { ...user.toJSON(), token });
        }
        else {
            return callback({
                message: "Invalid username/password",
            });
        }
    }
    else {
        return callback({
            message: "Invalid username/Password",
        });
    }

}

async function ownerLogin({ email, password }, callback) {
    const user = await User.findOne({ email });

    if (user != null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(email);
            return callback(null, { ...user.toJSON(), token });
        }
        else {
            return callback({
                message: "Invalid username/password",
            });
        }
    }
    else {
        return callback({
            message: "Invalid username/Password",
        });
    }

}

async function shopAdminRegister(params, callback) {

    if (params.username === undefined) {
        return callback({ message: "Username Required" });
    }

    params["userType"] = 'shopAdmin';
    console.log(params)
    const user = new User(params);
    await user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}

async function Productregister(params, callback) {

    // const proid = await Category.findOne({}});

    console.log(params)
    const user = new Product(params);
    await user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}

async function Todoregister(params, callback) {

    // const proid = await Category.findOne({}});


    console.log(params)
    const user = new Todo(params);
    await user.save()

        .then((response) => {
            return callback(null, response);

        }).catch((error) => {
            return callback(error);
        });
}








module.exports = {
    userLogin,
    adminLogin,
    shopAdminLogin,
    ownerLogin,
    userRegister,
    shopRegister,
    shopAdminRegister,
    Productregister,
    Todoregister,
};