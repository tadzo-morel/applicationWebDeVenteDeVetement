import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [RouterLink, Header, Footer],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.css'
})
export class TermsConditions {
  lastUpdated = '10 mai 2026';
}
