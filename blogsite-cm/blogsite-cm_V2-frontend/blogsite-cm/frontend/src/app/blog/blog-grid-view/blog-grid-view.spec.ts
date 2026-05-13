import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogGridView } from './blog-grid-view';

describe('BlogGridView', () => {
  let component: BlogGridView;
  let fixture: ComponentFixture<BlogGridView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogGridView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogGridView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
