import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../../../model/user';
import {UsuarioServiceService} from '../../../service/usuario-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioServiceService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getUsuarioById(id).subscribe(data => {
        this.usuario = data;
      });
    }

  }

  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) { /* atualizando ou editando */
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("atualizou user " + data);
      })
    }else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => { /* salvando novo usuário */
        this.novo();
        console.info("gravou user " + data);
      })
    }
  }

  novo() {
    this.usuario = new User();
  }
}
