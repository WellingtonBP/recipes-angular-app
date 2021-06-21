import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap, map, take } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer'
import * as RecipesAction from './store/recipes.actions';
import { Actions, ofType } from "@ngrx/effects";

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe[]> {

   constructor(private store: Store<fromApp.AppState>, private actions$: Actions){}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
      return this.store.select('recipes')
         .pipe(
            take(1),
            switchMap((recipesState) => {
               if(recipesState.recipes.length < 1){
                  this.store.dispatch(RecipesAction.fetchRecipes());
                  return this.actions$.pipe(
                     take(1),
                     ofType(RecipesAction.setRecipes),
                     map((action) => action.recipes)
                  );
               }
               return of(recipesState.recipes);
            })
         );
   }
}