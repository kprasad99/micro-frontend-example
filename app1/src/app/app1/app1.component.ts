import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'k1-app1',
  templateUrl: './app1.component.html',
  styleUrl: './app1.component.scss'
})
export class App1Component implements OnInit {
  message: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('/app1/assets/config.json').subscribe(v => (this.message = v.info));
  }
}
