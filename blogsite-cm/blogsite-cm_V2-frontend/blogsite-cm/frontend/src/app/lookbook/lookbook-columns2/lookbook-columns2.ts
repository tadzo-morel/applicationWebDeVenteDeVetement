import { Component } from '@angular/core';
import { LookbookColumns3 } from '../lookbook-columns3/lookbook-columns3';

@Component({
  selector: 'app-lookbook-columns2',
  standalone: true,
  imports: [LookbookColumns3],
  template: '<app-lookbook-columns3></app-lookbook-columns3>'
})
export class LookbookColumns2 {}
