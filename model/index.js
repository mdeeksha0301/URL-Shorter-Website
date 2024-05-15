const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortid: {
        type: String,
        require: true,
        unique: true
    },
    redirectURL: {
        type: String,
        require: true
    },
    numOfVisits: [{timestamp: {type: Number}}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, {timestamps: true});

const UrlId = mongoose.model('urlids', urlSchema);

module.exports = UrlId;