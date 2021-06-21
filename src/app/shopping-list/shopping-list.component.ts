import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';

import { Ingredient } from './ingredient.model';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Observable<{ingredients: Ingredient[]}>;
  constructor(private store: Store<fromApp.AppState>, private titleService: Title) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    this.titleService.setTitle('Shopping List')
  }

  public editItemEvent(index: number){
    this.store.dispatch(ShoppingListActions.startEditing({index}));
  }
}
