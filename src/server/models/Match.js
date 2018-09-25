const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const matchSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    date: { type: Date, default: Date.now },
    confirmed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Match', matchSchema);
