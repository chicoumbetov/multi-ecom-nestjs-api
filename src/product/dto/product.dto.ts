import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ProductDto {
	@IsString({
		message: 'title-required'
	})
	@IsNotEmpty({ message: 'title-can-not-be-empty' })
	title: string

	@IsString({ message: 'description-required' })
	@IsNotEmpty({ message: 'description-can-not-be-empty' })
	description: string

	@IsNumber({}, { message: 'price-must-be-number' })
	@IsNotEmpty({ message: 'price-can-not-be-empty' })
	price: number

	@IsString({
		message: 'choose-at-least-one-image',
		each: true
	})
	@ArrayMinSize(1, { message: 'must-be-at-least-one-image' })
	@IsNotEmpty({
		each: true,
		message: 'path-to-image-can-not-be-empty'
	})
	images: string[]

	@IsString({
		message: 'category-required'
	})
	@IsNotEmpty({ message: 'ID-category-can-not-be-empty' })
	categoryId: string

	@IsString({
		message: 'color-required'
	})
	@IsNotEmpty({ message: 'ID-color-can-not-be-empty' })
	colorId: string
}
