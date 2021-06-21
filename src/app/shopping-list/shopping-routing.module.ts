import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { AuthGuard } from "../auth/auth.guard";

@NgModule({
   imports: [
      RouterModule.forChild([
         {path:'', component:ShoppingListComponent, canActivate: [AuthGuard]}
      ])
   ],
   exports: [
      RouterModule
   ]
})
export class ShoppingRoutingModule{}