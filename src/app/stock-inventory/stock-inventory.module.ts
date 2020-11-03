import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';
import { StockBranchComponent } from './component/stock-branch/stock-branch.component';
import { StockProductsComponent } from './component/stock-products/stock-products.component';
import { StockSelectorComponent } from './component/stock-selector/stock-selector.component';
import { HttpModule } from '@angular/http';
import { StockInventoryService } from './services/stock-inventory.services';

@NgModule({
  declarations: [
    StockInventoryComponent,
    StockBranchComponent,
    StockProductsComponent,
    StockSelectorComponent
  ],
  providers: [
    StockInventoryService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    StockInventoryComponent
  ]
})
export class StockInventoryModule {}
