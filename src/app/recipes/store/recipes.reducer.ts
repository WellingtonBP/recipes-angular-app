import { createReducer, on, Action } from '@ngrx/store';

import { Recipe } from "../recipe.model";
import * as RecipesAction from './recipes.actions';

export interface State {
   recipes: Recipe[];
};

const initialState: State = {
   recipes: [],
};

const _recipesReducer = createReducer(
   initialState,
   on(
      RecipesAction.addRecipe,
      (state, action) => (
         {
            ...state,
            recipes: [...state.recipes, action.recipe]
         }
      )
   ),
   on(
      RecipesAction.editRecipe,
      (state, action) => (
         {
            ...state,
            recipes: state.recipes.map((recipe, index) => {
               return index === action.index ? {...action.recipe} : recipe;
            })
         }
      )
   ),
   on(
      RecipesAction.deleteRecipe,
      (state, action) => (
         {
            ...state,
            recipes: state.recipes.filter((recipe, index) => index !== action.index)
         }
      )
   ),
   on(
      RecipesAction.setRecipes,
      (state, action) => (
         {
            ...state,
            recipes: action.recipes
         }
      )
   )
);

export function recipesReducer(state: State, action: Action){
   return _recipesReducer(state, action);
}