import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ConstantsService {
  server = environment.server;

  constructor() {
    console.log('Hello ConstantServiceProvider Provider');
  }

  getHeaders() {
    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Origin', '*')      
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return options;
  }
}
