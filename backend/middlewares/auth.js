const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");



module.exports.auth = async (req , res , next) => {
    try {
         const token = req.body.token || req.header("Authorization").replace("Bearer ", "");
         console.log(token , "token");
         if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}
		try {
	
			const decode = await jwt.verify(token, JWT_SECRET);
			console.log(decode , "decode");
			req.user = decode;
		} catch (error) {
	
			return res
				.status(401)
				.json({ success: false, message: "Token is invalid" });
		}

		next();
         
    } catch(error) {
        console.log(error , "ero");
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}