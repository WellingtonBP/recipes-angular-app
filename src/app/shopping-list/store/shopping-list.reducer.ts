import { createReducer, on, Action } from '@ngrx/store';

import { Ingredient } from "../ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Array<Ingredient>;
  editingIngredientIndex: number;
};

const initialState: State = {
  ingredients: [
    new Ingredient('Onion', 5)
  ],
  editingIngredientIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,
  on(
    ShoppingListActions.addIngredient,
    (state, action) => (
      {
        ...state,
        ingredients: [...state.ingredients, action.ingredient]
      }
    )
  ),
  on(
    ShoppingListActions.addIngredients,
    (state, action) => (
      {
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients]
      }
    )
  ),
  on(
    ShoppingListActions.editIngredient,
    (state, action) => (
      {
        ...state,
        ingredients: state.ingredients.map((ingredient, index) => {
          return index === state.editingIngredientIndex ? action.ingredient : ingredient;
        })
      }
    )
  ),
  on(
    ShoppingListActions.deleteIngredient,
    (state) => (
      {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => igIndex !== state.editingIngredientIndex)
      }
    )
  ),
  on(
    ShoppingListActions.startEditing,
    (state, action) => (
      {
        ...state,
        editingIngredientIndex: action.index
      }
    )
  ),
  on(
    ShoppingListActions.stopEditing,
    (state) => (
      {
        ...state,
        editingIngredientIndex: -1
      }
    )
  )
);

export function shoppingListReducer(state: State, action: Action){
    return _shoppingListReducer(state, action);
}