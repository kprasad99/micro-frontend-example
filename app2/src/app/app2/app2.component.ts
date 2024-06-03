import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'k2-app2',
  templateUrl: './app2.component.html',
  styleUrl: './app2.component.scss',
})
export class App2Component implements OnInit {
  message: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('/app2/assets/config.json')
      .subscribe((v) => (this.message = v.info));
  }
}
