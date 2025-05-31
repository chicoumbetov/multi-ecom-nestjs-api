import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { AppConfigModule } from './config/config.module'
import { UserModule } from './user/user.module'
import { StoreModule } from './store/store.module';
import { ColorModule } from './color/color.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';

@Module({
	imports: [AppConfigModule, AuthModule, UserModule, StoreModule, ColorModule, ReviewModule, CategoryModule, FileModule],
	providers: [JwtStrategy]
})
export class AppModule {}
