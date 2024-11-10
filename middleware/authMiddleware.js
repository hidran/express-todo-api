const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { errorResponse } = require('../utils/responseHelper');
dotenv.config();
const authMiddleware = (req,res,next) =>{
  const token = req.header('Authorization')?.replace('Bearer ','');
  if(!token){
    return errorResponse(res, 'Unauthorized', 401);
  }

  try {
     const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = tokenDecoded;
      next();
  } catch (error) {
      return errorResponse(res, 'Invalid token ,' + process.env.JWT_TTL, 401,error);

  }
};

module.exports = authMiddleware;
