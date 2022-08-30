import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class JwtGuard implements CanActivate {

	public canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		if (request) {
			return true;
		}
		return false;
	}
}