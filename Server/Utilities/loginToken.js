const jwt=require("jsonwebtoken")
const createToken = (id, role = 'user') => {
    try {
        // Generate a JWT token using the secret key from the environment variables
        const token = jwt.sign(
            { id, role },  // Payload (data inside the token)
            process.env.JWT_SECRET_KEY,  // Secret key for signing the token
            { expiresIn: "10d" }  // Token expiration time (10 day)
        );

        console.log("Generated Token:", token); 
        return token; 
    } catch (error) {
        console.error("JWT Error:", error); // Log any errors if token generation fails
        return null; // Return null in case of an error
    }
};

module.exports = createToken; 