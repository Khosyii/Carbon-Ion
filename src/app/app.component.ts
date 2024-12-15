import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/folder/inbox', icon: 'mail' },
    { title: 'Peta Routing', url: 'maps2', icon: 'paper-plane' },
    { title: 'Peta Analisis', url: 'map-analyst', icon: 'heart' },
    { title: 'Rekap Perjalanan', url: '/folder/archived', icon: 'archive' },
    { title: 'Edit Perjalanan', url: '/folder/trash', icon: 'trash' },
    { title: 'Dashboard', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['', '', '', '', '', ''];
  constructor() {}
}
