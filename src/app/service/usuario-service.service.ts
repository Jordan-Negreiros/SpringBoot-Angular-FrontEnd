import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUsuarioList() : Observable<any>{
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getUsuarioPage(pagina) : Observable<any>{
    return this.http.get<any>(AppConstants.baseUrl + "page/" + pagina);
  }

  getUsuarioById(id) : Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  getProfissaoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseProfissao);
  }

  deletarUsuario(id: Number) : Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {responseType : 'text'});
  }

  consultarUsuario(nome: String) : Observable<any> {
      return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome);
  }

  consultarUsuarioPage(nome: String, page: Number) : Observable<any> {
      return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome +
      "/page/" + page);
  }

  salvarUsuario(user) :Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUsuario(user) : Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }

  usuarioAutenticado() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

  removerTelefone(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + "removerTelefone/" + id, {responseType: 'text'});
  }
}
