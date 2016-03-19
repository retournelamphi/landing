import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export default mongoose.model('subscription', schema);