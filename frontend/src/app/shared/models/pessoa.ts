import { Usuario } from './usuario';
import { Perfil } from './perfil';
import { Uf } from './uf';
import { Municipio } from './municipio';
import { GenericModel } from '../generic.model';

export class Pessoa implements GenericModel {
  id?: number;
  nome?: string;
  usuario: Usuario;
  cpf?: string;
  rg?: string;
  ssp: Uf;
  dataNascimento?: string;
  genero?: boolean;
  telefone?: string;
  celular?: string;
  cep?: string;
  municipio:  Municipio;
  bairro?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  ativo?: boolean;

 constructor() {
  
    this.municipio = new Municipio();
    this.municipio.uf = new Uf();
    this.ssp = new Uf();
    this.usuario = new Usuario();
  
 }

}
