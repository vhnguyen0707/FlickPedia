import mongoose, { Schema } from "mongoose";
import modelOptions from "./modelOptions.js";
import bcrypt from 'bcrypt';

const saltRounds = 10;
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, trim: true},
    displayName: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true, select: false}

}, modelOptions);

UserSchema.methods.setPassword = function(password) {
    // generate unique salt for this user
    const salt = bcrypt.genSaltSync(saltRounds);

    this.salt = salt;
    this.password =  bcrypt.hashSync(password, salt);
}

UserSchema.methods.validPassword = async function(password) {
    const isPasswordValid = await bcrypt.compare(password, this.password) //Promise
    return isPasswordValid
}

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;