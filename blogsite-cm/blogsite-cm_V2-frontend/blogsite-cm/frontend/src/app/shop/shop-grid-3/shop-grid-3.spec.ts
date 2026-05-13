import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGrid3 } from './shop-grid-3';

describe('ShopGrid3', () => {
  let component: ShopGrid3;
  let fixture: ComponentFixture<ShopGrid3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopGrid3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopGrid3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
