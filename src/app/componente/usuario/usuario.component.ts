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

  constructor(private usuarioService: UsuarioServiceService) { }

  ngOnInit() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.usuarios = data;
    })
  }

}
