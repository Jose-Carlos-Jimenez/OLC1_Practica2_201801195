import { tick } from '@angular/core/testing';

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
  public GetTipoString()
    {
        switch (this.Tipo)
        {
          case Tipo.AND:
            return 'AND';
          case Tipo.CADENA:
            return 'String';
          case Tipo.COMA:
            return 'Coma';
          case Tipo.COMENTARIO_BLOQUE:
            return 'Comentario de bloque';
          case Tipo.COMENTARIO_LINEA:
            return 'Comentario de linea';
          case Tipo.CONTINUE:
            return 'Reservada continue';
          case Tipo.CORCHETE_APERTURA:
            return 'Corchete izquierdo';
          case Tipo.CORCHETE_CIERRE:
            return 'Corchete derecho';
          case Tipo.DIFERENTE:
            return 'Diferente';
          case Tipo.DOS_PUNTOS:
            return 'Dos puntos';
          case Tipo.ERROR:
            return 'Error';
          case Tipo.FALSE:
            return 'False';
          case Tipo.FUNCION_WRITELINE:
            return 'Función write';
          case Tipo.GUION_BAJO:
            return 'Guion bajo';
          case Tipo.HTML:
            return 'HTML';
          case Tipo.IDENTIFICADOR:
            return 'Identificador';
          case Tipo.IGUAL:
            return 'Asignacion';
          case Tipo.IGUAL_QUE:
            return 'Igual que';
          case Tipo.LLAVE_APERTURA:
            return 'Llave izquierda';
          case Tipo.LLAVE_CIERRE:
            return 'Llave derecha';
          case Tipo.MAYOR_IGUAL:
            return 'Mayor o igual';
          case Tipo.MAYOR_QUE:
            return 'Mayor que';
          case Tipo.MENOR_IGUAL:
            return 'Menor o igual';
          case Tipo.MENOR_QUE:
            return 'Menor que';
          case Tipo.NOT:
            return 'NOT';
          case Tipo.NUMERO:
            return 'Numero entero';
          case Tipo.NUMERO_DECIMAL:
            return 'Valor';
          case Tipo.NUMERO_ENTERO:
            return 'Numero entero';
          case Tipo.OR_LOGICO:
            return 'OR';
          case Tipo.PARENTESIS_APERTURA:
            return 'Parentesis izquierdo';
          case Tipo.PARENTESIS_CIERRE:
            return 'Parentesis derecho';
          case Tipo.PUNTO:
            return 'Punto';
          case Tipo.PUNTO_Y_COMA:
            return 'Punto y coma';
          case Tipo.RESERVADA_BOOL:
            return 'Tipo de dato';
          case Tipo.RESERVADA_BREAK:
            return 'Reservada break';
          case Tipo.RESERVADA_CASE:
            return 'Reservada case';
          case Tipo.RESERVADA_CHAR:
            return 'Reservada char';
          case Tipo.RESERVADA_CLASS:
            return 'Reservada class';
          case Tipo.RESERVADA_DEFAULT:
            return 'Reservada default';
          case Tipo.RESERVADA_DO:
            return 'Reservada do';
          case Tipo.RESERVADA_DOUBLE:
            return 'Tipo de dato';
          case Tipo.RESERVADA_ELSE:
            return 'Reservada else';
          case Tipo.RESERVADA_FOR:
            return 'Reservada for';
          case Tipo.RESERVADA_IF:
            return 'Reservada if';
          case Tipo.RESERVADA_INT:
            return 'Tipo de dato';
          case Tipo.RESERVADA_MAIN:
            return 'Reservada main';
          case Tipo.RESERVADA_NEW:
            return 'Reservada new';
          case Tipo.RESERVADA_STRING:
            return 'Tipo de dato';
          case Tipo.RESERVADA_SWITCH:
            return 'Reservada switch';
          case Tipo.RESERVADA_VOID:
            return 'Reservada void';
          case Tipo.RESERVADA_WHILE:
            return 'Reservada while';
          case Tipo.RETURN:
            return 'Reservada return';
          case Tipo.SIGNO_DIVISION:
            return 'Operador dividir';
          case Tipo.SIGNO_MAS:
            return 'Operador adición';
          case Tipo.SIGNO_MENOS:
            return 'Operador substracción';
          case Tipo.SIGNO_MULTIPLICACION:
            return 'Operador multiplicar';
          case Tipo.TRUE:
            return 'True';
          case Tipo.ULTIMO:
            return 'End of';
          case Tipo.VALOR_CHAR:
            return 'Tipo de dato';
          default:
              return 'Desconocido';
        }
    }
}

export enum Tipo
{
  RESERVADA_INT, RESERVADA_DOUBLE, RESERVADA_DO,
  RESERVADA_CHAR, RESERVADA_STRING, AND,
  RESERVADA_BOOL, CADENA, RETURN,
  NUMERO, GUION_BAJO, COMA, PUNTO_Y_COMA,
  TRUE, FALSE, PUNTO, SIGNO_MAS, SIGNO_MENOS,
  SIGNO_DIVISION, SIGNO_MULTIPLICACION,
  PARENTESIS_APERTURA, PARENTESIS_CIERRE,
  LLAVE_APERTURA, LLAVE_CIERRE, DIFERENTE,
  CORCHETE_APERTURA, CORCHETE_CIERRE,
  IDENTIFICADOR, IGUAL, IGUAL_QUE, MAYOR_QUE, MAYOR_IGUAL, MENOR_QUE,
  MENOR_IGUAL, NOT, RESERVADA_CLASS, RESERVADA_STATIC,
  RESERVADA_VOID, RESERVADA_MAIN, RESERVADA_ARGS,
  FUNCION_WRITELINE, RESERVADA_ELSE, RESERVADA_SWITCH,
  RESERVADA_CASE, DOS_PUNTOS, RESERVADA_BREAK,
  RESERVADA_FOR, RESERVADA_WHILE, RESERVADA_DEFAULT,
  FUNCION_GRAFICARVECTOR, NUMERO_ENTERO, NUMERO_DECIMAL,
  ERROR, RESERVADA_IF, COMENTARIO_LINEA, COMENTARIO_BLOQUE,
  RESERVADA_NEW, ULTIMO, VALOR_CHAR, OR_LOGICO, HTML, CONTINUE
}
