import mongoose from 'mongoose';

const USR_ROLES = ['User', 'Admin', 'Superuser'];

const UserSchema = new mongoose.Schema(
    {
        username:      { type: String, required: true, unique: true },
        name:          { type: String, trim: true },
        email:         { type: String, required: true, trim: true },
        password:      { type: String, required: true, trim: true },
        role:          { type: USR_ROLES, default: 'User' },
    },
    { timestamps: true, strict: true }
);

export const User = mongoose.model('User', UserSchema);
//This instruction is going to create a file that is called users, and all 
// the elements inside that file is going to have that schema (the UserSchema)