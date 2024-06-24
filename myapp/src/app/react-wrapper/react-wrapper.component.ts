import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'k-react-wrapper',
  templateUrl: './react-wrapper.component.html',
  styleUrl: './react-wrapper.component.scss',
})
export class ReactWrapperComponent implements AfterViewInit {
  @Input()
  appInfo?: any;
  @ViewChild('reactWrapper', { static: true })
  reactWrapper!: ElementRef;

  async ngAfterViewInit() {
    const appModule = await loadRemoteModule(this.appInfo);

    const reactComponent = appModule.default; // Assuming default export
    const reactElement = React.createElement(reactComponent, {
      //data here
      // label: 'value'
    });

    const container = this.reactWrapper.nativeElement;
    const root = ReactDOM.createRoot(container);
    root.render(reactElement); // Render using 'createRoot'
  }
}
