import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true
};

@Component({
  selector: 'stock-counter',
  providers: [COUNTER_CONTROL_ACCESSOR],
  styleUrls: ['stock-counter.component.scss'],
  template: `
    <div class="stock-counter">
      <div>
        <div>
          <p>{{ value }}</p>

          <div>
            <button
              type="button"
              (click)="increment()"
              [disabled]="value === max">
              +
            </button>

            <button
              type="button"
              (click)="decrement()"
              [disabled]="value === min">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StockCounterComponent implements ControlValueAccessor {
  @Input() step: number = 10;
  @Input() min: number = 10;
  @Input() max: number = 1000;
  value: number = 10;
  private onTouch: Function;
  private onModelChange: Function;

  writeValue(value: number) {
    this.value = value || 0;
  }

  registerOnChange(fn: Function) {
    this.onTouch = fn;
  }

  registerOnTouched(fn: Function) {
    this.onModelChange = fn;
  }

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onModelChange(this.value);
    }

    this.onTouch();
  }

  decrement() {
    if (this.value > this.max) {
      this.value = this.value - this.step;
      this.onModelChange(this.value);
    }

    this.onTouch();
  }
}
