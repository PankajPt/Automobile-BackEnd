import ApiError from "./apiError.js";
import { logger } from "./logger.js";

const asyncHandler = (reqHandler) => {
  return async (req, res, next) => {
    try {
      await reqHandler(req, res, next);
    } catch (error) {
      let statusCode = error.statusCode || 500;
      let message = error.message || "Internal Server Error";

      if (error.code === 11000) {
        statusCode = 409;
        message = "Duplicate entry. The record already exists.";
      }

      else if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed. Please check your input.";
      }

      else if (error.name === "UnauthorizedError") {
        statusCode = 401;
        message = "Unauthorized access. Please login.";
      }

      else if (error.name === "ForbiddenError") {
        statusCode = 403;
        message = "You do not have permission to access this resource.";
      }

      else if (error.code && error.code >= 100 && error.code <= 599) {
        statusCode = error.code;
      }

      logger.error(`ASYNC_H [Status: ${statusCode}] ${error.name || "Error"}: ${message}`);
      return res.status(statusCode).json(new ApiError(statusCode, message));
    }
  };
};

export default asyncHandler;
