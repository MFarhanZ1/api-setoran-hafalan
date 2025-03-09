import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestPayloadProps } from "../types/common.interface";

class AuthMiddleware {
	public static tokenExtraction = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { authorization } = req.headers;
		const token = authorization && authorization.split(" ").length > 1 && authorization.split(" ")[1];
		if (!token) {
			return res.status(401).json({
				response: false,
				message: "Token is required",
			});
		}
		const jwtPayload = jwt.decode(token) as JwtPayload;
		try {
			(req as RequestPayloadProps).email = jwtPayload.email;
		} catch (errror) {
			return res.status(401).json({
				response: false,
				message: "Invalid token",
			});
		}
		next();
	};
}

export default AuthMiddleware;
