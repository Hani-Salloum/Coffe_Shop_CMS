interface Nationality {
    code: string;
    name: string;
}

export interface Barista {
    id?: number;
    name: string;
    image: string;
    age?: number;
    position: string;
    experience_years: number;
    nationality: Nationality;
    description?: string;
}