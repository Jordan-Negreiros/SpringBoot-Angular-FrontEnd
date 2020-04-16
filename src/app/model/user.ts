import {Telefone} from './telefone';
import {Profissao} from './profissao';

export class User {

  id: Number;
  login: String;
  nome: String;
  cpf: String;
  email: String;
  senha: String;
  dataNascimento: String;

  telefones: Array<Telefone>;

  profissao: Profissao = new Profissao();
}
