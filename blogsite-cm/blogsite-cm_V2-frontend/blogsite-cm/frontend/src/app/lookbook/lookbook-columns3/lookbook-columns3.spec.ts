import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookbookColumns3 } from './lookbook-columns3';

describe('LookbookColumns3', () => {
  let component: LookbookColumns3;
  let fixture: ComponentFixture<LookbookColumns3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookbookColumns3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookbookColumns3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
