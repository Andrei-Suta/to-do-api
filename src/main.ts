import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap(): Promise<any> {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ origin: "*" });
	await app.listen(3000);
}
bootstrap();
