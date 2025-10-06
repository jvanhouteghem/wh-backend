import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class SurveyDto {
    @IsInt({ message: 'ratingMustBeInteger' })
    @Min(1, { message: 'ratingMustBeGreaterThanZero' })
    @Max(5, { message: 'ratingMustBeLessThanFive' })
    rating: number;

    @IsNotEmpty({ message: 'commentRequired' })
    comment: string;
}
