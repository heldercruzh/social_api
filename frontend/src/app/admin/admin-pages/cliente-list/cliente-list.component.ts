import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../../shared/models/pessoa';
import { first } from 'rxjs/operators';
import { PessoaService } from '../../../shared/services/pessoa.service';
import { RelatorioService } from '../../../shared/services/relatorio.service';
import { EmailService } from '../../../shared/services/email.service';
import { AlertModalService } from '../../../shared/alert-modal.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UfService } from '../../../shared/services/uf.service';
import { Municipio } from '../../../shared/models/municipio';
import { MunicipioService } from '../../../shared/services/municipio.service';
import { Uf } from '../../../shared/models/uf';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  //form
  clienteForm: FormGroup = this.formBuilder.group({});
  ufs: Observable<Uf[]> = new Observable;
  municipios: Municipio[] = [new Municipio];
  municipiosFiltrados?: Municipio[];
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/,/\d/,/\d/, '.', /\d/,/\d/,/\d/, '-', /\d/, /\d/];

  //table
  loading = false;
  pessoas: Pessoa[];
  pessoaSelecionada: Pessoa;
  reportBlob: Blob = new Blob;
  strhtml: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private modal: AlertModalService,
    private router: Router,
    private relatorioService: RelatorioService,
    private emailService: EmailService,
    private municipioService: MunicipioService,
    private ufService: UfService
    ) { 
      this.pessoas = [new Pessoa()];
      this.pessoaSelecionada = new Pessoa();
      this.createForm();
    }

    
  ngOnInit() {
    this.listarUfs();
    this.listarMunicipios();
    this.onRefresh();
  }


  onRefresh() {
    this.pessoaService.read().pipe(first())
    .subscribe(
        pessoas => {
          this.loading = false;
          this.pessoas = pessoas;
        },
        error => {
          this.modal.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
        });
  }

  gerarRelatorio(pessoas: Pessoa[], formato: string) {
    this.relatorioService.export(pessoas, formato).subscribe(data => saveAs(data, `lista_contatos.${formato}`));
  }

  onEnviarEmail(pessoa: Pessoa){
    this.emailService.enviar(
      ["heldercruzh@gmail.com"],
      "teste de email assunto",
      "teste de email corpo "+pessoa.nome).subscribe(
      success => {
        this.modal.showAlertSuccess("Email enviado com sucesso!");
      },
      err => {
        this.modal.showAlertDanger("Erro ao enviar o e-mail!");
      });
  }

  onPagar(id: number) {
    this.router.navigate(['pagamento', id]);
  }

  onEdit(id: number) {
    this.router.navigate(['cliente-edit', id]);
  }

  onDelete(pessoa: Pessoa) {
    this.pessoaSelecionada = pessoa;
    
    const result$ = this.modal.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse cliente?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(
        result => (result && pessoa.id) ? this.pessoaService.remove(pessoa.id): EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
      },
      error => {
        this.modal.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );
  }

  consultar() {
    this.pessoaService.consultar(this.f.cpf.value, this.f.nome.value, this.clienteForm.get('uf.id')?.value, this.clienteForm.get('municipio.id')?.value).subscribe(
      data => {
          this.pessoas = data;
      },
      err => {
        this.modal.showAlertDanger(err.error.message);
      }
    );       
  }

  // usado para facilitar o acesso aos camponpmjs.com/package/ do formulário
  get f() { return this.clienteForm.controls; }

  private createForm () {
    this.clienteForm = this.formBuilder.group({
        cpf: [""],
        nome: [""],
        uf: this.formBuilder.group({
          id: [0] 
        }),
        municipio: this.formBuilder.group({
          id: [0] 
        })
    });
  }

  listarUfs(): any {
    this.ufs = this.ufService.read();
  }

  listarMunicipios() {
    this.municipioService.read().pipe(first())
    .subscribe(
        municipios => {
          this.municipios = municipios;
        });
  }

  buscarMunicipiosPorUF(id:number){
    this.municipiosFiltrados = this.municipios.filter((item)=> item.uf?.id == id);
  }

}
