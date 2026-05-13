import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink, Header, Footer],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {}
