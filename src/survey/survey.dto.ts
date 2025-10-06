// survey.dto.ts
export class SurveyDto {
    rating: number;
    comment: string;

    constructor(partial: Partial<SurveyDto>) {
        Object.assign(this, partial);
    }
}
