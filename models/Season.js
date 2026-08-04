import mongoose from "mongoose";

const SeasonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models.Season || mongoose.model("Season", SeasonSchema);