import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projeto-Angular-API-Rest';

  usuario = {login: '', senha: ''}

  public login() {
    console.log("Teste login : " + this.usuario.login + " senha : " + this.usuario.senha)
  }
}
