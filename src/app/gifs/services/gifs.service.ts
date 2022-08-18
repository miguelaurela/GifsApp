import { HttpClient, HttpParams } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'// esto es para que sea inyectado de forma global
})
export class GifsService {
  constructor(private http:HttpClient) { 
    // if (localStorage.getItem('historial')) {
    //   this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }
      this._historial=JSON.parse(localStorage.getItem('historial')!)||[];
      this.resultados=JSON.parse(localStorage.getItem('resultado')!)||[];

  }
  private servicioUrl='https://api.giphy.com/v1/gifs';
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
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    console.log(this._historial);
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=6ddEE3UpDa82SqbxfgLXe1qTDngPDc11&q=soccer&limit=10')
    // .then(resp=>{
    //     resp.json().then(data=>{
    //       console.log(data);
          
    //       })
    // })
    const params=new HttpParams()
      .set('api_key',this.apikey)
      .set('limit','10')
      .set('q',query);
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`,{params})
    .subscribe((resp)=>{
      console.log(resp);
      this.resultados=resp.data;
      localStorage.setItem('resultado',JSON.stringify(this.resultados));
    })

  }
  
  
}
