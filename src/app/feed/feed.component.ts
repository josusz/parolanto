import { Component } from '@angular/core';
import { NavbarInterativoComponent } from "../navbar-interativo/navbar-interativo.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NavbarInterativoComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
}