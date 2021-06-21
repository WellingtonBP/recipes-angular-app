import { Ingredient } from "../shopping-list/ingredient.model";

export class Recipe{
   constructor(public name: string, public description: string, public imagePath: string, public ingredients: Array<Ingredient>){}
}