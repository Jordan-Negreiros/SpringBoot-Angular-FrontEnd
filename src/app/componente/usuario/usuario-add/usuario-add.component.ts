import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../model/user';
import {UsuarioServiceService} from '../../../service/usuario-service.service';
import {Telefone} from '../../../model/telefone';
import {FormControl, Validators} from '@angular/forms';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Profissao} from '../../../model/profissao';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDate(date.day) + this.DELIMITER + validarDate(date.month) + this.DELIMITER + date.year : null;
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/'; // 18/10/1987

  format(date: NgbDateStruct): string | null {
    return date ? validarDate(date.day) + this.DELIMITER + validarDate(date.month) + this.DELIMITER + date.year : '';
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDate(date.day) + this.DELIMITER + validarDate(date.month) + this.DELIMITER + date.year : null;
  }
}

function validarDate(valor) { // adiciona zero em dias e meses menores que 10
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  }
  return valor;
}

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormataData},
    {provide: NgbDateAdapter, useClass: FormatDateAdapter}]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  telefone = new Telefone();
  profissoes : Array<Profissao>;

  control: FormControl = new FormControl('dataNascimento', Validators.required);

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioServiceService) {
  }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getUsuarioById(id).subscribe(data => {
        this.usuario = data;
      });
    }

    this.userService.getProfissaoList().subscribe(data => {
      this.profissoes = data;
    });

  }

  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) { /* atualizando ou editando */
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info('atualizou user ' + data);
      });
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => { /* salvando novo usuário */
        this.novo();
        console.info('gravou user ' + data);
      });
    }
  }

  deletarTelefone(id, i) {
    if (id == null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }
    if (id != null && confirm('Deseja Remover')) {
      this.userService.removerTelefone(id).subscribe(data => {
        this.usuario.telefones.splice(i, 1); /* remove o telefone da lista */
      });
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
