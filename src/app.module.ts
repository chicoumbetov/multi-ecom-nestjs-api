import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { CategoryModule } from './category/category.module'
import { ColorModule } from './color/color.module'
import { AppConfigModule } from './config/config.module'
import { FileModule } from './file/file.module'
import { ReviewModule } from './review/review.module'
import { StoreModule } from './store/store.module'
import { UserModule } from './user/user.module'

import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'

@Module({
	imports: [
		AppConfigModule,
		AuthModule,
		UserModule,
		StoreModule,
		ColorModule,
		ReviewModule,
		CategoryModule,
		FileModule,
		ProductModule,
		OrderModule
	],
	providers: [JwtStrategy]
})
export class AppModule {}
