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

export interface IAttractionDetail {
    name: string;
    image: string;
    state: string;
    rating: string;
    tag: string;
    num_review: number;
    review_score: IReviewScore;
    review: IReview[];
}

export interface IApiAttractionDetailResponse {
    attraction: IAttractionDetail;   
    hotel: IHotel[];
    restaurant: IRestaurant[];
}

export interface IReviewScore {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    _id: string;
}

export interface IReview {
    _id: string;
    username: string;
    type_trip: string;
    time: string;
    rating: string;
    title: string;
    content: string;
}

export interface IHotel {
    name: string;
    rating: string;
    url: string;
    image: string;
    state: string;
}

export interface IRestaurant {
    name: string;
    rating: string;
    url: string;
    image: string;
    state: string;
}