export interface IAttraction {
    name: string;
    rating: string;
    tag: string;
    image: string;
}

export interface IApiAttractionResponse {
    success: boolean;
    state: string;
    recommendations: IAttraction[];
}