export class Token
{
  lexema: string;
  Tipo: Tipo;
  fila: number;
  columna: number;
  descripcion: string;
  error: boolean;

  constructor(tipo: Tipo, lexema: string, fila: number, columna: number, desc: string, error: boolean)
  {
      this.Tipo = tipo;
      this.lexema = lexema;
      this.fila = fila;
      this.columna = columna;
      this.descripcion = desc;
      this.error = error;
  }
}

export enum Tipo
{
  RESERVADA_INT, RESERVADA_DOUBLE, RESERVADA_DO,
  RESERVADA_CHAR, RESERVADA_STRING,
  RESERVADA_BOOL, CADENA, RETURN,
  NUMERO, GUION_BAJO, COMA, PUNTO_Y_COMA,
  TRUE, FALSE, PUNTO, SIGNO_MAS, SIGNO_MENOS,
  SIGNO_DIVISION, SIGNO_MULTIPLICACION,
  PARENTESIS_APERTURA, PARENTESIS_CIERRE,
  LLAVE_APERTURA, LLAVE_CIERRE, DIFERENTE,
  CORCHETE_APERTURA, CORCHETE_CIERRE,
  IDENTIFICADOR, IGUAL, IGUAL_QUE, MAYOR_QUE, MAYOR_IGUAL, MENOR_QUE,
  MENOR_IGUAL, ADMIRACION, RESERVADA_CLASS, RESERVADA_STATIC,
  RESERVADA_VOID, RESERVADA_MAIN, RESERVADA_ARGS,
  FUNCION_WRITELINE, RESERVADA_ELSE, RESERVADA_SWITCH,
  RESERVADA_CASE, DOS_PUNTOS, RESERVADA_BREAK,
  RESERVADA_FOR, RESERVADA_WHILE, RESERVADA_DEFAULT,
  FUNCION_GRAFICARVECTOR, NUMERO_ENTERO, NUMERO_DECIMAL,
  ERROR, RESERVADA_IF, COMENTARIO_LINEA, COMENTARIO_BLOQUE,
  RESERVADA_NEW, ULTIMO, VALOR_CHAR, OR_LOGICO, HTML, CONTINUE
}
