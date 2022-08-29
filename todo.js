const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const todoSchema = new Schema({
    todolist:{
        type: String,
        required: true,
    },
})


const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;