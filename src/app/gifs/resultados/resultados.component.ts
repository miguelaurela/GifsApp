import { Component, OnInit } from '@angular/core';
import { GifsModule } from '../gifs.module';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent  {

  constructor(private gifsService:GifsService) { }
  get resultados(){
    return this.gifsService.resultados;
  }
  
  

}
