import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { Review } from "./review";
import { Size } from "./size";

export interface Item {
    id:  number;
    name: string;
    image: string;
    price: number;
    ingredients?:  Array<Ingredient>;
    rate: number;
    sizes?: Array<Size>;
    categories: Array<Category> ;
    related_items?:  Array<Item>;
    description?: string;
    origin_story?: string;
    reviews: Array<Review>
}