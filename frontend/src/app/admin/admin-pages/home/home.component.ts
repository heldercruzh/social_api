import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { AlertModalService } from '../../../shared/alert-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modal: AlertModalService
  ) { }

  ngOnInit(): void {
  }

  getUser(){
    
    let erroMessage = "Erro ao acessar o recurso, contate o administrador";

    this.userService.getUser().subscribe(
      data => {
        console.log(data);
        this.modal.showAlertSuccess("Recurso acessado com sucesso!");
      },
      err => {
        if(err.status === 401 || err.status === 403){
          erroMessage = "Você não tem permissão para acessar a esse recurso";
        } 
        this.modal.showAlertDanger(erroMessage);
      }
    );

  }

  getAdmin(){
    let erroMessage = "Erro ao acessar o recurso, contate o administrador";

    this.userService.getAdmin().subscribe(
      data => {
        console.log(data);
        this.modal.showAlertSuccess("Recurso acessado com sucesso!");
      },
      err => {
        if(err.status === 401 || err.status === 403){
          erroMessage = "Você não tem permissão para acessar a esse recurso";
        } 
        this.modal.showAlertDanger(erroMessage);
      }
    );
  }

}
