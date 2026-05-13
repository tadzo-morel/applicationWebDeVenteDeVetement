import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRightSidebar } from './blog-right-sidebar';

describe('BlogRightSidebar', () => {
  let component: BlogRightSidebar;
  let fixture: ComponentFixture<BlogRightSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogRightSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogRightSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
