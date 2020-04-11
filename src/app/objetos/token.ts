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
            case Tipo.CADENA:
                return 'Cadena';
            case Tipo.COMA:
                return 'Coma';
            case Tipo.CORCHETE_APERTURA:
                return 'Corchete_de_apertura';
            case Tipo.CORCHETE_CIERRE:
                return 'Corchete_de_cierre';
            case Tipo.FALSE:
                return 'Bool_falso';
            case Tipo.GUION_BAJO:
                return 'Guion_bajo';
            case Tipo.LLAVE_APERTURA:
                return 'Llave_de_apertura';
            case Tipo.LLAVE_CIERRE:
                return 'Llave_de_cierre';
            case Tipo.NUMERO:
                return 'Numero';
            case Tipo.PARENTESIS_APERTURA:
                return 'Parentesis_de_apertura';
            case Tipo.PARENTESIS_CIERRE:
                return 'Parentesis_de_cierre';
            case Tipo.PUNTO:
                return 'Punto';
            case Tipo.PUNTO_Y_COMA:
                return 'Punto_y_coma';
            case Tipo.RESERVADA_BOOL:
                return 'bool';
            case Tipo.RESERVADA_CHAR:
                return 'char';
            case Tipo.RESERVADA_DOUBLE:
                return 'double';
            case Tipo.RESERVADA_INT:
                return 'int';
            case Tipo.RESERVADA_STRING:
                return 'string';
            case Tipo.SIGNO_DIVISION:
                return 'Signo_division';
            case Tipo.SIGNO_MAS:
                return 'Signo_suma';
            case Tipo.SIGNO_MENOS:
                return 'Signo_menos';
            case Tipo.SIGNO_MULTIPLICACION:
                return 'Signo de multiplicación';
            case Tipo.TRUE:
                return 'Bool_true';
            case Tipo.IDENTIFICADOR:
                return 'Identificador';
            case Tipo.IGUAL_QUE:
                return 'Signo igual';
            case Tipo.MAYOR_QUE:
                return 'Signo mayor que';
            case Tipo.MENOR_QUE:
                return 'Signo menor que';
            case Tipo.NUMERO_DECIMAL:
                return 'Float';
            case Tipo.NUMERO_ENTERO:
                return 'Numero entero';
            case Tipo.RESERVADA_ARGS:
                return 'Reservada args';
            case Tipo.RESERVADA_BREAK:
                return 'Reservada break';
            case Tipo.RESERVADA_CASE:
                return 'Reservada break';
            case Tipo.RESERVADA_CLASS:
                return 'Reservada class';
            case Tipo.RESERVADA_DEFAULT:
                return 'Reservada default';
            case Tipo.RESERVADA_ELSE:
                return 'Reservada else';
            case Tipo.RESERVADA_FOR:
                return 'Reservada for';
            case Tipo.RESERVADA_MAIN:
                return 'Reservada main';
            case Tipo.RESERVADA_STATIC:
                return 'Reservada static';
            case Tipo.RESERVADA_SWITCH:
                return 'Reservada switch';
            case Tipo.RESERVADA_WHILE:
                return 'Reservada while';
            case Tipo.FUNCION_GRAFICARVECTOR:
                return 'Función graficar vector';
            case Tipo.FUNCION_WRITELINE:
                return 'Función imprimir';
            case Tipo.ERROR:
                return 'ERROR';
            case Tipo.RESERVADA_VOID:
                return 'Reservada void';
            case Tipo.NOT:
                return 'Negacion';
            case Tipo.DOS_PUNTOS:
                return 'Signo dos puntos';
            case Tipo.RESERVADA_IF:
                return 'Reservada if';
            case Tipo.COMENTARIO_LINEA:
                return 'Comentario de linea';
            case Tipo.COMENTARIO_BLOQUE:
                return 'Comentario de bloque';
            case Tipo.RESERVADA_NEW:
                return 'Reservada new';
            case Tipo.ULTIMO:
                return 'Ultimo';
            case Tipo.VALOR_CHAR:
                return 'Char';
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
