export class Relatorio {    
    arrayDados?: any[];
    formato?: string;

    constructor( arrayDados: any[], formato: string) {
        this.formato = formato;
        this.arrayDados = arrayDados;
    }

}