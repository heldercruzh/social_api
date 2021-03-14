import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteCadComponent } from './cliente-cad.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TextMaskModule } from 'angular2-text-mask';
import { SharedModule } from '../../../shared/shared.module';


describe('ClienteCadComponent', () => {
  let component: ClienteCadComponent;
  let fixture: ComponentFixture<ClienteCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        ModalModule,
        TextMaskModule,
        SharedModule
      ],
      declarations: [ ClienteCadComponent ],
      providers: [ ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
   
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
