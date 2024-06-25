import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteModuleInfoService {
  remoteModuleInfo: any[] = [];
  constructor(private readonly http: HttpClient) {}
}
