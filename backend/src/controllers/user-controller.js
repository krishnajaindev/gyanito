import { register as registerUser , login as loginUser} from "../services/user-service.js";
export const login = async (req, res)=>{
    const userObject = req.body;
    
    // Basic validation
    if (!userObject.email || !userObject.password) {
        return res.status(400).json({
            message: 'Email and password are required',
            status: false
        });
    }
    
    try {
        const result = await loginUser(userObject);
        
        // If login was unsuccessful (service returns status: false)
        if (result && result.status === false) {
            return res.status(401).json(result);
        }
        
        // Successful login
        res.status(200).json(result);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            message: 'Authentication failed. Please try again later.',
            status: false
        });
    }
}
export const register = async (req, res)=>{
    const userObject = req.body;
    
    // Basic validation
    if (!userObject.name || !userObject.email || !userObject.password) {
        return res.status(400).json({
            message: 'Name, email, and password are required',
            status: false
        });
    }
    
    try {
        const result = await registerUser(userObject);
        
        // If registration was unsuccessful (service returns status: false)
        if (result && result.status === false) {
            return res.status(400).json(result);
        }
        
        // Successful registration
        res.status(201).json(result);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({
            message: 'Registration failed. Please try again later.',
            status: false
        });
    }
}
export const profile = (req, res)=>{
    res.json({message:'Profile '});
}