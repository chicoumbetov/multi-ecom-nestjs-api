import { PartialType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { CreateStoreDto } from './create-store.dto'

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
	@IsString({
		message: 'description-required'
	})
	description: string
}
