import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGrid4 } from './shop-grid-4';

describe('ShopGrid4', () => {
  let component: ShopGrid4;
  let fixture: ComponentFixture<ShopGrid4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopGrid4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopGrid4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
