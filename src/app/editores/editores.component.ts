import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { element } from 'protractor';
import { Documento } from '../objetos/documento';
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

  constructor() { }

  ngAfterViewInit(): void {
    ace.require('ace/ext/language_tools');
    this.editorBeautify = ace.require('ace/ext/beautify');
    const emisorElement = this.ReceptorRef.nativeElement;
    const receptorElement = this.EmisorRef.nativeElement;
    const editorOptions = this.getEditorOptions();

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
        enableBasicAutocompletion: true
    };
    const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
    return margedOptions;
  }

  guardar()
  {
    const blob = new Blob([this.Receptor.getValue()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, this.document.nombre + '.cs');
  }

  scan(entrada: string)
  {
    entrada += '#'; // Añadiendo el simbolo final.

  }
}
