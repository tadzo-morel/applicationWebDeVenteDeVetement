import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFullwidth } from './shop-fullwidth';

describe('ShopFullwidth', () => {
  let component: ShopFullwidth;
  let fixture: ComponentFixture<ShopFullwidth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFullwidth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopFullwidth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
