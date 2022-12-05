import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* @interface */
import { DummyDocente } from '../app/interface/list-users.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
		private http: HttpClient
	) {
		console.log('%c[DEBUG]: Start All services','background:rgba(255, 193, 7,.5); color: #FFFFFF; padding: 2px 5px;');
	 }

	 getDummyDocentes(): Observable<DummyDocente> {
		const usuariosLista = 'assets/data/dummy-vramercadodocente.json';
		return this.http.get<DummyDocente>(usuariosLista);
	}
}
