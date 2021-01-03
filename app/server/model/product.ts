import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    id: mongoose.Types.ObjectId,
});

const productModel = mongoose.model('Product', ProductSchema);
export default productModel;
