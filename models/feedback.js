const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({

    star1: {
        type: Number,
        default: 0
    },
    star2: {
        type: Number,
        default: 0
    },
    star3: {
        type: Number,
        default: 0
    },
    star4: {
        type: Number,
        default: 0
    },
    star5: {
        type: Number,
        default: 0
    },

    comment: {
        type: String,
        default: " "
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;