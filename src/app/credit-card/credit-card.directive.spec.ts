import { Component, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import { Observable } from "rxjs/Observable";
import { CreditCardDirective } from "./credit-card.directive";

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

@Component({
  template: ` <input type="text" [value]="value" credit-card /> `
})
class TestComponent {
  value = 123456;
}

describe("CreditCardDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreditCardDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it("should format the string with spaces", () => {
    const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
    directive.value = "475123";
    directive.dispatchEvent(new Event("input"));
    expect(directive.value).toBe("4751 23");
    directive.value = "4751239812019201";
    directive.dispatchEvent(new Event("input"));
    expect(directive.value).toBe("4751 2398 1201 9201");
  });

  it("should have a max-length of 16 characters", () => {
    const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
    directive.value = "4751239812019201998394282394823";
    directive.dispatchEvent(new Event("input"));
    expect(directive.value).toBe("4751 2398 1201 9201");
  });
});
