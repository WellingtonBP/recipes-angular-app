import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as RecipesAction from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(public store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params.index;
      this.store.select('recipes').pipe(take(1)).subscribe((recipesState) => {
        this.recipe = recipesState.recipes[this.index];
      })
    });
  }

  addIngredientsToShoppingList():void {
    this.store.dispatch(ShoppingListActions.addIngredients({ingredients: this.recipe.ingredients}));
  }

  deleteRecipe(): void{
    this.store.dispatch(RecipesAction.deleteRecipe({index: this.index}));
  }
}
