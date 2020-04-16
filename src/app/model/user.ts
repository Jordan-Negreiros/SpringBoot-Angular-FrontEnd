import {Telefone} from './telefone';

export class User {

  id: Number;
  login: String;
  nome: String;
  cpf: String;
  email: String;
  senha: String;
  dataNascimento: String;

  telefones: Array<Telefone>;
}
