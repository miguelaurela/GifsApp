import { Component, ElementRef,  ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent   { 

  constructor(private gifsService:GifsService) { }

  
  @ViewChild('txtbuscar') txtbuscar!:ElementRef 
  buscar(){
    const valor:string =this.txtbuscar.nativeElement.value;
    if (valor.trim().length===0) {
      return;
    }        console.log(valor);
    this.gifsService.buscarGifs(valor);
    this.txtbuscar.nativeElement.value='';
    
  }

}
