
export class Email {

destinatario: string[]; 
assunto: string; 
texto: string;

    constructor(destinatario: string[], assunto: string, texto: string) {
        this.destinatario = destinatario
        this.assunto = assunto
        this.texto = texto
    }

}