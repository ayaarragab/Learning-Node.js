import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    fullName:{ type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['employed', 'unemployed', 'student'], required: true },
    professional_title: { type: String, required: false },
    companyName: { type: String, required: false }
})

const User = mongoose.model('User', UserSchema);

export default User;
