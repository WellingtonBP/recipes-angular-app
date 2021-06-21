import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(public store: Store<fromApp.AppState>) { }
  ngOnInit(): void {
    this.store.select('recipes').subscribe((recipesState) => {
      this.recipes = recipesState.recipes;
    })
  }

}
