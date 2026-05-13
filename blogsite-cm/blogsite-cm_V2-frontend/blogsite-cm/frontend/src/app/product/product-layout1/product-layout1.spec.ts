import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLayout1 } from './product-layout1';

describe('ProductLayout1', () => {
  let component: ProductLayout1;
  let fixture: ComponentFixture<ProductLayout1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLayout1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductLayout1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
