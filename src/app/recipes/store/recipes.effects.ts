import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, take, map, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import * as RecipesAction from './recipes.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects{
   addRecipe$ = createEffect(
      () => 
         this.actions$.pipe(
            ofType(RecipesAction.addRecipe),
            tap(() => {
               this.store.select('recipes').pipe(take(1)).subscribe((recipesState) => {
                  this.router.navigate(['/recipes', recipesState.recipes.length - 1]);
               })
            }),
            switchMap((action) => {
               return this.http
                  .post<{name: string}>('https://ng-course-8688a-default-rtdb.firebaseio.com/recipes.json', action.recipe);
            })
         ),
         {dispatch: false}
   );
   
   editRecipe = createEffect(
      () => 
         this.actions$.pipe(
            ofType(RecipesAction.editRecipe),
            tap((action) => {
               this.router.navigate(['/recipes', action.index]);
            }),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, recipesState]) => {
               return this.http
                  .put<Recipe[]>('https://ng-course-8688a-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes);
            })
         ),
         {dispatch: false}
   );
   
   deleteRecipe = createEffect(
      () =>    
         this.actions$.pipe(
            ofType(RecipesAction.deleteRecipe),
            tap(() => {
               this.router.navigate(['/recipes']);
            }),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, recipesState]) => {
               return this.http
                  .put<Recipe[]>('https://ng-course-8688a-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes);
            })
         ),
         {dispatch: false}
   );

   fetchRecipes = createEffect(
      () =>
         this.actions$.pipe(
            ofType(RecipesAction.fetchRecipes),
            switchMap(() => {
               return this.http
                  .get<{[id: string]: Recipe}>('https://ng-course-8688a-default-rtdb.firebaseio.com/recipes.json')
                  .pipe(
                     map((responseData => {
                        const fetchedRecipes = [];
                        for(let id in responseData){
                           fetchedRecipes.push({...responseData[id], ingredients: responseData[id].ingredients || []});
                        }
                        return RecipesAction.setRecipes({recipes: fetchedRecipes});
                     }))
                  )
            })
         )
   );
   
   constructor(private actions$: Actions, private store: Store<fromApp.AppState>, private http: HttpClient, private router: Router){}
}