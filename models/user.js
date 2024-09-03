import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";
import {EMAIL_REGEX} from "../utils/constants.js";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        match: [EMAIL_REGEX, 'Email is invalid']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [6, 'Name must have at least six characters'],
        maxlength: [30, 'Name must have at most 30 characters']
    },
    password: String,
    uploadedVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    likedVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
}, {timestamps: true});

// Pre-save middleware to hash the password if it has been modified
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // password does not change because password does not change
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

export default model('User', userSchema);
