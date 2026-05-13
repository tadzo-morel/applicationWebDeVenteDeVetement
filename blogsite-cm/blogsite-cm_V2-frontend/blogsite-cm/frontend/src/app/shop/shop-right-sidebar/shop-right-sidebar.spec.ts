import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRightSidebar } from './shop-right-sidebar';

describe('ShopRightSidebar', () => {
  let component: ShopRightSidebar;
  let fixture: ComponentFixture<ShopRightSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopRightSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopRightSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
