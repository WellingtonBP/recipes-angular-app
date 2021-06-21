import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";

@NgModule({
   declarations: [
      ShoppingListComponent,
      ShoppingEditComponent,
   ],
   imports: [
      ShoppingRoutingModule,
      SharedModule
   ]
})
export class ShoppingModule{}