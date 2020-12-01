import { CommonModule } from "@angular/common";
import { ModuleWithProviders, Provider } from "@angular/core";

import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FoodStoreService } from "./food-store.service";
import { FOOD_STORE_CONFIG, FoodStoreConfig } from "./config";

export const FOOD_PROVIDERS: Provider[] = [FoodStoreService];

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: []
})
export class FoodStoreModule {
  static forRoot(config: FoodStoreConfig): ModuleWithProviders {
    return {
      ngModule: FoodStoreModule,
      providers: [
        FOOD_PROVIDERS,
        {
          provide: FOOD_STORE_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
