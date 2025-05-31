import { IsString } from 'class-validator'

export class CreateStoreDto {
	@IsString({
		message: 'title-required'
	})
	title: string
}
