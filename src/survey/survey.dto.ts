import { IsInt, Min, Max, IsNotEmpty, IsString } from 'class-validator';

export type Survey = {
    rating: number;
    comment: string;
};

export class SurveyDto implements Survey {
    rating: number;

    @IsNotEmpty({ message: 'Comment is required.' })
    comment: string;

    constructor(partial: Partial<Survey>) {
        Object.assign(this, partial);
    }
}
