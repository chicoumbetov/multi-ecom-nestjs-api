import { IsString } from 'class-validator'

export class CategoryDto {
	@IsString({
		message: 'title-required'
	})
	title: string

	@IsString({
		message: 'description-required'
	})
	description: string
}
