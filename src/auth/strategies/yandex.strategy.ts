import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-yandex'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(private configService: ConfigService) {
		const clientID = configService.get('YANDEX_CLIENT_ID')
		const clientSecret = configService.get('YANDEX_CLIENT_SECRET')
		super({
			clientID: clientID,
			clientSecret: clientSecret,
			callbackURL:
				configService.get('SERVER_URL') + '/auth/yandex/callback'
		})
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: any
	): Promise<any> {
		const { username, emails, photos } = profile

		const user = {
			email: emails?.[0].value ?? null,
			name: username,
			picture: photos?.[0].value ?? null
		}

		done(null, user)
	}
}
