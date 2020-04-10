export class Error
{
  text: string;
  row: number;
  column: number;
  type: string;
  constructor(mensaje: string, fila: number, columna: number)
  {
    this.row = fila;
    this.column = columna;
    this.text = mensaje;
    this.type = 'error';
  }
}
