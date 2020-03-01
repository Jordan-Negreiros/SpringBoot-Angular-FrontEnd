import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService implements OnInit{

  constructor(private http: HttpClient) { }

  getUsuarioList() : Observable<any>{
    return this.http.get<any>(AppConstants.baseUrl);
  }

  ngOnInit(): void {
  }

}
