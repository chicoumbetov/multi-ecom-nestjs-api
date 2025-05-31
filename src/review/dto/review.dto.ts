import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class ReviewDto {
	@IsString({
		message: 'review-text-must-be-string'
	})
	@IsNotEmpty({ message: 'review-text-required' })
	text: string

	@IsNumber({}, { message: 'rating-must-be-number' })
	@Min(1, { message: 'min-rating-1' })
	@Max(5, { message: 'max-rating-5' })
	@IsNotEmpty({ message: 'rating-required' })
	rating: number
}
