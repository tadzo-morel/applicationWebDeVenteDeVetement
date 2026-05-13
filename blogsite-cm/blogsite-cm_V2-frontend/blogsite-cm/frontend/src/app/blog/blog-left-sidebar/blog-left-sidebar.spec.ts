import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLeftSidebar } from './blog-left-sidebar';

describe('BlogLeftSidebar', () => {
  let component: BlogLeftSidebar;
  let fixture: ComponentFixture<BlogLeftSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogLeftSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogLeftSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
