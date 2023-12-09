const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        required: false,
    },

    startDate: {
        type: Date,
        required: true,
    },
    
    endDate: {
        type: Date,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    approval : {
        type: Boolean,
        required: false,
        default: false
    },
    capacity : {
        type: Number,
        required: false,
        default: 100
    },
    visibility : {
        type: Boolean,
        required: false,
        default: false
    }
});

const Events = mongoose.model('events', eventSchema);
module.exports = Events;