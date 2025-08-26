import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Subscription, timer } from 'rxjs';
import { switchMapTo, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private idle$ = new BehaviorSubject<boolean>(false);
  private activityEvents = ['mousemove', 'keydown', 'scroll', 'click'];
  private subscription!: Subscription;

  constructor(private ngZone: NgZone) {}

  startWatching(idleTime: number = 5000) {
    // Run outside Angular to avoid change detection overhead
    this.ngZone.runOutsideAngular(() => {
      const activity$ = merge(
        ...this.activityEvents.map(evt => fromEvent(window, evt))
      );

      this.subscription = activity$
        .pipe(
          startWith(null), // trigger immediately
          switchMapTo(timer(idleTime)) // reset timer on each activity
        )
        .subscribe(() => {
          this.ngZone.run(() => this.idle$.next(true)); // idle
        });

      // Reset idle state on activity
      activity$.subscribe(() => {
        this.ngZone.run(() => this.idle$.next(false)); // active
      });
    });
  }

  stopWatching() {
    this.subscription?.unsubscribe();
  }

  get idleStatus$() {
    return this.idle$.asObservable();
  }
}
