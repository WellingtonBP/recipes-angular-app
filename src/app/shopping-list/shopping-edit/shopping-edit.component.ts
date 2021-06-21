import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../ingredient.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private editingItemSub: Subscription;
  public editMode: boolean;
  @ViewChild('form') IngredientForm: NgForm;

  constructor(public store: Store<fromApp.AppState>) { 
  }

  ngOnInit(): void{
    this.editingItemSub = this.store.select('shoppingList').subscribe((shoppingListState) => {
      if(shoppingListState.editingIngredientIndex > -1) {
        this.editMode = true;
        this.IngredientForm.setValue(shoppingListState.ingredients[shoppingListState.editingIngredientIndex]);
      }else{
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void{
    this.editingItemSub.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEditing());
  }

  public onSubmit(action: string){
    const ingredient = new Ingredient(this.IngredientForm.value.name, this.IngredientForm.value.amount);
    switch(action){
      case 'add':
        this.store.dispatch(ShoppingListActions.addIngredient({ingredient}));
        break;
      case 'delete':
        this.store.dispatch(ShoppingListActions.deleteIngredient());
        break;
      case 'edit':
        this.store.dispatch(ShoppingListActions.editIngredient({ingredient}));
    }
    this.editMode = false;
    this.IngredientForm.reset();
    this.store.dispatch(ShoppingListActions.stopEditing());
  }
}
