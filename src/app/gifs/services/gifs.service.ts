import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'// esto es para que sea inyectado de forma global
})
export class GifsService {
  constructor(private http:HttpClient) { }
  private apikey:string='6ddEE3UpDa82SqbxfgLXe1qTDngPDc11'
  private _historial:string[]=[];
  
  get historial(){
    return [...this._historial];
  }
  // TODO:cambiar any por su tipo
  public resultados:Gif[]=[]
   
  buscarGifs(query:string=''){
    query=query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
    }
    console.log(this._historial);
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=6ddEE3UpDa82SqbxfgLXe1qTDngPDc11&q=soccer&limit=10')
    // .then(resp=>{
    //     resp.json().then(data=>{
    //       console.log(data);
          
    //       })
    // })
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=6ddEE3UpDa82SqbxfgLXe1qTDngPDc11&q=${query}&limit=10`)
    .subscribe((resp)=>{
      // console.log(resp.data);
      console.log(resp);
      this.resultados=resp.data;
    })
  }
  
  
}
