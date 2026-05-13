import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSinglePost } from './blog-single-post';

describe('BlogSinglePost', () => {
  let component: BlogSinglePost;
  let fixture: ComponentFixture<BlogSinglePost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSinglePost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSinglePost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
