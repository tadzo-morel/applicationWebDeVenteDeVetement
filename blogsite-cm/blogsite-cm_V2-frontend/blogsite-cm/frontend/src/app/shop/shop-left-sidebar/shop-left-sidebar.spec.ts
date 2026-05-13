import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLeftSidebar } from './shop-left-sidebar';

describe('ShopLeftSidebar', () => {
  let component: ShopLeftSidebar;
  let fixture: ComponentFixture<ShopLeftSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopLeftSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopLeftSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
