// survey.dto.ts
export type Survey = {
    rating: number;
    comment: string;
};

export class SurveyDto implements Survey {
    rating: number;
    comment: string;

    constructor(partial: Partial<Survey>) {
        Object.assign(this, partial);
    }
}
