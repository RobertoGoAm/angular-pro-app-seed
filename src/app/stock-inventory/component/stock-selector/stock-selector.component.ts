import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Product } from "../../models/products.interface";

@Component({
  selector: "stock-selector",
  styleUrls: ["stock-selector.component.scss"],
  template: `
    <div class="stock-selector" [formGroup]="parent">
      <div formGroupName="selector">
        <select formControlName="product_id">
          <option value="">Select stock</option>
          <option *ngFor="let product of products" [value]="product.id">
            {{ product.name }}
          </option>
        </select>

        <stock-counter
          [step]="10"
          [min]="10"
          [max]="1000"
          formControlName="quantity"
        >
        </stock-counter>

        <button
          type="button"
          [disabled]="stockExists || notSelected"
          (click)="onAdd()"
        >
          Add stock
        </button>

        <div class="stock-selector__error" *ngIf="stockExists">
          Item already exists in the stock
        </div>
      </div>
    </div>
  `
})
export class StockSelectorComponent {
  @Input() parent: FormGroup;
  @Input() products: Product[];
  @Output() added = new EventEmitter<any>();

  onAdd() {
    this.added.emit(this.parent.get("selector").value);
    this.parent.get("selector").reset({
      product_id: "",
      quantity: 10
    });
  }

  get stockExists() {
    return (
      this.parent.hasError("stockExists") &&
      this.parent.get("selector.product_id").dirty
    );
  }

  get notSelected() {
    return !this.parent.get("selector.product_id").value;
  }
}
