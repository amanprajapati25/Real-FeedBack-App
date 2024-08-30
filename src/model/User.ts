import mongoose, {Schema, Document} from "mongoose";
//Document for type safety not needed in Js

// We're extending it bcoz we know this interface is a part of mongoose document and eventually it will go into database


export interface Message extends Document{
    content: string;
    createdAt: Date
}

// Let's create schema

// const MessageSchema = new Schema({})
// This syntax will work fine but we want type safety that's why we use this

const messageSchema: Schema<Message> = new Schema({
    content : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})


// Similarly create a User schema

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpires: string,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    message: Message[],
    createdAt: Date

}
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true,"Username is required"],
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: [true,"Email is required"],
        unique: true,
        match: [EMAIL_REGEX,"Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true,'Password is Required']
    },
    verifyCode: {
        type: String,
        required: [true,'Verify Code Expiry is Required']
    },
    verifyCodeExpires: {
        type: String,
        required: true
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    message: [messageSchema],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

// Next doesn't know whether our application is running first time or now.
// So we export in such a way that if schema already exist in DB refer it else use our
// Chat Gpt---> If mongoose.models.User exists, userModel will be assigned that model.
// If it doesn't exist, userModel will be assigned a newly created model using the userSchema.

const userModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User',userSchema))
export default userModel

