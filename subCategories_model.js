const mongoose = require('mongoose');
const { Schema } = mongoose;

const subCategoriesSchema = new Schema({
    
    category_name: {
        type: String,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorys',
        required: true,
    }
});

const subCategory = mongoose.model("subCategorys", subCategoriesSchema);

module.exports = subCategory;