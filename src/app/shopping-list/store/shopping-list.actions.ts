import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../ingredient.model";

export const addIngredient = createAction(
   '[Shopping-list] Add Ingredient',
   props<{ingredient: Ingredient}>() 
);

export const addIngredients = createAction(
   '[Shopping-list] Add Ingredients',
   props<{ingredients: Ingredient[]}>()
);

export const editIngredient = createAction(
   '[Shopping-list] Edit Ingredient',
   props<{ingredient: Ingredient}>()
);

export const deleteIngredient = createAction(
   '[Shopping-list] Delete Ingredient',
);

export const startEditing = createAction(
   '[Shopping-list] Start Editing',
   props<{index: number}>()
);

export const stopEditing = createAction(
   '[Shopping-list StopEditing'
); 