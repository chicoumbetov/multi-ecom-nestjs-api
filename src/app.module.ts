import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { AppConfigModule } from './config/config.module'
import { UserModule } from './user/user.module'
import { StoreModule } from './store/store.module';

@Module({
	imports: [AppConfigModule, AuthModule, UserModule, StoreModule],
	providers: [JwtStrategy]
})
export class AppModule {}
