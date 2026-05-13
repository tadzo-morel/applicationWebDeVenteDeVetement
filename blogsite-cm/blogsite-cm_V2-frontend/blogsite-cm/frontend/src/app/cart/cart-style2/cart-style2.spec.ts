import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStyle2 } from './cart-style2';

describe('CartStyle2', () => {
  let component: CartStyle2;
  let fixture: ComponentFixture<CartStyle2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartStyle2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartStyle2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
