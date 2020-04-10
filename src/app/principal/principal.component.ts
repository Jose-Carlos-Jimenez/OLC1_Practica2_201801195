import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { UploadService } from '../services/upload.service';
import { element } from 'protractor';
import { Documento } from '../objetos/documento';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  documentos: Documento[];
  contador: number;
  id: string;
  uploadedFiles: Array<File>;

  constructor(private service: UploadService) {}

  ngOnInit(): void {
    this.documentos = [];
    this.contador = 0;
  }

  pushItem()
  {
    this.contador++;
    const nuevo: Documento = new Documento();
    nuevo.contenido = '';
    nuevo.nombre = 'Documento ' + this.contador;
    this.documentos.push(nuevo);
  }

  onUpload(e)
  {
    this.uploadedFiles = e.target.files;
    const formData = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.uploadedFiles.length; index++) {
      // tslint:disable-next-line: no-shadowed-variable
      const element = this.uploadedFiles[index];
      formData.append('uploads[]', element, element.name);
    }
    // Call service.
    // this.service.uploadFile(formData).subscribe((res) => {
      // console.log('Response: ', res);
    // });

    // Read text
    const reader = new FileReader();
    reader.onload = (event: any) =>
    {
      if (event.target.result)
      {
        const nuevo: Documento = new Documento();
        nuevo.contenido = event.target.result;
        nuevo.nombre = this.uploadedFiles[0].name;
        this.documentos.push(nuevo);
      }
    };
    reader.readAsText(this.uploadedFiles[0]);
  }
}
