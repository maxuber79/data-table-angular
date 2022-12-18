import { Component, OnInit, VERSION, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
/* @Services */
import { ServicesService } from '../app/services.service'

/* @interfaces */
import { DummyDocente } from '../app/interface/list-users.interface';
import { Usuario } from '../app/interface/user.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	public nameVersion = 'Angular ' + VERSION.full;
  title = 'testDataTable';
	/* variables dataTable */
	dtOptions: DataTables.Settings = {};
	//dtTrigger: any = new Subject<void>();
	dtTrigger: any = new Subject<void>();



  public allUsersDummy: DummyDocente[] = [];	
	public usersLenght: DummyDocente[] = [];


	public AllUserApi: Usuario[] = [];

	constructor(
		private router: Router, private services: ServicesService
		 
	 ) {
		console.log('%cconstructor() >>>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;');	
				
	}

	ngOnInit(): void {
		console.log('%cngOnInit() >>>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;');
			this.dtOptions = {					
				pagingType: 'full_numbers',
				pageLength: 2,
				lengthMenu : [2, 10, 25],
				processing: true,
				language: {
					url: '../../../assets/lang/es-CL.json'
				}
			};   
			 this.getAllUsers(); 
			 

		 /* this.services.getUsersApi('users').subscribe({
			next: (response: Usuario[]) => {
				this.AllUserApi = (response as any);
				console.log('%c[DEBUG] Data getUsersApi() >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', this.AllUserApi);
				// Calling the DT trigger to manually render the table         
  			this.dtTrigger.next(); 
			 },
			error: (err: Error) => console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err),
    	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		}); */
	

		//this.getAllUsers();
  }

	ngOnDestroy(): void {
   console.log('%cngOnDestroy() >>>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;');
	 this.dtTrigger.unsubscribe();
  }

	editUser(index: number, userId: any) {
		console.log('%c[DEBUG]: Info usuario para Edit','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;','Info Index >>',index,'Info userID >>', userId)
	}
	deleteUser(index: number, userId: any) {
		console.log('%c[DEBUG]: Info usuario para Delete','background: #6610f2; color: #FFFFFF; padding: 2px 5px;','Info Index >>', index,'Info userID >>', userId);
	}

	getAllUsers() {
		this.services.getUsersApi('users').subscribe({
			next: (response: Usuario[]) => {
				this.AllUserApi = (response as any);
				console.log('%c[DEBUG] Data getUsersApi() >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', this.AllUserApi);
				// Calling the DT trigger to manually render the table         
  			this.dtTrigger.next(); 
			 },
			error: (err: Error) => console.error('%cHTTP Error','background: #f8d7da; color: #842029; padding: 2px 5px;', err),
    	complete: () => console.log('%cHTTP request completed.','background: #d1e7dd; color: #0f5132; padding: 2px 5px;')
		});
	}
}







function ngOnInit() {
	throw new Error('Function not implemented.');
}

