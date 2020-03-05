import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../../../model/user';
import {UsuarioServiceService} from '../../../service/usuario-service.service';
import {Telefone} from '../../../model/telefone';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  telefone = new Telefone();

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

  deletarTelefone(id, i) {
    if (id == null) {
      this.usuario.telefones.splice(i,1);
      return;
    }
    if (id != null && confirm("Deseja Remover")) {
      this.userService.removerTelefone(id).subscribe(data => {
        this.usuario.telefones.splice(i, 1); /* remove o telefone da lista */
      })
    }
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }


  addTelefone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }
}
