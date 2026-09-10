import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuOpen = false;

  links = [
    { path: '/', label: 'Dashboard', ref: 'U1' },
    { path: '/experience', label: 'Experience', ref: 'U2' },
    { path: '/contact', label: 'Contact', ref: 'U3' }
  ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
