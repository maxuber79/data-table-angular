import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/* @interface */
import { DummyDocente } from '../app/interface/list-users.interface';
import { Usuario } from '../app/interface/user.interface';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {


	public urlApi: string = 'https://jsonplaceholder.typicode.com/';

  constructor(
		private http: HttpClient
	) {
		console.log('%c<<< Start All services >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;'); 
	 }
	 getUsersApi( user: string ): Observable<Usuario[]> {
		const dataUsers = `${this.urlApi}${user}`;
		return this.http.get<Usuario[]>(dataUsers);
	 }
	 getDummyDocentes(): Observable<DummyDocente> {
		const usuariosLista = 'assets/data/dummy-vramercadodocente.json';
		return this.http.get<DummyDocente>(usuariosLista);
	}
}
