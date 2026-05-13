import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLayout2 } from './product-layout2';

describe('ProductLayout2', () => {
  let component: ProductLayout2;
  let fixture: ComponentFixture<ProductLayout2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLayout2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductLayout2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
