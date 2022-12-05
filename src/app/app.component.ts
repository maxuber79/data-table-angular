import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
/* @Services */
import { ServicesService } from '../app/services.service'

/* @interfaces */
import { DummyDocente } from '../app/interface/list-users.interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'testDataTable';
	dtOptions: DataTables.Settings = {};
  public allUsersDummy: DummyDocente[] = [];	
	public usersLenght: DummyDocente[] = [];

	constructor(
		private router: Router,
		private services: ServicesService, 
		 
	 ) {
		console.log('%c[DEBUG]: constructor()','background: rgba(69, 255, 111, .5); color: #FFFFFF; padding: 2px 5px;');		
	}

	ngOnInit(): void {
		console.log('%c[DEBUG]: ngOnInit()','background: rgba(69, 255, 111, .5); color: #FFFFFF; padding: 2px 5px;');
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

		this.services.getDummyDocentes().subscribe(
			(data: any) => {
				this.allUsersDummy = data.users;
				 console.log('%c[DEBUG] Data de la tabla input this.allUsersDummy >>>>>>>>>>', 'background: #28a745; color: #FFFFFF; padding: 2px 5px;', data.users);
				 	this. usersLenght = data.users.length
				 console.log('%c[DEBUG] Data de la tabla input this.collectionSize >>>>>>>>>>', 'background: #0dcaf0; color: #FFFFFF; padding: 2px 5px;', this.allUsersDummy);
			},
			(error) => {
				console.log(error);
			}
		); 
  }
}
