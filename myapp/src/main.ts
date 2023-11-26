import { initFederation } from '@angular-architects/module-federation';

import { environment } from './environments/environment';

initFederation(environment.MODULE_FEDERATION_URL)
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
