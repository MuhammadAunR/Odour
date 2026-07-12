import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null, unique: true },
    role: { type: String, default: 'user' },
    provider: { type: String, enum: ['credentials', 'google'], default: 'credentials' }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", UserSchema)