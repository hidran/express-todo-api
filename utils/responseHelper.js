const successResponse = (res, data = [], message = "Request completed successfully") =>{
  return res.status(200).json({
          success: true,
          data,
          message,
      }
  );
}

const errorResponse = (res,  message = "An error occurred", status = 500,error = {}) => {
    return res.status(status).json({
        success: false,
        message,
        error
    }
    );
}
module.exports = {successResponse, errorResponse};