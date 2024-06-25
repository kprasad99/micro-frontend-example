import { TestBed } from '@angular/core/testing';

import { RemoteModuleInfoService } from './remote-module-info.service';

describe('RemoteModuleInfoService', () => {
  let service: RemoteModuleInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteModuleInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
