import { IsString } from 'class-validator'

export class ColorDto {
	@IsString({
		message: 'name-required'
	})
	name: string

	@IsString({
		message: 'value-required'
	})
	value: string
}
