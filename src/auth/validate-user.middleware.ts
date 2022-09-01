import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {

	public constructor(private jwtService: JwtService) { }

	public use(req: Request, res: Response, next: NextFunction): Response {
		const { authorization } = req.headers;
		if (!authorization) {
			return res
				.status(403)
				.send({ error: "No token provided" });
		}
		const token: string = authorization.slice(7);
		const userInfo = this.jwtService.decode(token);
		req.body.user = userInfo;
		next();
	}
}