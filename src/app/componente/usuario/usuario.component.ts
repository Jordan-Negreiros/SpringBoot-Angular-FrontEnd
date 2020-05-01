import {Component, OnInit} from '@angular/core';
import {UsuarioServiceService} from '../../service/usuario-service.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  usuarios: Array<User[]>;
  nome: String = '';
  total: Number;

  constructor(private usuarioService: UsuarioServiceService) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  deleteUsuario(id:Number, index) {
    if (confirm('Deseja mesmo remover ?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        //console.log("Retorno método delete " + data);
        //this.carregarUsuarios();
        //});

        this.usuarios.splice(index, 1);/* remove da tela */
      });
    }
  }
  consultarUsuario() {
    if (this.nome !== undefined && this.nome !== '') {
      this.usuarioService.consultarUsuario(this.nome).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      })
    } else {
      this.carregarUsuarios();
    }
  }

  carregarUsuarios() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }

  carregarPagina(pagina) {
    if (this.nome !== '') {
      this.usuarioService.consultarUsuarioPage(this.nome, (pagina - 1)).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.usuarioService.getUsuarioPage(pagina - 1).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    }
  }

  imprimeRelatorio() {
    return this.usuarioService.downloadPdfRelatorio();
  }
}
