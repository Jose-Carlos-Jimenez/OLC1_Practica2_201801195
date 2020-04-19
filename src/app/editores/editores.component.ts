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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  jsonErrorArray: Array<Error>;
  variables: Array<Variable>;
  html: string;
  actual: Token;
  numeroToken: number;

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
        minLines: 14,
        maxLines: 14,
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
    console.clear();
    this.errorLexico = false;
    this.errorSintactico = false;
    this.sintacticoFlag = false;
    this.scan(this.Receptor.getValue());
    // console.log(this.flujoDeTokens);
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
  }

  /* MÉTODO PARA VERIFICAR QUE SEA EL TOKEN ESPERADO */
  match(tipo: Tipo)
  {
    /* SALTANDO COMENTARIOS */
    if (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE || this.actual.Tipo === Tipo.COMENTARIO_LINEA)
    {
      while (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE || this.actual.Tipo === Tipo.COMENTARIO_LINEA)
      {
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
          '] y se obtuvo [' + this.actual.GetTipoString() + ']' , this.actual.fila - 1, this.columna));

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
        }
      }
    }

    /* SALTANDO COMENTARIOS */
    if (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE || this.actual.Tipo === Tipo.COMENTARIO_LINEA)
    {
      while (this.actual.Tipo === Tipo.COMENTARIO_BLOQUE || this.actual.Tipo === Tipo.COMENTARIO_LINEA)
      {
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
      this.match(Tipo.PARENTESIS_APERTURA);
      this.PARAMETROS();
      this.match(Tipo.PARENTESIS_CIERRE);
      this.match(Tipo.LLAVE_APERTURA);
      this.INST_FUNCIONES();
      this.match(Tipo.LLAVE_CIERRE);
      this.INST_GENERALES();
    }
    else
    {
      this.DECLARACION();
      this.INSTRUCCIONES();
    }

  }

  INSTRUCCIONES()
  {
    if (this.esTipo())
    {
      this.TIPO();
      this.match(Tipo.IDENTIFICADOR);
      this.DECLARACION();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_IF)
    {
      this.match(Tipo.RESERVADA_IF);
      this.IF();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_SWITCH)
    {
      this.match(Tipo.RESERVADA_SWITCH);
      this.SWITCH();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_WHILE)
    {
      this.match(Tipo.RESERVADA_WHILE);
      this.WHILE();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_DO)
    {
      this.match(Tipo.RESERVADA_DO);
      this.DO_WHILE();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.FUNCION_WRITELINE)
    {
      this.match(Tipo.FUNCION_WRITELINE);
      this.IMPRIMIR();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.IDENTIFICADOR)
    {
      this.match(Tipo.IDENTIFICADOR);
      this.ASIGNACION();
      this.INSTRUCCIONES();
    }
    else if (this.actual.Tipo === Tipo.RETURN)
    {
      this.match(Tipo.RETURN);
      if (this.actual.GetTipoString() !== 'Punto y coma')
      {
        this.EXPRESION();
      }
      this.match(Tipo.PUNTO_Y_COMA);
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
      this.match(Tipo.IDENTIFICADOR);
      this.DECLARACION_P();
    }
    else if (this.actual.Tipo === Tipo.PUNTO_Y_COMA)
    {
      this.match(Tipo.PUNTO_Y_COMA);
    }
    else
    {
      this.match(Tipo.IGUAL);
      this.EXPRESION();
      this.match(Tipo.PUNTO_Y_COMA);
    }
  }

  INST_FUNCIONES()
  {
    if (this.actual.Tipo === Tipo.RETURN)
    {
      this.match(Tipo.RETURN);
      this.EXPRESION();
      this.match(Tipo.PUNTO_Y_COMA);
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
      this.match(Tipo.IDENTIFICADOR);
      this.DECLARACION_P();
    }
    else if ( this.actual.Tipo === Tipo.IGUAL)
    {
      this.match(Tipo.IGUAL);
      this.EXPRESION();
      this.match(Tipo.PUNTO_Y_COMA);
    }
    else
    {
      this.match(Tipo.PUNTO_Y_COMA);
    }
  }

  CONDICION()
  {
    if (this.actual.Tipo === Tipo.NOT)
    {
      this.match(Tipo.NOT);
      this.EXPRESION();
      this.CONDICION_P();
      this.CONDICION_PLUS();
    }
    else if (this.actual.Tipo === Tipo.TRUE)
    {
      this.match(Tipo.TRUE);
    }
    else if (this.actual.Tipo === Tipo.FALSE)
    {
      this.match(Tipo.FALSE);
    }

    else
    {
      this.EXPRESION();
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
      this.match(Tipo.IGUAL_QUE);
    }
    else if (this.actual.Tipo === Tipo.DIFERENTE)
    {
      this.match(Tipo.DIFERENTE);
    }
    else if (this.actual.Tipo === Tipo.MAYOR_QUE)
    {
      this.match(Tipo.MAYOR_QUE);
    }
    else if (this.actual.Tipo === Tipo.MENOR_QUE)
    {
      this.match(Tipo.MENOR_QUE);
    }
    else if (this.actual.Tipo === Tipo.MAYOR_IGUAL)
    {
      this.match(Tipo.MAYOR_IGUAL);
    }
    else
    {
      this.match(Tipo.MENOR_IGUAL);
    }
  }

  CONDICION_PLUS()
  {
    if (this.actual.Tipo === Tipo.AND)
    {
      this.match(Tipo.AND);
    }
    else if ( this.actual.Tipo === Tipo.OR_LOGICO)
    {
      this.match(Tipo.OR_LOGICO);
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
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_BOOL)
    {
      this.match(Tipo.RESERVADA_BOOL);
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_STRING)
    {
      this.match(Tipo.RESERVADA_STRING);
    }
    else if (this.actual.Tipo === Tipo.RESERVADA_CHAR)
    {
      this.match(Tipo.RESERVADA_CHAR);
    }
    else
    {
      this.match(Tipo.RESERVADA_DOUBLE);
    }
  }

  VALOR()
  {
    if (this.actual.Tipo === Tipo.VALOR_CHAR)
    {
      this.match(Tipo.VALOR_CHAR);
    }
    else if (this.actual.Tipo === Tipo.TRUE)
    {
      this.match(Tipo.TRUE);
    }
    else if (this.actual.Tipo === Tipo.FALSE)
    {
      this.match(Tipo.FALSE);
    }
    else if (this.actual.Tipo === Tipo.CADENA)
    {
      this.match(Tipo.CADENA);
    }
    else if (this.actual.Tipo === Tipo.NUMERO_ENTERO)
    {
      this.match(Tipo.NUMERO_ENTERO);
    }
    else
    {
      this.match(Tipo.NUMERO_DECIMAL);
    }
  }

  ASIGNACION()
  {
    if (this.actual.Tipo === Tipo.IGUAL)
    {
      this.match(Tipo.IGUAL);
      this.EXPRESION();
      this.match(Tipo.PUNTO_Y_COMA);
    }
    else
    {
      this.match(Tipo.PUNTO_Y_COMA);
      // EPSILON
    }
  }

  EXPRESION()
  {
    if (this.actual.Tipo === Tipo.NOT)
    {
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
      this.match(Tipo.SIGNO_MENOS);
      this.TERMINOS();
      this.EXPRESION_P();
    }
    else if (this.actual.Tipo === Tipo.SIGNO_MAS)
    {
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
      this.match(Tipo.SIGNO_MULTIPLICACION);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.SIGNO_DIVISION)
    {
      this.match(Tipo.SIGNO_DIVISION);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.AND)
    {
      this.match(Tipo.AND);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.OR_LOGICO)
    {
      this.match(Tipo.OR_LOGICO);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.IGUAL_QUE)
    {
      this.match(Tipo.IGUAL_QUE);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.MAYOR_QUE)
    {
      this.match(Tipo.MAYOR_QUE);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.MENOR_QUE)
    {
      this.match(Tipo.MENOR_QUE);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.MAYOR_IGUAL)
    {
      this.match(Tipo.MAYOR_IGUAL);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.MENOR_IGUAL)
    {
      this.match(Tipo.MENOR_IGUAL);
      this.FACTORES();
      this.TERMINOS_P();
    }
    else if ( this.actual.Tipo === Tipo.DIFERENTE)
    {
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
      this.match(Tipo.PARENTESIS_APERTURA);
      this.EXPRESION();
      this.match(Tipo.PARENTESIS_CIERRE);
    }
    else if (this.actual.Tipo === Tipo.IDENTIFICADOR)
    {
      this.match(Tipo.IDENTIFICADOR);
      this.FUNC();
    }
    else if (this.actual.Tipo === Tipo.NOT)
    {
      this.match(Tipo.NOT);
      this.match(Tipo.IDENTIFICADOR);
    }
    else if (this.actual.Tipo === Tipo.CADENA)
    {
      this.match(Tipo.CADENA);
    }
    else if (this.actual.Tipo === Tipo.TRUE)
    {
      this.match(Tipo.TRUE);
    }
    else if (this.actual.Tipo === Tipo.FALSE)
    {
      this.match(Tipo.FALSE);
    }
    else if (this.actual.Tipo === Tipo.VALOR_CHAR)
    {
      this.match(Tipo.VALOR_CHAR);
    }
    else if (this.actual.Tipo === Tipo.NUMERO_ENTERO)
    {
      this.match(Tipo.NUMERO_ENTERO);
    }
    else
    {
      this.match(Tipo.NUMERO_DECIMAL);
    }
  }

  FUNC()
  {
    if (this.actual.Tipo === Tipo.PARENTESIS_APERTURA)
    {
      this.match(Tipo.PARENTESIS_APERTURA);
      this.SENDPAR();
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
      this.match(Tipo.COMA);
      this.EXPRESION();
      this.SENDPAR();
    }
    else
    {
      // EPSILON
    }
  }

  METODO()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_MAIN)
    {
      this.match(Tipo.RESERVADA_MAIN);
      this.match(Tipo.PARENTESIS_APERTURA);
      this.match(Tipo.PARENTESIS_CIERRE);
      this.match(Tipo.LLAVE_APERTURA);
      this.INSTRUCCIONES();
      this.match(Tipo.LLAVE_CIERRE);
    }
    else
    {
      this.match(Tipo.IDENTIFICADOR);
      this.match(Tipo.PARENTESIS_APERTURA);
      this.PARAMETROS();
      this.match(Tipo.PARENTESIS_CIERRE);
      this.match(Tipo.LLAVE_APERTURA);
      this.INST_FUNCIONES();
      this.match(Tipo.LLAVE_CIERRE);
    }
  }

  PARAMETROS()
  {
    if (this.esTipo())
    {
      this.TIPO();
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
      this.match(Tipo.COMA);
      this.TIPO();
      this.match(Tipo.IDENTIFICADOR);
      this.PARAMETROS_P();
    }
  }

  IF()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.CONDICION();
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.LLAVE_APERTURA);
    this.INSTRUCCIONES();
    this.match(Tipo.LLAVE_CIERRE);
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
      this.match(Tipo.RESERVADA_IF);
      this.match(Tipo.PARENTESIS_APERTURA);
      this.CONDICION();
      this.match(Tipo.PARENTESIS_CIERRE);
      this.match(Tipo.LLAVE_APERTURA);
      this.INSTRUCCIONES();
      this.match(Tipo.LLAVE_CIERRE);
      this.ELSE();
    }
    else
    {
      this.match(Tipo.LLAVE_APERTURA);
      this.INSTRUCCIONES();
      this.match(Tipo.LLAVE_CIERRE);
    }
  }

  SWITCH()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.match(Tipo.IDENTIFICADOR);
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.LLAVE_APERTURA);
    this.CASE();
    this.DEFAULT();
    this.match(Tipo.LLAVE_CIERRE);
  }

  CASE()
  {
    this.match(Tipo.RESERVADA_CASE);
    this.VALOR();
    this.match(Tipo.DOS_PUNTOS);
    this.INSTRUCCIONES();
    this.BREAK();
    this.CASE_P();
  }

  CASE_P()
  {
    if (this.actual.Tipo === Tipo.RESERVADA_CASE)
    {
      this.match(Tipo.RESERVADA_CASE);
      this.VALOR();
      this.match(Tipo.DOS_PUNTOS);
      this.INSTRUCCIONES();
      this.BREAK();
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
      this.match(Tipo.DOS_PUNTOS);
      this.INSTRUCCIONES();
      this.BREAK();
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
    this.match(Tipo.IDENTIFICADOR);
    this.match(Tipo.IGUAL);
    this.match(Tipo.PUNTO_Y_COMA);
    this.CONDICION();
    this.match(Tipo.PUNTO_Y_COMA);
    this.match(Tipo.IDENTIFICADOR);
    this.AD();
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.LLAVE_APERTURA);
    this.INST_REP();
    this.match(Tipo.LLAVE_CIERRE);
  }

  AD()
  {
    if (this.actual.Tipo === Tipo.SIGNO_MAS)
    {
      this.match(Tipo.SIGNO_MAS);
      this.match(Tipo.SIGNO_MAS);
    }
    else
    {
      this.match(Tipo.SIGNO_MENOS);
      this.match(Tipo.SIGNO_MENOS);
    }
  }

  WHILE()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.CONDICION();
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.LLAVE_APERTURA);
    this.INST_REP();
    this.match(Tipo.LLAVE_CIERRE);
  }

  DO_WHILE()
  {
    this.match(Tipo.LLAVE_APERTURA);
    this.INSTRUCCIONES();
    this.match(Tipo.LLAVE_CIERRE);
    this.match(Tipo.RESERVADA_WHILE);
    this.match(Tipo.PARENTESIS_APERTURA);
    this.CONDICION();
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.PUNTO_Y_COMA);
  }

  IMPRIMIR()
  {
    this.match(Tipo.PARENTESIS_APERTURA);
    this.IMPRESION();
    this.match(Tipo.PARENTESIS_CIERRE);
    this.match(Tipo.PUNTO_Y_COMA);
  }

  IMPRESION()
  {
    if (this.actual.Tipo === Tipo.IDENTIFICADOR)
    {
      this.match(Tipo.IDENTIFICADOR);
      this.IMPRESION_P();
    }
    else if (this.actual.Tipo === Tipo.CADENA)
    {
      this.match(Tipo.CADENA);
      this.IMPRESION_P();
    }
    else
    {
      this.match(Tipo.HTML);
      this.IMPRESION_P();
    }
  }

  IMPRESION_P()
  {
    if (this.actual.Tipo === Tipo.SIGNO_MAS)
    {
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
      this.match(Tipo.RESERVADA_BREAK);
      this.match(Tipo.PUNTO_Y_COMA);
    }
    else if (this.actual.Tipo === Tipo.CONTINUE)
    {
      this.match(Tipo.CONTINUE);
      this.match(Tipo.PUNTO_Y_COMA);
    }
    else
    {
      this.INSTRUCCIONES();
    }
  }
}
