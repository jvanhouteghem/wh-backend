import { IsInt, Min, Max, IsNotEmpty, IsString } from 'class-validator';

export type Survey = {
    rating: number;
    comment: string;
};

export class SurveyDto implements Survey {
    @IsInt({ message: 'ratingMustBeInteger' })
    @Min(1, { message: 'ratingMustBeGreaterThanZero' })
    @Max(5, { message: 'ratingMustBeLessThanFive' })
    rating: number;

    @IsNotEmpty({ message: 'commentRequired' })
    comment: string;

    constructor(partial: Partial<Survey>) {
        Object.assign(this, partial);
    }
}
