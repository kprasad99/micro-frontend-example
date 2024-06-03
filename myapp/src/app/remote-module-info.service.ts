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

  Init(): Promise<void> {
    console.log('called');
    const request$ = this.http.get<any>(environment.MODULE_FEDERATION_URL);
    return firstValueFrom(request$);
  }
}
