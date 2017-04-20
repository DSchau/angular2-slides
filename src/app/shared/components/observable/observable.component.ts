import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IMousePosition } from './observable.interface';

@Component({
  selector: 'opi-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit, OnDestroy {
  @ViewChild('observableArea')
  observableArea: any;

  private position: IMousePosition = {};

  private mouseOver$: Subscription;
  private mouseOut$: Subscription;
  constructor() {}

  ngOnInit() {
    const el = this.observableArea.nativeElement;
    this.mouseOver$ = Observable.fromEvent(el, 'mousemove')
      .subscribe((ev: MouseEvent) => {
        this.position = {
          x: ev.pageX,
          y: ev.pageY
        };
      });

    this.mouseOut$ = Observable.fromEvent(el, 'mouseout')
      .subscribe(() => {
        this.position = {};
      });
  }

  ngOnDestroy() {
    this.mouseOver$.unsubscribe();
    this.mouseOut$.unsubscribe();
  }
}
