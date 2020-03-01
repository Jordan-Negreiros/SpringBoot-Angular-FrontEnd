import { Component, OnInit } from '@angular/core';
import {UsuarioServiceService} from '../../service/usuario-service.service';
import {Observable} from 'rxjs';
import {User} from '../../model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  usuarios: Observable<User[]>;
  nome: String = '';

  constructor(private usuarioService: UsuarioServiceService) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  deleteUsuario(id:Number) {
    this.usuarioService.deletarUsuario(id).subscribe(data => {
      console.log("Retorno método delete " + data);

      this.carregarUsuarios();
    });
  }

  consultarUsuario() {
    if (this.nome !== undefined && this.nome !== '') {
      this.usuarioService.consultarUsuario(this.nome).subscribe(data => {
        this.usuarios = data;
      })
    } else {
      this.carregarUsuarios();
    }
  }

  carregarUsuarios() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.usuarios = data;
    })
  }
}
