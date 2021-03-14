import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../../shared/services/pessoa.service';
import { Pessoa } from '../../../shared/models/pessoa';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  pessoa: Pessoa;

  constructor(   
    private route: ActivatedRoute,    
    private pessoaService: PessoaService,   
  ) { 
    this.pessoa = new Pessoa();
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: any) => {
         this.pessoaService.read(params['id'])
         .subscribe(
           pessoa => { 
             this.pessoa = pessoa;
                        
           });
      }
    );

  }

}
