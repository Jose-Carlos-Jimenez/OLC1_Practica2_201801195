import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/ace.js';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-json';

import { Documento } from '../objetos/documento';
import { Token, Tipo } from '../objetos/token';
import { Variable } from '../objetos/variable';
import { Error } from '../objetos/error';
import { saveAs } from 'file-saver';
import { stringify } from 'querystring';

const THEME = 'ace/theme/xcode';
const THEME2 = 'ace/theme/terminal';
const LANG1 = 'ace/mode/csharp';
const LANG2 = 'ace/mode/python';
const LANG3 = 'ace/mode/html';
const LANG4 = 'ace/mode/json';

@Component({
  selector: 'app-editores',
  templateUrl: './editores.component.html',
  styleUrls: ['./editores.component.css']
})
export class EditoresComponent implements AfterViewInit {

  @ViewChild('tabGroup') tabGroup;

  @ViewChild('Receptor', {static: true}) ReceptorRef: ElementRef;
  Receptor: ace.Ace.Editor;

  @ViewChild('Emisor', {static: true}) EmisorRef: ElementRef;
  Emisor: ace.Ace.Editor;

  @ViewChild('HtmlEditor', {static: true}) HtmlRef: ElementRef;
  HtmlEditor: ace.Ace.Editor;

  @ViewChild('JsonEditor', {static: true}) JsonRef: ElementRef;
  JsonEditor: ace.Ace.Editor;

  private editorBeautify;
  @Input() document: Documento;

  fila: number;
  columna: number;
  flujoDeTokens: Array<Token>;
  estado: number;
  auxLex: string;
  errorLexico = false;
  errorSintactico = false;
  sintacticoFlag = false;
  exito = false;
  tipo: string;
  jsonErrorArray: Array<Error>;
  variables: Array<Variable>;
  identificadores: Array<string>;
  expresion: string;
  html: string;
  python: string;
  actual: Token;
  tabsCount: number;
  identacion: string;
  numeroToken: number;
  caseValue: string;
  varFor: string;
  valorInicialFor: string;
  valorFinalFor: string;
  decrementoFor: string;
  repeticion: boolean;

  constructor() { }

  /*AREA DE INICIALIZACIÓN DE INTERFAZ */

  ngAfterViewInit(): void {
    this.jsonErrorArray = new Array();

    ace.require('ace/ext/language_tools');
    this.editorBeautify = ace.require('ace/ext/beautify');

    const emisorElement = this.ReceptorRef.nativeElement;
    const receptorElement = this.EmisorRef.nativeElement;
    const htmlElement = this.HtmlRef.nativeElement;
    const jsonElement = this.JsonRef.nativeElement;

    const editorOptions = this.getEditorOptions();

    this.Receptor = ace.edit(emisorElement, editorOptions);
    this.Receptor.setTheme(THEME);
    this.Receptor.getSession().setMode(LANG1);
    this.Receptor.setShowFoldWidgets(true);
    this.Receptor.insert(this.document.contenido);

    this.Emisor = ace.edit(receptorElement, editorOptions);
    this.Emisor.setTheme(THEME2);
    this.Emisor.getSession().setMode(LANG2);
    this.Emisor.setShowFoldWidgets(true);
    this.Emisor.setOptions({readOnly: true});

    this.HtmlEditor = ace.edit(htmlElement, editorOptions);
    this.HtmlEditor.setTheme(THEME);
    this.HtmlEditor.getSession().setMode(LANG3);
    this.HtmlEditor.setShowFoldWidgets(true);
    this.HtmlEditor.setOptions({readOnly: true});

    this.JsonEditor = ace.edit(jsonElement, editorOptions);
    this.JsonEditor.setTheme(THEME2);
    this.JsonEditor.getSession().setMode(LANG4);
    this.JsonEditor.setShowFoldWidgets(true);
    this.JsonEditor.setOptions({readOnly: true});

  }
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; }
  {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
        highlightActiveLine: true,
        minLines: 18,
        maxLines: 18,
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

  guardarHtml()
  {
    const blob = new Blob([this.HtmlEditor.getValue()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'doc.html');
  }

  guardarJson()
  {
    const blob = new Blob([this.JsonEditor.getValue()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'doc.json');
  }

  guardarPython()
  {
    const blob = new Blob([this.Emisor.getValue()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'doc.py');
  }

  errores()
  {
    if (this.errorLexico || this.errorSintactico)
    {
      let html: string;
      let contador = 1;
      html = '<html>\n<head>\n<title>ERRORES</title>\n</head>\n<body style="background-image: url(ImagenesProyecto/fondodePantalla.jpg)">' +
            '\n<Table border=1 width=100% >\n<Tr bgcolor = blue; style=font-family:verdana>' +
            '<Td>#</Td> <Td>TIPO</Td> <Td>DESCRIPCIÓN</Td> <Td>FILA</Td> <Td>COLUMNA</Td> </Tr>\n';

      this.jsonErrorArray.forEach( token => {
        html = html + '<Tr><Td>' + contador +
        '</Td><Td>' + token.type + '</Td><Td>' + token.text +
        '</Td><Td>' + token.row + '</Td><Td>' + token.column + '</Td>\n';
        contador++;
      });
      html += '</Table>\n</body>\n</html>';
      const blob = new Blob([html], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'errores.html');
    }
  }

  tokens()
  {
    let html: string;
    let contador = 1;
    html = '<html>\n<head>\n<title>ERRORES</title>\n</head>\n<body>' +
          '\n<Table border=1 width=100% >\n<Tr bgcolor = blue; style=font-family:verdana>' +
          '<Td>#</Td> <Td>LEXEMA</Td><Td>TIPO</Td> <Td>FILA</Td> <Td>COLUMNA</Td> </Tr>\n';

    this.flujoDeTokens.forEach( token => {
      html = html + '<Tr><Td>' + contador +
      '</Td><Td>' + token.lexema + '</Td><Td>' + token.GetTipoString() + '</Td><Td>' +
      token.fila +
      '</Td><Td>' + token.columna + '</Td>\n';
      contador++;
    });
    html += '</Table>\n</body>\n</html>';
    const blob = new Blob([html], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'tokens.html');
  }

  /*AREA DE ANALISIS LÉXICO */

  scan(entrada: string)
  {
    this.html = '';
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
          else if ( c === '&')
          {
            this.auxLex += c;
            this.estado = 17;
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
            i--;
            this.agregarToken(Tipo.NOT);
          }
          break;
        case 17:
          this.auxLex += c;
          if (c === '&')
          {
            this.agregarToken(Tipo.AND);
          }
          else
          {
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
      // console.log('Variable: ' + this.auxLex + ' en la fila ' + this.fila );
    }

    if (tipo === Tipo.ERROR)
    {
      const nuevo = new Token(tipo, this.auxLex, this.fila, this.columna, 'Error léxico en la fila ' + this.fila, true);
      this.flujoDeTokens.push(nuevo);
      this.errorLexico = true;
      this.jsonErrorArray.push(new Error('ERROR: Caracter desconocido ->' + this.auxLex +
      '<- en fila ' + this.fila, this.fila - 1, this.columna, 1));
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
    console.clear();
    this.errorLexico = false;
    this.errorSintactico = false;
    this.sintacticoFlag = false;
    this.python = '';
    this.identacion = '';
    this.tabsCount = -1;
    this.scan(this.Receptor.getValue());
    this.obtenerVariables();
    this.getHTML();
    this.parse();
    this.exito = this.mensajeDefin();
    this.Receptor.getSession().setAnnotations(this.jsonErrorArray);
  }

  /* CONTROLADORES DE ETIQUETAS HTML */

  mensajeDefin()
  {
    if (!this.errorSintactico && !this.errorLexico && this.flujoDeTokens != null)
    {
      return true;
    }
    return false;
  }
  /* OBTENER VARIABLES EN EL ARCHIVO DE ENTRADA */
  obtenerVariables()
  {
    this.variables = new Array();
    let tipo: Token;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.flujoDeTokens.length; i++)
    {
      const tok: Token = this.flujoDeTokens[i];
      if (tok.Tipo === Tipo.IDENTIFICADOR)
      {
        const anterior = this.flujoDeTokens[i - 1];
        const siguiente = this.flujoDeTokens[i + 1];
        if ((anterior.Tipo === Tipo.RESERVADA_DOUBLE || anterior.Tipo === Tipo.RESERVADA_INT ||
        anterior.Tipo === Tipo.RESERVADA_STRING || anterior.Tipo === Tipo.RESERVADA_CHAR ||
        anterior.Tipo === Tipo.RESERVADA_BOOL || anterior.Tipo === Tipo.IDENTIFICADOR
        ) && siguiente.Tipo === Tipo.IGUAL)
        {
          tipo = anterior;
          this.variables.push(new Variable(tok.lexema, tok.fila, tipo.GetTipoString()));
        }
        else if ((anterior.Tipo === Tipo.RESERVADA_DOUBLE || anterior.Tipo === Tipo.RESERVADA_INT ||
        anterior.Tipo === Tipo.RESERVADA_STRING || anterior.Tipo === Tipo.RESERVADA_CHAR ||
        anterior.Tipo === Tipo.RESERVADA_BOOL) && siguiente.Tipo === Tipo.PUNTO_Y_COMA)
        {
          tipo = anterior;
          this.variables.push(new Variable(tok.lexema, tok.fila, tipo.GetTipoString()));
        }
        else if ((anterior.Tipo === Tipo.RESERVADA_DOUBLE || anterior.Tipo === Tipo.RESERVADA_INT ||
        anterior.Tipo === Tipo.RESERVADA_STRING || anterior.Tipo === Tipo.RESERVADA_CHAR ||
        anterior.Tipo === Tipo.RESERVADA_BOOL) && siguiente.Tipo === Tipo.COMA)
        {
          tipo = anterior;
          this.variables.push(new Variable(tok.lexema, tok.fila, tipo.GetTipoString()));
        }
        else if ((anterior.Tipo === Tipo.RESERVADA_DOUBLE || anterior.Tipo === Tipo.RESERVADA_INT ||
        anterior.Tipo === Tipo.RESERVADA_STRING || anterior.Tipo === Tipo.RESERVADA_CHAR ||
        anterior.Tipo === Tipo.RESERVADA_BOOL) && siguiente.Tipo === Tipo.PARENTESIS_CIERRE)
        {
          tipo = anterior;
          this.variables.push(new Variable(tok.lexema, tok.fila, tipo.GetTipoString()));
        }
        else if ( anterior.Tipo === Tipo.COMA && siguiente.Tipo === Tipo.COMA)
        {
          this.variables.push(new Variable(tok.lexema, tok.fila, tipo.GetTipoString()));
        }
        else if ( anterior.Tipo === Tipo.COMA && siguiente.Tipo === Tipo.PUNTO_Y_COMA)
        {
          this.variables.push(new Variable(tok.lexema, tok.fila, tipo.GetTipoString()));
        }
        else if ( anterior.Tipo === Tipo.COMA && siguiente.Tipo === Tipo.PARENTESIS_CIERRE)
        {
          this.variables.push(new Variable(tok.lexema, tok.fila, tipo.GetTipoString()));
        }
      }
    }
    // console.log(this.variables);
  }

  /* OBTENIENDO EL CÓDIGO HTML */

  getHTML()
  {
    // let htmlText = '<!DOCTYPE html>';
    let htmlText = '';
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.flujoDeTokens.length; i++)
    {
      const tok = this.flujoDeTokens[i];
      if (tok.Tipo === Tipo.HTML)
      {
        htmlText += tok.lexema.replace(/\'/g, '');
        htmlText += '\n';
      }
    }
    this.HtmlEditor.setValue(htmlText);
    this.editorBeautify.beautify(this.HtmlEditor.session );
    this.getJson(htmlText);
  }

  /* IDENTACIÓN */
  aumentarIdentacion()
  {
    ++this.tabsCount;
    this.identacion = '';
    for (let i = 0; i < this.tabsCount ; i++)
    {
      this.identacion += '\t';
    }
  }

  disminuirIdentacion()
  {
    --this.tabsCount;
    this.identacion = '';
    for (let i = 0; i < this.tabsCount ; i++)
    {
      this.identacion += '\t';
    }
  }

  getJson(html: string)
  {
    const htmlInput = html.replace(/\n/g, '').replace(/\r/g, '').replace(/<br>/g, '\n').replace(/<input>/g, '');
    let json = '{';
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < htmlInput.length; index++) {
      // tslint:disable-next-line: no-shadowed-variable
      let element = htmlInput[index].toUpperCase();

      if (element === '<' && htmlInput[index + 1] !== '/')
      {
        let hasStyle = false;
        json += '"';
        index++;
        element = htmlInput[index];
        while (element !== '>')
        {
          if (!hasStyle)
          {
            if (element !== 's')
            {
              json += element;
              index++;
              element = htmlInput[index];
            }
            else
            {
              hasStyle = true;
            }
          }
          else
          {
            let aux = '';
            while (element !== '>')
            {
              aux += element;
              index++;
              element = htmlInput[index];
            }
            const aux2 = aux.replace(/style=/gi, '"STYLE":');
            json += '":\n{\n';
            json += aux2 + ',\n';
          }
        }
        if (hasStyle)
        {

        }
        else
        {
          json += '":\n{';
        }
      }
      else if (element === '<' && htmlInput[index + 1] === '/')
      {
        json += '}';
        index++;
        element = htmlInput[index];
        while (element !== '>')
        {
          index++;
          element = htmlInput[index];
        }
        if (index + 2 < htmlInput.length && htmlInput[index + 1] === '<' && htmlInput[index + 2] !== '/')
        {
          json += ',';
        }
        json += '\n';
      }
      else if (htmlInput[index - 1] === '>' && element !== '<' && element !== ' '
      && element !== '\n' && element !== '\t')
      {
        json += '\n"TEXT": "';
        while (element !== '<')
        {
          if (element !== '\n' && element !== '\r' && element !== '\t')
          {
            json += element;
          }
          index++;
          element  = htmlInput[index];
        }
        json += '"\n},\n';
      }
    }
    json += '}\n';
    let jsonaux = '';
    for (let index = 0; index < json.length; index++) {
      // tslint:disable-next-line: no-shadowed-variable
      const element = json[index];
      if (element === ',' && json[index + 1] === '\n' && json[index + 2] === '}')
      {
      }
      else
      {
        jsonaux += element;
      }
    }
    this.JsonEditor.setValue(jsonaux);
    this.editorBeautify.beautify(this.JsonEditor.session);
  }

  /* AREA DE ANÁLISIS SINTÁCTICO */

  /* MÉTODO PARA INICIALIZAR ANALISIS SINTACTICO */
  parse()
  {
      this.numeroToken = 0;
      this.actual = this.flujoDeTokens[this.numeroToken];
      this.INICIO(); // Simbolo inicial de la gramática
      this.Emisor.setValue(this.python);
      console.log(this.flujoDeTokens);
      // this.editorBeautify.beautify(this.Emisor.session);
  }

  /* MÉTODO PARA VERIFICAR QUE SEA EL TOKEN ESPERADO */
  match(tipo: Tipo)
  {
    /* SALTANDO COMENTARIOS */
    if (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE || this.actual.Tipo === Tipo.COMENTARIO_LINEA)
    {
      while (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE || this.actual.Tipo === Tipo.COMENTARIO_LINEA)
      {
        if (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE)
        {
          let auxString;
          auxString = this.actual.lexema.replace(/\/\*/, '\'\'\'');
          auxString = auxString.replace(/\*\//, '\'\'\'');
          console.log(auxString);
          this.python += '\n' + this.identacion;
          this.python += auxString;
          this.python += '\n';
        }
        else
        {
          let auxString;
          auxString = this.actual.lexema.replace(/\/\//, '#');
          console.log(auxString);
          this.python += '\n' + this.identacion + auxString;
        }
        this.numeroToken++;
        this.actual = this.flujoDeTokens[this.numeroToken];
      }
    }
    /* VERIFICANDO EL TIPO DE TOKEN Y AVANZANDO */
    if (this.sintacticoFlag) {
      if (this.actual.GetTipoString() !== 'End of') {
        const tip = this.actual.Tipo;
        if (tipo === tip) {
          this.sintacticoFlag = false;
          this.numeroToken++;
          this.actual = this.flujoDeTokens[this.numeroToken];
        }
      }
    }
    else
    {
      if (this.actual.Tipo !== Tipo.ULTIMO )
      {
        if (this.actual.Tipo !== tipo)
        {
          const aux = new Token(tipo, '', 0, 0, 'auxiliar', false);
          aux.Tipo = tipo;
          /* CREANDO MARCADOR PARA EL ERROR EN EL EDITOR DE TEXTO */
          this.jsonErrorArray.push(new Error( 'Se esperaba [' + aux.GetTipoString() +
          '] y se obtuvo [' + this.actual.GetTipoString() + ']' , this.actual.fila - 1, this.columna, 2));

          /* MARCANDO EL ERROR */

          console.log('ERROR: se obtuvo >>' + this.actual.GetTipoString()
          + '<< y se esperaba >>' + aux.GetTipoString() + '<< en la linea ' + this.actual.fila
          + ' y la columna ' + this.actual.columna);
          this.sintacticoFlag = true;
          this.errorSintactico = true;

          /* AVANZO HASTA UN CARACTER DE EMPAREJAMIENTO */
          let tip: Tipo = this.actual.Tipo;
          while (tip !== Tipo.LLAVE_CIERRE && tip !== Tipo.LLAVE_APERTURA && tip !== Tipo.PUNTO_Y_COMA)
          {
            this.numeroToken++;
            this.actual = this.flujoDeTokens[this.numeroToken];
            tip = this.actual.Tipo;
          }
        }
        else
        {
          this.numeroToken++;
          this.actual = this.flujoDeTokens[this.numeroToken];
          if (Tipo.LLAVE_APERTURA === tipo)
          {
            this.aumentarIdentacion();
          }
          else if (Tipo.LLAVE_CIERRE === tipo)
          {
            this.disminuirIdentacion();
          }
        }
      }
    }
    if (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE || this.actual.Tipo === Tipo.COMENTARIO_LINEA)
    {
      while (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE || this.actual.Tipo === Tipo.COMENTARIO_LINEA)
      {
        if (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE)
        {
          let auxString;
          auxString = this.actual.lexema.replace(/\/\*/, '\'\'\'');
          auxString = auxString.replace(/\*\//, '\'\'\'');
          console.log(auxString);
          this.python += '\n' + this.identacion;
          this.python += auxString;
          this.python += '\n';
        }
        else
        {
          let auxString;
          auxString = this.actual.lexema.replace(/\/\//, '#');
          console.log(auxString);
          this.python += '\n' + this.identacion + auxString;
        }
        this.numeroToken++;
        this.actual = this.flujoDeTokens[this.numeroToken];
      }
    }
  }

  /* MÉTODO PARA VERIFICAR SI ES UN TIPO */
  esTipo(): boolean
  {
    const tipo = this.actual.Tipo;
    const reservadas  = [Tipo.RESERVADA_BOOL, Tipo.RESERVADA_CHAR, Tipo.RESERVADA_DOUBLE, Tipo.RESERVADA_INT,
    Tipo.RESERVADA_STRING];
    return reservadas.includes(tipo, 0);
  }

  /* MÉTODO PARA SABER SI ES UN RELACIONAL */
  esRelacional()
  {
    const b = this.actual.Tipo;
    return b === Tipo.IGUAL_QUE || b === Tipo.DIFERENTE || b === Tipo.MAYOR_QUE
    || b === Tipo.MENOR_QUE || b === Tipo.MAYOR_IGUAL || b === Tipo.MENOR_IGUAL;
  }

  INICIO()
  {
    this.match(Tipo.RESERVADA_CLASS);
    this.match(Tipo.IDENTIFICADOR);
    this.match(Tipo.LLAVE_APERTURA);
    this.INST_GENERALES();
    this.match(Tipo.LLAVE_CIERRE);
    this.python += '\n';
  }

  INST_GENERALES()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_VOID)
    {
      this.match(Tipo.RESERVADA_VOID);
      this.METODO();
      this.INST_GENERALES();
    }
    else if (this.esTipo())
    {
      this.TIPO();
      this.identificadores = new Array<string>();
      this.identificadores.push(this.actual.lexema);
      this.match(Tipo.IDENTIFICADOR);
      this.INST_GENERALES_P();
      this.INST_GENERALES();
    }
    else
    {

    }
  }

  INST_GENERALES_P()
  {
    if (this.actual.Tipo === Tipo.PARENTESIS_APERTURA)
    {

      this.python += 'def ' + this.identificadores[0] + this.actual.lexema;
      this.match(Tipo.PARENTESIS_APERTURA);
      this.PARAMETROS();
      this.python += this.actual.lexema + ':';
      this.match(Tipo.PARENTESIS_CIERRE);
      this.match(Tipo.LLAVE_APERTURA);
      this.python += '\n';
      this.INST_FUNCIONES();
      this.match(Tipo.LLAVE_CIERRE);
      this.python += '\n';
      this.INST_GENERALES();
    }
    else
    {
      this.DECLARACION();
      this.INST_GENERALES();
    }

  }

  INSTRUCCIONES()
  {
    if (this.esTipo())
    {
      this.TIPO();
      this.identificadores = new Array<string>();
      this.identificadores.push(this.actual.lexema);
      this.match(Tipo.IDENTIFICADOR);
      this.DECLARACION();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_FOR)
    {
      this.python += this.identacion + 'for';
      this.match(Tipo.RESERVADA_FOR);
      this.FOR();
      this.INST_REP();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_IF)
    {
      this.python += this.identacion + this.actual.lexema;
      this.match(Tipo.RESERVADA_IF);
      this.IF();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_SWITCH)
    {
      this.match(Tipo.RESERVADA_SWITCH);
      this.python += this.identacion + 'def switch ';
      this.SWITCH();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_WHILE)
    {
      this.python += this.identacion + this.actual.lexema + ' ';
      this.match(Tipo.RESERVADA_WHILE);
      this.WHILE();
      this.INST_REP();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_DO)
    {
      this.match(Tipo.RESERVADA_DO);
      this.python += this.identacion + 'while True:';
      this.DO_WHILE();
      this.INST_REP();
    }
    else if (this.actual.Tipo === Tipo.FUNCION_WRITELINE)
    {
      this.match(Tipo.FUNCION_WRITELINE);
      this.python += this.identacion + 'print(';
      this.IMPRIMIR();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.IDENTIFICADOR)
    {
      this.python += this.identacion + this.actual.lexema;
      this.match(Tipo.IDENTIFICADOR);
      this.ASIGNACION();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RETURN)
    {
      this.match(Tipo.RETURN);
      if (this.actual.GetTipoString() !== 'Punto y coma')
      {
        this.EXPRESION(); // Expresion
      }
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
      this.INSTRUCCIONES();
    }
    else
    {
      return;
    }
  }

  DECLARACION()
  {
    if (this.actual.Tipo === Tipo.COMA)
    {
      this.match(Tipo.COMA);
      this.identificadores.push(this.actual.lexema);
      this.match(Tipo.IDENTIFICADOR);
      this.DECLARACION_P();
    }
    else if (this.actual.Tipo === Tipo.PUNTO_Y_COMA)
    {
      this.identificadores.forEach(element => {
        this.python += this.identacion + element + ' = ' + this.tipo + '\n';
      });
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
    else
    {
      this.match(Tipo.IGUAL);
      this.expresion = '';
      this.EXPRESION();
      this.identificadores.forEach(element => {
        this.python += this.identacion + element + ' = ' + this.expresion;
      });
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
  }

  INST_FUNCIONES()
  {
    if (this.actual.Tipo === Tipo.RETURN)
    {
      this.python += this.identacion + this.actual.lexema + ' ';
      this.match(Tipo.RETURN);
      this.expresion = '';
      this.EXPRESION();
      this.python += this.expresion;
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
    else
    {
      this.INSTRUCCIONES();
    }
  }

  DECLARACION_P()
  {
    if (this.actual.Tipo === Tipo.COMA)
    {
      this.match(Tipo.COMA);
      this.identificadores.push(this.actual.lexema);
      this.match(Tipo.IDENTIFICADOR);
      this.DECLARACION_P();
    }
    else if ( this.actual.Tipo === Tipo.IGUAL)
    {
      this.match(Tipo.IGUAL);
      this.expresion = '';
      this.EXPRESION();
      this.identificadores.forEach(element => {
        this.python += this.identacion + element + ' = ' + this.expresion + '\n';
      });
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
    else
    {
      this.match(Tipo.PUNTO_Y_COMA);
      this.identificadores.forEach(element => {
        this.python += this.identacion + element + ' = ' + this.tipo + '\n' ;
      });
      this.python += '\n';
    }
  }

  CONDICION()
  {
    if (this.actual.Tipo === Tipo.NOT)
    {
      this.python += 'not ';
      this.match(Tipo.NOT);
      this.expresion = '';
      this.EXPRESION();
      this.python += this.expresion;
      this.CONDICION_P();
      this.CONDICION_PLUS();
    }
    else if (this.actual.Tipo === Tipo.TRUE)
    {
      this.python += 'True';
      this.match(Tipo.TRUE);
      this.CONDICION_P();
      this.CONDICION_PLUS();
    }
    else if (this.actual.Tipo === Tipo.FALSE)
    {
      this.python += 'False';
      this.match(Tipo.FALSE);
      this.CONDICION_P();
      this.CONDICION_PLUS();
    }
    else
    {
      this.expresion = '';
      this.EXPRESION();
      this.python += this.expresion;
      this.CONDICION_P();
      this.CONDICION_PLUS();
    }
  }

  CONDICION_P()
  {
    if (this.esRelacional())
    {
      this.COMPARADOR();
      this.EXPRESION();
    }
    else
    {
      // EPSILON
    }
  }

  COMPARADOR()
  {
    if (this.actual.Tipo === Tipo.IGUAL_QUE)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.IGUAL_QUE);
    }
    else if (this.actual.Tipo === Tipo.DIFERENTE)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.DIFERENTE);
    }
    else if (this.actual.Tipo === Tipo.MAYOR_QUE)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.MAYOR_QUE);
    }
    else if (this.actual.Tipo === Tipo.MENOR_QUE)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.MENOR_QUE);
    }
    else if (this.actual.Tipo === Tipo.MAYOR_IGUAL)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.MAYOR_IGUAL);
    }
    else
    {
      this.python += this.actual.lexema;
      this.match(Tipo.MENOR_IGUAL);
    }
  }

  CONDICION_PLUS()
  {
    if (this.actual.Tipo === Tipo.AND)
    {
      this.python += ' and ';
      this.match(Tipo.AND);
      this.CONDICION();
    }
    else if ( this.actual.Tipo === Tipo.OR_LOGICO)
    {
      this.python += ' or ';
      this.match(Tipo.OR_LOGICO);
      this.CONDICION();
    }
    else
    {
      // EPSILON
    }
  }

  TIPO()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_INT)
    {
      this.match(Tipo.RESERVADA_INT);
      this.tipo = '0';
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_BOOL)
    {
      this.match(Tipo.RESERVADA_BOOL);
      this.tipo = 'true';
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_STRING)
    {
      this.match(Tipo.RESERVADA_STRING);
      this.tipo = '\'\'';
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_CHAR)
    {
      this.match(Tipo.RESERVADA_CHAR);
      this.tipo = '\'\'';
    }
    else
    {
      this.match(Tipo.RESERVADA_DOUBLE);
      this.tipo = '0.0';
    }
  }

  VALOR()
  {
    this.caseValue = '';
    this.caseValue = this.actual.lexema;
    if (this.actual.Tipo === Tipo.VALOR_CHAR)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.VALOR_CHAR);
    }
    else if (this.actual.Tipo === Tipo.TRUE)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.TRUE);
    }
    else if (this.actual.Tipo === Tipo.FALSE)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.FALSE);
    }
    else if (this.actual.Tipo === Tipo.CADENA)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.CADENA);
    }
    else if (this.actual.Tipo === Tipo.NUMERO_ENTERO)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.NUMERO_ENTERO);
    }
    else
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.NUMERO_DECIMAL);
    }
  }

  ASIGNACION()
  {
    if (this.actual.Tipo === Tipo.IGUAL)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.IGUAL);
      this.expresion = '';
      this.EXPRESION();
      this.python += this.expresion;
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
    else if (this.actual.Tipo === Tipo.SIGNO_MAS)
    {
      this.python += '++\n';
      this.match(Tipo.SIGNO_MAS);
      this.match(Tipo.SIGNO_MAS);
      this.match(Tipo.PUNTO_Y_COMA);
    }
    else if (this.actual.Tipo === Tipo.SIGNO_MENOS)
    {
      this.python += '--\n';
      this.match(Tipo.SIGNO_MENOS);
      this.match(Tipo.SIGNO_MENOS);
      this.match(Tipo.PUNTO_Y_COMA);
    }
    else if (this.actual.Tipo === Tipo.PARENTESIS_APERTURA)
    {
      this.expresion = '';
      this.FUNC();
      this.python += this.expresion;
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
    else
    {
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
      // EPSILON
    }
  }

  EXPRESION()
  {
    if (this.actual.Tipo === Tipo.NOT)
    {
      this.expresion += 'not ';
      this.match(Tipo.NOT);
      this.TERMINOS();
      this.EXPRESION_P();
    }
    else
    {
      this.TERMINOS();
      this.EXPRESION_P();
    }
  }

  EXPRESION_P()
  {
    if (this.actual.Tipo === Tipo.SIGNO_MENOS)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.SIGNO_MENOS);
      this.TERMINOS();
      this.EXPRESION_P();
    }
    else if (this.actual.Tipo === Tipo.SIGNO_MAS)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.SIGNO_MAS);
      this.TERMINOS();
      this.EXPRESION_P();
    }
    else
    {
      // EPSILON
    }
  }

  TERMINOS()
  {
    this.FACTORES();
    this.TERMINOS_P();
  }

  TERMINOS_P()
  {
    if (this.actual.Tipo === Tipo.SIGNO_MULTIPLICACION)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.SIGNO_MULTIPLICACION);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.SIGNO_DIVISION)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.SIGNO_DIVISION);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.AND)
    {
      this.expresion += ' and ';
      this.match(Tipo.AND);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.OR_LOGICO)
    {
      this.expresion += ' or ';
      this.match(Tipo.OR_LOGICO);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.IGUAL_QUE)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.IGUAL_QUE);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.MAYOR_QUE)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.MAYOR_QUE);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.MENOR_QUE)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.MENOR_QUE);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.MAYOR_IGUAL)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.MAYOR_IGUAL);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.MENOR_IGUAL)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.MENOR_IGUAL);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.DIFERENTE)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.DIFERENTE);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else
    {
      // EPSILON
    }

  }

  FACTORES()
  {
    if (this.actual.Tipo === Tipo.PARENTESIS_APERTURA)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.PARENTESIS_APERTURA);
      this.EXPRESION();
      this.expresion += this.actual.lexema;
      this.match(Tipo.PARENTESIS_CIERRE);
    }
    else if (this.actual.Tipo === Tipo.IDENTIFICADOR)
    {
      this.expresion += this.actual.lexema;
      this.valorFinalFor = this.actual.lexema;
      this.match(Tipo.IDENTIFICADOR);
      this.FUNC();
    }
    else if (this.actual.Tipo === Tipo.NOT)
    {
      this.expresion += 'not ';
      this.match(Tipo.NOT);
      this.EXPRESION();
    }
    else if (this.actual.Tipo === Tipo.CADENA)
    {
      this.expresion += this.actual.lexema;
      this.valorFinalFor = this.actual.lexema;
      this.match(Tipo.CADENA);
    }
    else if (this.actual.Tipo === Tipo.TRUE)
    {
      this.expresion += 'True';
      this.valorFinalFor = this.actual.lexema;
      this.match(Tipo.TRUE);
    }
    else if (this.actual.Tipo === Tipo.FALSE)
    {
      this.expresion += 'False';
      this.valorFinalFor = this.actual.lexema;
      this.match(Tipo.FALSE);
    }
    else if (this.actual.Tipo === Tipo.VALOR_CHAR)
    {
      this.expresion += this.actual.lexema;
      this.valorFinalFor = this.actual.lexema;
      this.match(Tipo.VALOR_CHAR);
    }
    else if (this.actual.Tipo === Tipo.NUMERO_ENTERO)
    {
      this.expresion += this.actual.lexema;
      this.valorFinalFor = this.actual.lexema;
      this.match(Tipo.NUMERO_ENTERO);
    }
    else
    {
      this.expresion += this.actual.lexema;
      this.valorFinalFor = this.actual.lexema;
      this.match(Tipo.NUMERO_DECIMAL);
    }
  }

  FUNC()
  {
    if (this.actual.Tipo === Tipo.PARENTESIS_APERTURA)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.PARENTESIS_APERTURA);
      this.SENDPAR();
      this.expresion += this.actual.lexema;
      this.match(Tipo.PARENTESIS_CIERRE);
    }
    else
    {
      // EPSILON
    }

  }

  SENDPAR()
  {
    if (this.actual.Tipo === Tipo.IDENTIFICADOR)
    {
      this.EXPRESION();
      this.SENDPAR();
    }
    else if (this.actual.Tipo === Tipo.COMA)
    {
      this.expresion += this.actual.lexema;
      this.match(Tipo.COMA);
      this.EXPRESION();
      this.SENDPAR();
    }
    else if (this.actual.Tipo !== Tipo.PARENTESIS_CIERRE)
    {
      this.EXPRESION();
      this.SENDPAR();
    }
  }

  METODO()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_MAIN)
    {
      this.match(Tipo.RESERVADA_MAIN);
      this.python += 'def Main():';
      this.match(Tipo.PARENTESIS_APERTURA);
      this.match(Tipo.PARENTESIS_CIERRE);
      this.match(Tipo.LLAVE_APERTURA);
      this.INSTRUCCIONES();
      this.match(Tipo.LLAVE_CIERRE);
      this.python += '\n';
      this.python += this.identacion + 'if __name__ = \"__main__\":\n';
      this.python += this.identacion + '\tmain()\n';
    }
    else
    {
      this.python += this.identacion + 'def ' +  this.actual.lexema;
      this.match(Tipo.IDENTIFICADOR);
      this.python += this.actual.lexema;
      this.match(Tipo.PARENTESIS_APERTURA);
      this.PARAMETROS();
      this.python += this.actual.lexema + ':\n';
      this.match(Tipo.PARENTESIS_CIERRE);
      this.match(Tipo.LLAVE_APERTURA);
      this.INST_FUNCIONES();
      this.match(Tipo.LLAVE_CIERRE);
      this.python += '\n';
    }
  }

  PARAMS_P()
  {

  }

  PARAMETROS()
  {
    if (this.esTipo())
    {
      this.TIPO();
      this.python += this.actual.lexema;
      this.match(Tipo.IDENTIFICADOR);
      this.PARAMETROS_P();
    }
    else
    {
      // EPSILON
    }
  }

  PARAMETROS_P()
  {
    if (this.actual.Tipo === Tipo.COMA)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.COMA);
      this.TIPO();
      this.python += this.actual.lexema;
      this.match(Tipo.IDENTIFICADOR);
      this.PARAMETROS_P();
    }
  }

  IF()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.python += ' ';
    this.CONDICION();
    this.python += ':';
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.LLAVE_APERTURA);
    this.python += '\n';
    this.INSTRUCCIONES();
    this.match(Tipo.LLAVE_CIERRE);
    this.python += '\n';
    this.ELSE();
  }

  ELSE()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_ELSE)
    {
      this.match(Tipo.RESERVADA_ELSE);
      this.ELSE_P();
    }
    else
    {
      // EPSILON
    }
  }

  ELSE_P()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_IF)
    {
      this.python += this.identacion + 'elif ';
      this.match(Tipo.RESERVADA_IF);
      this.match(Tipo.PARENTESIS_APERTURA);
      this.CONDICION();
      this.match(Tipo.PARENTESIS_CIERRE);
      this.python += ':';
      this.match(Tipo.LLAVE_APERTURA);
      this.python += '\n';
      this.INSTRUCCIONES();
      this.match(Tipo.LLAVE_CIERRE);
      this.python += '\n';
      this.ELSE();
    }
    else
    {
      this.python += this.identacion + 'else:';
      this.match(Tipo.LLAVE_APERTURA);
      this.python += '\n';
      this.INSTRUCCIONES();
      this.match(Tipo.LLAVE_CIERRE);
      this.python += '\n';
    }
  }

  SWITCH()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.expresion = '';
    this.EXPRESION();
    this.python += '(case,' + this.expresion + '):';
    this.aumentarIdentacion();
    this.python += '\n' + this.identacion + 'switcher = {\n';
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.LLAVE_APERTURA);
    this.python += '\n';
    this.CASE();
    this.DEFAULT();
    this.disminuirIdentacion();
    this.python += this.identacion + '}';
    this.match(Tipo.LLAVE_CIERRE);
    this.python += '\n';
  }

  CASE()
  {
    this.match(Tipo.RESERVADA_CASE);
    this.expresion = '';
    this.EXPRESION();
    this.python += this.identacion + this.expresion + ':\t#CASE\n';
    this.match(Tipo.DOS_PUNTOS);
    this.aumentarIdentacion();
    this.INSTRUCCIONES();
    this.BREAK();
    this.python += this.identacion + ',\n';
    this.disminuirIdentacion();
    this.CASE_P();
  }

  CASE_P()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_CASE)
    {
      this.match(Tipo.RESERVADA_CASE);
      this.expresion = '';
      this.EXPRESION();
      this.python += this.identacion + this.expresion + ':\t#CASE\n';
      this.match(Tipo.DOS_PUNTOS);
      this.aumentarIdentacion();
      this.INSTRUCCIONES();
      this.BREAK();
      this.python += this.identacion + ',\n';
      this.disminuirIdentacion();
      this.CASE_P();
    }
    else
    {
      // EPSILON
    }
  }

  DEFAULT()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_DEFAULT)
    {
      this.match(Tipo.RESERVADA_DEFAULT);
      let r = '10000';
      // tslint:disable-next-line: radix
      if (parseInt(this.expresion))
      {
        // tslint:disable-next-line: radix
        r = (parseInt(this.expresion) + 1).toString();
      }
      // tslint:disable-next-line: radix
      this.python += this.identacion + r + ':\t#CASE\n';
      this.match(Tipo.DOS_PUNTOS);
      this.aumentarIdentacion();
      this.INSTRUCCIONES();
      this.BREAK();
      this.python += this.identacion + ',\n';
      this.disminuirIdentacion();
    }
    else
    {
      // EPSILON
    }
  }

  BREAK()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_BREAK)
    {
      this.match(Tipo.RESERVADA_BREAK);
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
    else
    {
      // EPSILON
    }
  }

  FOR()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.TIPO();
    this.varFor = this.actual.lexema;
    this.match(Tipo.IDENTIFICADOR);
    this.match(Tipo.IGUAL);
    this.expresion = '';
    this.EXPRESION();
    this.valorInicialFor = this.expresion;
    this.match(Tipo.PUNTO_Y_COMA);
    this.python += '\n';
    this.valorFinalFor = '';
    this.CONDICION();
    this.match(Tipo.PUNTO_Y_COMA);
    this.python += '\n';
    this.match(Tipo.IDENTIFICADOR);
    this.AD();
    this.match(Tipo.PARENTESIS_CIERRE);
    while (this.python[this.python.length - 3] !== 'f' &&
    this.python[this.python.length - 2] !== 'o' &&
    this.python[this.python.length - 1] !== 'r')
    {
      this.python = this.python.slice(0, -1);
    }
    this.python += ' ' + this.varFor + ' in range (' + this.valorInicialFor + ',' + this.valorFinalFor
    + this.decrementoFor + '):';
    this.match(Tipo.LLAVE_APERTURA);
    this.python += '\n';
    this.INST_REP();
    this.match(Tipo.LLAVE_CIERRE);
    this.python += '\n';
  }

  AD()
  {
    if (this.actual.Tipo === Tipo.SIGNO_MAS)
    {
      this.match(Tipo.SIGNO_MAS);
      this.match(Tipo.SIGNO_MAS);
      this.decrementoFor = '';
    }
    else
    {
      this.match(Tipo.SIGNO_MENOS);
      this.match(Tipo.SIGNO_MENOS);
      this.decrementoFor = ',-1';
    }
  }

  WHILE()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.CONDICION();
    this.python += ':';
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.LLAVE_APERTURA);
    this.python += '\n';
    this.INST_REP();
    this.match(Tipo.LLAVE_CIERRE);
    this.python += '\n';
  }

  DO_WHILE()
  {
    this.match(Tipo.LLAVE_APERTURA);
    this.python += '\n';
    this.INSTRUCCIONES();
    this.match(Tipo.LLAVE_CIERRE);
    this.python += '\n';
    this.match(Tipo.RESERVADA_WHILE);
    this.match(Tipo.PARENTESIS_APERTURA);
    this.python += this.identacion + '\tif(';
    this.CONDICION();
    this.python += '):\n' + this.identacion + '\t\tbreak';
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.PUNTO_Y_COMA);
    this.python += '\n';
  }

  IMPRIMIR()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.IMPRESION();
    this.python += ')\n';
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.PUNTO_Y_COMA);
  }

  IMPRESION()
  {
    if (this.actual.Tipo === Tipo.HTML)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.HTML);
      this.IMPRESION_P();
    }
    else
    {
      this.expresion = '';
      this.EXPRESION();
      this.python += this.expresion;
    }
  }

  IMPRESION_P()
  {
    if (this.actual.Tipo === Tipo.SIGNO_MAS)
    {
      this.python += this.actual.lexema;
      this.match(Tipo.SIGNO_MAS);
      this.IMPRESION();
    }
    else
    {
      // EPSILON
    }
  }

  INST_REP()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_BREAK)
    {
      this.python += this.identacion + this.actual.lexema;
      this.match(Tipo.RESERVADA_BREAK);
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
    else if (this.actual.Tipo === Tipo.CONTINUE)
    {
      this.python += this.identacion + this.actual.lexema;
      this.match(Tipo.CONTINUE);
      this.match(Tipo.PUNTO_Y_COMA);
      this.python += '\n';
    }
    else
    {
      this.INSTRUCCIONES();
    }
  }
}
