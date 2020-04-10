export class Variable
{
  nombre: string;
  fila: number;
  tipo: string;

  constructor(nombre: string, fila: number , tipo: string)
  {
    this.nombre = nombre;
    this.fila = fila;
    this.tipo = tipo;
  }
}
