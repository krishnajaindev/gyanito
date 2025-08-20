import  UserModel  from "../models/user-model.js";
import { compareHash, encryptPassword } from "../utils/password-hash.js";
import { generateToken } from "../utils/token.js";

export const register = async (userObject)=>{
    try{
        // Check if user already exists with the same email
        const existingUser = await UserModel.findOne({ email: userObject.email }).exec();
        if (existingUser) {
            return { message: "User with this email already exists", status: false };
        }

        // Validate password strength
        if (userObject.password.length < 6) {
            return { message: "Password must be at least 6 characters long", status: false };
        }

        // Encrypt password and create user
        userObject.password = encryptPassword(userObject.password);
        const doc = await UserModel.create(userObject);
        
        if(doc && doc._id){
            return { message: "User Registered Successfully", status: true };
        } else {
            return { message: "Registration failed", status: false };
        }
    }
    catch(err){
        console.error("Registration error:", err);
        throw new Error(err.message || "Error during registration");
    }
}
export const login = async (userObject)=>{
   try{
        // Validate input
        if (!userObject.email || !userObject.password) {
            return { message: "Email and password are required", status: false };
        }

        // Find user by email
        const doc = await UserModel.findOne({email: userObject.email}).exec();
        
        // Check if user exists
        if(!doc) {
            return { message: "Invalid Email or Password", status: false };
        }

        // Verify password
        if(compareHash(userObject.password, doc.password)){
            // Generate JWT token
            const token = generateToken(doc.email, doc.role);
            
            return {
                message: "Welcome " + doc.name,
                role: doc.role,
                token: token,
                userId: doc._id,
                status: true
            };
        } else {
            return { message: "Invalid Email or Password", status: false };
        }
    }
    catch(err){
        console.error("Login error:", err);
        throw new Error("Authentication failed. Please try again.");
    }
}