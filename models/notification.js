const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    notification: {
        type: String,
        required: true},

    Journey_id: {
        type: String, 
        required: true},

    userId: {
        type: String, 
        required: true},

    date: {
        type: Date, 
        default: Date.now()}

});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
//module.exports = mongoose.model('Notification', NotificationSchema);