import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as cookieParser from 'cookie-parser'
import corsOptions from './config/corsOptions'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())

	app.enableCors(corsOptions)

	await app.listen(process.env.PORT ?? 5001)
}
bootstrap()
