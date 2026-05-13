import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookbookColumns2 } from './lookbook-columns2';

describe('LookbookColumns2', () => {
  let component: LookbookColumns2;
  let fixture: ComponentFixture<LookbookColumns2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookbookColumns2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookbookColumns2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
