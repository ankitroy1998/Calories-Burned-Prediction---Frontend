import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    full_name: {type: String, required: true},
    dob: {type: String, required: true},
    contact_no: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {collection: "Users"})

const User = models.User || model('User', UserSchema);

export default User;