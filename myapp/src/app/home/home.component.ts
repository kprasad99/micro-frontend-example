import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'k-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  menu: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.menu = [];
    this.http.get<any>(environment.MODULE_FEDERATION_URL).subscribe((v) => {
      for (const key in v) {
        const app = v[key];
        this.menu = [...this.menu, app.name];
      }
    });
  }
}
