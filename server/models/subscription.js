import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    ip: {
        type: String,
        required: true
    },
    subAt: {
        type: Date,
        required: true
    }
});

export default mongoose.model('subscription', schema);