import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Item, Product } from '../../models/products.interface';
import { StockInventoryService } from '../../services/stock-inventory.services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <stock-branch
          [parent]="form">
        </stock-branch>

        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>

        <stock-products
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)">
        </stock-products>

        <div class="stock-inventory__price">
          Total: {{ total | currency:'USD':true }}
        </div>

        <div class="stock-inventory__buttons">
          <button
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
        </div>

        <pre>{{ form.value | json }}</pre>

      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit {
  products: Product[];
  productMap: Map<number, Product>;
  form = this.formBuilder.group({
    store: this.formBuilder.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({}),
    stock: this.formBuilder.array([])
  })
  total: number;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockInventoryService
  ) {}

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    Observable
      .forkJoin(cart, products)
      .subscribe(([cart, products]: [Item[], Product[]]) => {

        const myMap = products
          .map<[number, Product]>(product => [product.id, product]);

        this.productMap = new Map<number, Product>(myMap);
        this.products = products;
        cart.forEach(item => this.addStock(item));

        this.calculateTotal(this.form.get('stock').value);

        this.form.get('stock')
          .valueChanges.subscribe(value => this.calculateTotal(value));
      });
  }

  calculateTotal(value: Item[]) {
    const total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.product_id).price)
    }, 0);

    this.total = total;
  }

  createStock(stock: any) {
    return this.formBuilder.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
  }

  addStock(stock: any) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup, index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}
