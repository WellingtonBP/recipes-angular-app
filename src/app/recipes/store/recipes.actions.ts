import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const addRecipe = createAction(
   '[Recipes] Add Recipe',
   props<{recipe: Recipe}>()
);

export const editRecipe = createAction(
   '[Recipes] Edit Recipe',
   props<{recipe: Recipe, index: number}>()
);

export const deleteRecipe = createAction(
   '[Recipes] Delete Recipe',
   props<{index: number}>()
);

export const setRecipes = createAction(
   '[Recipes] Set Recipes',
   props<{recipes: Recipe[]}>()
);

export const fetchRecipes = createAction(
   '[Recipes] Fetch Recipes'
);
