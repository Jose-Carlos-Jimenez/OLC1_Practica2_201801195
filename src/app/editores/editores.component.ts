import { Component, ViewChild, ElementRef, AfterViewInit, Input, ɵConsole } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/ace.js';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/mode-csharp';

import { Documento } from '../objetos/documento';
import { Token, Tipo } from '../objetos/token';
import { Error } from '../objetos/error';
import { saveAs } from 'file-saver';

const THEME = 'ace/theme/xcode';
const THEME2 = 'ace/theme/terminal';
const LANG1 = 'ace/mode/csharp';
const LANG2 = 'ace/mode/python';

@Component({
  selector: 'app-editores',
  templateUrl: './editores.component.html',
  styleUrls: ['./editores.component.css']
})
export class EditoresComponent implements AfterViewInit {

  @ViewChild('Receptor', {static: true}) ReceptorRef: ElementRef;
  Receptor: ace.Ace.Editor;

  @ViewChild('Emisor', {static: true}) EmisorRef: ElementRef;
  Emisor: ace.Ace.Editor;

  private editorBeautify;
  @Input() document: Documento;

  fila: number;
  columna: number;
  flujoDeTokens: Array<Token>;
  estado: number;
  auxLex: string;
  errorLexico = false;
  errorSintactico = false;
  exito = false;
  jsonErrorArray: Array<Error>;

  constructor() { }

  /*AREA DE INICIALIZACIÓN DE INTERFAZ */

  ngAfterViewInit(): void {
    ace.require('ace/ext/language_tools');
    this.editorBeautify = ace.require('ace/ext/beautify');
    const emisorElement = this.ReceptorRef.nativeElement;
    const receptorElement = this.EmisorRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.jsonErrorArray = new Array();
    this.Receptor = ace.edit(emisorElement, editorOptions);
    this.Receptor.setTheme(THEME);
    this.Receptor.getSession().setMode(LANG1);
    this.Receptor.setShowFoldWidgets(true);

    this.Emisor = ace.edit(receptorElement, editorOptions);
    this.Emisor.setTheme(THEME2);
    this.Emisor.getSession().setMode(LANG2);
    this.Receptor.setShowFoldWidgets(true);
    this.Receptor.insert(this.document.contenido);
  }
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; }
  {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
        highlightActiveLine: true,
        minLines: 10,
        maxLines: Infinity,
    };

    const extraEditorOptions = {
      enableLiveAutocompletion: true
    };
    const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return margedOptions;
  }
  guardar()
  {
    const blob = new Blob([this.Receptor.getValue()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, this.document.nombre + '.cs');
  }

  /*AREA DE ANALISIS LÉXICO */

  scan(entrada: string)
  {
    entrada += '\n#'; // Añadiendo el simbolo final.
    this.fila = 1;
    this.columna = 0;
    this.flujoDeTokens = new Array();
    this.estado = 0;
    this.auxLex = '';
    this.errorLexico = false;
    this.errorSintactico = false;
    this.jsonErrorArray = new Array();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < entrada.length; i++)
    {
      const c = entrada[i];
      switch (this.estado)
      {
        case 0: // Simbolos directos e inicial
          if (c === ',')
          {
              this.auxLex += c;
              this.agregarToken(Tipo.COMA);
          }
          else if (c === ';')
          {
              this.auxLex += c;
              this.agregarToken(Tipo.PUNTO_Y_COMA);
          }
          else if (c ===  '.')
          {
              this.auxLex += c;
              this.agregarToken(Tipo.PUNTO);
          }
          else if (c === '+')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.SIGNO_MAS);
          }
          else if (c === '-' || c === '–')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.SIGNO_MENOS);
          }
          else if (c === '/')
          {
            this.auxLex += c;
            this.estado = 7;
          }
          else if (c === '*')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.SIGNO_MULTIPLICACION);
          }
          else if (c === '(')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.PARENTESIS_APERTURA);
          }
          else if (c === ')')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.PARENTESIS_CIERRE);
          }
          else if (c === '{')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.LLAVE_APERTURA);
          }
          else if (c === '}')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.LLAVE_CIERRE);
          }
          else if (c === '[')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.CORCHETE_APERTURA);
          }
          else if (c === ']')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.CORCHETE_CIERRE);
          }
          else if (c === '=')
          {
            this.auxLex += c;
            this.estado = 15;
          }
          else if (c === '>')
          {
            this.auxLex += c;
            this.estado = 13;
          }
          else if (c === '<')
          {
            this.auxLex += c;
            this.estado = 14;
          }
          else if (c === '!')
          {
            this.auxLex += c;
            this.estado = 16;
          }
          else if (c === ':')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.DOS_PUNTOS);
          }
          else if (c === '\n')
          {
              this.fila++;
              this.columna = -1;
          }
          else if (c === '\r')
          {

          }
          else if (c === '\t')
          {
              this.columna--;
          }
          else if (c === ' ')
          {
              this.columna--;
          }
          else if (c === '|')
          {
            this.auxLex += c;
            this.estado = 12;
          }
          else if (this.IsNumber(c))// Me enviará al estado para reconocer enteros
          {
            this.estado = 1;
            this.auxLex += c;                    }
          else if (this.IsLetter(c) || c === '_') // Me enviará al estado para reconocer Identificadores y reservadas.
          {
            this.estado = 3;
            this.auxLex += c;
          }
          else if (c === '"' )// Me enviará al estado para reconocer cadenas.
          {
            this.estado = 5;
            this.auxLex += c;
          }
          else if (c === '\'')
          {
            this.estado = 11;
            this.auxLex += c;
          }
          else
          {
              if (c === '#' && i === entrada.length - 1)
              {
                this.auxLex += c;
                this.agregarToken(Tipo.ULTIMO);
                console.log('Se ha concluido el análisis léxico');
              }
              else
              {
                this.auxLex += c;
                this.agregarToken(Tipo.ERROR);
                this.estado = 0;
              }
          }
          break;
        case 1: // Enteros
            if (this.IsNumber(c))
            {
              this.auxLex += c;
            }
            else if (c === '.')
            {
              this.auxLex += c;
              this.estado = 2;
            }
            else// Si no corresponde se envía al estado 0.
            {
              this.agregarToken(Tipo.NUMERO_ENTERO);
              i--;
              this.estado = 0;
            }
            break;
        case 2: // Floats
            if (this.IsNumber(c))
            {
              this.auxLex += c;
            }
            else
            {
              i--;
              this.agregarToken(Tipo.NUMERO_DECIMAL);
            }
            break;
        case 3: // Reservadas
            if (this.IsLetterOrDigit(c) || c === '.' || c === '_')
            {
              this.auxLex += c;
            }
            else if (this.auxLex === 'int')
            {
              this.agregarToken(Tipo.RESERVADA_INT);
              i--;
            }
            else if (this.auxLex === 'double')
            {
              this.agregarToken(Tipo.RESERVADA_DOUBLE);
              i--;
            }
            else if (this.auxLex === 'char')
            {
              this.agregarToken(Tipo.RESERVADA_CHAR);
              i--;
            }
            else if (this.auxLex === 'string' || this.auxLex === 'String')
            {
              this.agregarToken(Tipo.RESERVADA_STRING);
              i--;
            }
            else if (this.auxLex === 'bool')
            {
              this.agregarToken(Tipo.RESERVADA_BOOL);
              i--;
            }
            else if (this.auxLex === 'true')
            {
              this.agregarToken(Tipo.TRUE);
              i--;
            }
            else if (this.auxLex === 'false')
            {
              this.agregarToken(Tipo.FALSE);
              i--;
            }
            else if (this.auxLex === 'class')
            {
              this.agregarToken(Tipo.RESERVADA_CLASS);
              i--;
            }
            else if (this.auxLex === 'static')
            {
              this.agregarToken(Tipo.RESERVADA_STATIC);
              i--;
            }
            else if (this.auxLex === 'void')
            {
              this.agregarToken(Tipo.RESERVADA_VOID);
              i--;
            }
            else if (this.auxLex === 'Main')
            {
              this.agregarToken(Tipo.RESERVADA_MAIN);
              i--;
            }
            else if (this.auxLex === 'do')
            {
              this.agregarToken(Tipo.RESERVADA_DO);
              i--;
            }
            else if (this.auxLex === 'Console.Write')
            {
              this.agregarToken(Tipo.FUNCION_WRITELINE);
              i--;
            }
            else if (this.auxLex === 'if')
            {
              this.agregarToken(Tipo.RESERVADA_IF);
              i--;
            }
            else if (this.auxLex === 'else')
            {
              this.agregarToken(Tipo.RESERVADA_ELSE);
              i--;
            }
            else if (this.auxLex === 'switch')
            {
              this.agregarToken(Tipo.RESERVADA_SWITCH);
              i--;
            }
            else if (this.auxLex === 'case')
            {
              this.agregarToken(Tipo.RESERVADA_CASE);
              i--;
            }
            else if (this.auxLex === 'break')
            {
              this.agregarToken(Tipo.RESERVADA_BREAK);
              i--;
            }
            else if (this.auxLex === 'for')
            {
              this.agregarToken(Tipo.RESERVADA_FOR);
              i--;
            }
            else if (this.auxLex === 'while')
            {
              this.agregarToken(Tipo.RESERVADA_WHILE);
              i--;
            }
            else if (this.auxLex === 'default')
            {
              this.agregarToken(Tipo.RESERVADA_DEFAULT);
              i--;
            }
            else if (this.auxLex === 'new')
            {
              this.agregarToken(Tipo.RESERVADA_NEW);
              i--;
            }
            else if (this.auxLex === 'return')
            {
              this.agregarToken(Tipo.RETURN );
              i--;
            }
            else if (this.auxLex === 'continue' )
            {
              this.agregarToken(Tipo.CONTINUE);
              i--;
            }
            else if (this.IsNumber(c))// Lo envío al estado para reconocer los identificadores.
            {
              this.auxLex += c;
              this.estado = 4;
            }
            else if (this.esId(this.auxLex))
            {
              this.agregarToken(Tipo.IDENTIFICADOR);
              i--;
            }
            else
            {
              this.auxLex += c;
              this.agregarToken(Tipo.ERROR);
            }
            break;
        case 4: // Identificadores
            if (this.IsLetterOrDigit(c))
            {
              this.auxLex += c;
            }
            else if (c === ' ')
            {
              this.agregarToken(Tipo.IDENTIFICADOR);
            }
            else// Si no es letra o digito es un error
            {
              i--;
              this.estado = 0;
            }
            break;
        case 5:
            if (c !== '\"')
            {
              this.auxLex += c;
            }
            else
            {
              this.auxLex += c;
              this.agregarToken(Tipo.CADENA);
            }
            break;
        case 6: // Estado de error
            if (c !== ' ')
            {
              this.auxLex += c;
            }
            else
            {
              this.agregarToken(Tipo.ERROR);
              this.estado = 0;
            }
            break;
        case 7: // COMENTARIOS
            if (c === '/')
            {
              this.auxLex += c;
              this.estado = 8;
            }
            else if (c === '*')
            {
              this.auxLex += c;
              this.estado = 9;
            }
            else
            {
              this.agregarToken(Tipo.SIGNO_DIVISION);
              i--;
            }
            break;
        case 8: // COMENTARIOS DE LINEA
            if (c !== '\n')
            {
              this.auxLex += c;
            }
            else
            {
              this.agregarToken(Tipo.COMENTARIO_LINEA);
              this.columna = -1;
              this.fila++;
            }
            break;
        case 9: // COMENTARIO DE BLOQUE
            if (c !== '\t' && c !== '\n')
            {
              this.auxLex += c;
            }
            else
            {

            }
            if (c === '*')
            {
              this.estado = 10;
            }
            else if (c === '\n')
            {
              this.columna = -1;
              this.fila++;
            }
            else if (c === '#' && i === entrada.length - 1)
            {
              this.agregarToken(Tipo.ERROR);
              console.log('Se ha concluido el análisis léxico');
            }
            break;
        case 10:
            if (c !== '\t' && c !== '\t')
            {
              this.auxLex += c;
            }
            if (c === '/')
            {
              this.agregarToken(Tipo.COMENTARIO_BLOQUE);
            }
            else
            {
              this.estado = 9;
            }
            break;
        case 11:
          if ( c === '\'' && this.auxLex.length > 2 )
          {
            this.auxLex += c;
            this.agregarToken(Tipo.HTML);
          }
          else if (c === '\'' && this.auxLex.length === 2 )
          {
            this.auxLex += c;
            this.agregarToken(Tipo.VALOR_CHAR);
          }
          else
          {
            this.auxLex += c;
          }
          break;
        case 12:
          if (c === '|')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.OR_LOGICO);
          }
          else
          {
            i--;
            this.estado = 0;
          }
          break;
        case 13:
          if (c === '=')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.MAYOR_IGUAL);
          }
          else
          {
            i--;
            this.agregarToken(Tipo.MAYOR_QUE);
          }
          break;
        case 14:
          if (c === '=')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.MENOR_IGUAL);
          }
          else
          {
            i--;
            this.agregarToken(Tipo.MENOR_QUE);
          }
          break;
        case 15:
          if (c === '=')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.IGUAL_QUE);
          }
          else
          {
            i--;
            this.agregarToken(Tipo.IGUAL);
          }
          break;
        case 16:
          if (c === '=')
          {
            this.auxLex += c;
            this.agregarToken(Tipo.DIFERENTE);
          }
          else
          {
            this.auxLex += c;
            this.agregarToken(Tipo.ERROR);
          }
          break;
        default:
            break;
      }
      this.columna++;
    }
  }
  agregarToken(tipo: Tipo)
  {
    if (tipo === Tipo.IDENTIFICADOR)
    {
      console.log('Variable: ' + this.auxLex + ' en la fila ' + this.fila );
    }

    if (tipo === Tipo.ERROR)
    {
      const nuevo = new Token(tipo, this.auxLex, this.fila, this.columna, 'Error léxico en la fila ' + this.fila, true);
      this.flujoDeTokens.push(nuevo);
      this.errorLexico = true;
      this.errorSintactico = true;
      this.jsonErrorArray.push(new Error('Error ' + this.auxLex + ' en columna ' + this.columna, this.fila - 1, this.columna));
    }
    else
    {
      const nuevo = new Token(tipo, this.auxLex, this.fila, this.columna, '', false);
      this.flujoDeTokens.push(nuevo);
    }
    this.auxLex = '';
    this.estado = 0;
  }
  esId(cadena): boolean
  {
      let es = true;
      for (let i = 0; i < cadena.Length; i++)
      {
          if (this.IsLetterOrDigit(cadena[i]) || cadena[i] === '_')
          {
          }
          else
          {
              es = false;
          }
      }
      return es;
  }
  IsLetter(c) {
    return c.toLowerCase() !== c.toUpperCase();
  }
  IsLetterOrDigit(c)
  {
    return this.IsLetter(c) || this.IsNumber(c);
  }
  IsNumber(c)
  {
    return c.match(/[0-9]/i);
  }

  /* ÁREA DE FLUJO GENERAL DEL ANÁLISIS */
  analisis()
  {
    this.errorLexico = false;
    this.scan(this.Receptor.getValue());
    console.log(this.flujoDeTokens);
    this.exito = this.mensajeDefin();
    this.Receptor.getSession().setAnnotations(this.jsonErrorArray);
  }
  mensajeDefin()
  {
    if (!this.errorSintactico && !this.errorLexico && this.flujoDeTokens != null)
    {
      return true;
    }
    return false;
  }
}
