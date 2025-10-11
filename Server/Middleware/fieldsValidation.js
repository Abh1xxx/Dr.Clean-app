const fieldsValidation = (fields = []) => {
    return (req, res, next) => {
        console.log("🔍 Validating input data...");

        for (const field of fields) {
            if (!req.body[field]) {
                console.log(`❌ Validation failed: ${field} is required.`);
                return res.status(400).json({ error: `${field} is required` });
            }
        }

        console.log("✅ Validation successful. Proceeding to next Controller...");
        next();
    };
};

module.exports = { fieldsValidation };
