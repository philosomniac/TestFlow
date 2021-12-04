import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/takeWhile';
// import 'rxjs/add/operator/do';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-electron';
  max = 1;
  current = 0;

  start() {
    const my_interval = interval(100);

    my_interval
      .pipe(
        takeWhile((_) => !this.isFinished),
        tap((i) => (this.current += 0.1))
      )
      .subscribe();
    // my_interval.subscribe((i) => (this.current += 0.1));
  }

  finish() {
    this.current = this.max;
  }

  reset() {
    this.current = 0;
  }

  //getters to prevent errors
  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }
}
