import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit,  OnDestroy {

  numberOfSubscriptions: Subscription;
  customSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.intervalExample();
    this.completedOwnObservableExample();
  }

  ngOnDestroy() {
    this.numberOfSubscriptions.unsubscribe();
    this.customSubscription.unsubscribe();
  }



  errorOwnObservableExample(): void {
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        observer.error('eror while sending data');
      }, 6000);
      });
    myObservable.subscribe(
      (data: string) => {
      console.log(data);
    }, (error: string) => {console.log(error); },
      () => {console.log('operation completed'); }
    );
  }

  completedOwnObservableExample(): void {
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        observer.complete();
      }, 6000);
      setTimeout(() => {
        observer.next('package after complete, will not send');
      }, 7000);
    });
    this.customSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      }, (error: string) => {console.log(error); },
      () => {console.log('operation completed'); }
    );
  }

  intervalExample(): void {
    const myNumbers = Observable.interval(1000);
    this.numberOfSubscriptions = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );
  }

}
