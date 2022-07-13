import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
  AfterViewInit, ChangeDetectorRef,
  Component,

  OnDestroy,
  OnInit
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit, OnInit {
  mobileQuery: MediaQueryList;
  historyPayment: History[] = [];
  urlImages: any;
  private _mobileQueryListener: () => void;
  ruta: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public cookieService: CookieService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe((val) => {
      this.ruta = this.router.url;
    });
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {   
  }
}