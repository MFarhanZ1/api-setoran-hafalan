import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request type to include 'role'
interface CustomRequest extends Request {
	email?: string;
}

class AuthMiddleware {
	public static tokenValidation = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { authorization } = req.headers;
		const token = authorization && authorization.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				response: false,
				message: "Token is required",
			});
		}

		const decoded = jwt.decode(token);

		// Type assertion to make sure 'decoded' is treated as JwtPayload
		const jwtPayload = decoded as JwtPayload;

		// // Extract email from the decoded token
		const email = jwtPayload.email;

		(req as CustomRequest).email = email;
		next();
	};
}

export default AuthMiddleware;
