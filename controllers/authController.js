const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const bcrypt = require('bcryptjs');

dotenv.config();

const register = async (req,res) => {
    try{
    const { name, email, password } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return errorResponse(res, 'Email is already registered', 409);
        }
    const userId = await User.create(name, email, password);
    const secret = process.env.JWT_SECRET || 'dsfsdfdsfsfdsf4332432432432432432';
        const ttl = Number(process.env.JWT_TTL);
    const token = jwt.sign({ id: userId, email },
         secret,
        { expiresIn:ttl}
        );
        const expiryDate = new Date( Date.now() + ttl*1000);
        successResponse(res, { token, expiresAt: expiryDate});
    }catch(error){
        errorResponse(res,"Error registering user", 500, error);
    }
};

const login = async (req, res) =>{
    const { email, password } = req.body;
    try {
    const user = await User.findByEmail(email);
    if (!user) {
        return errorResponse(res, 'Invalid email or password', 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return errorResponse(res, 'Invalid email or password', 401);
    }

    const secret = process.env.JWT_SECRET || 'dsfsdfdsfsfdsf4332432432432432432';
    const ttl = Number(process.env.JWT_TTL);
    const token = jwt.sign({ id: user.id,email: user.email },
        secret,
        { expiresIn: ttl }
    );
    const expiryDate = new Date(Date.now() + ttl * 1000);
   return successResponse(res, { token, expiresAt: expiryDate});
    } catch (error) {
        console.error('Error logging in user:', error);
       return errorResponse(res, 'Error logging in user', 500, error);
    }
}

module.exports = {
    register,
    login,
};