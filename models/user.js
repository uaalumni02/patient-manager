import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

export default mongoose.model('User', UserSchema);