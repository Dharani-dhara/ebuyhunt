const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader 

    if(token == null) return res.status(401);

  jwt.verify(token, "Snippet_SceretKey", (err, user) => {
       if(err) return res.status(403);
       req.user = user;
       next();
    });
   
}

function generateAccessToken(user_id){
    return jwt.sign({data: user_id}, "Snippet_SceretKey", {
        expiresIn: "5h",
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken,
};