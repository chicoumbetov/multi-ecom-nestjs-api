import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { AppConfigModule } from './config/config.module'
import { UserModule } from './user/user.module'
import { StoreModule } from './store/store.module';
import { ColorModule } from './color/color.module';
import { ReviewModule } from './review/review.module';

@Module({
	imports: [AppConfigModule, AuthModule, UserModule, StoreModule, ColorModule, ReviewModule],
	providers: [JwtStrategy]
})
export class AppModule {}
