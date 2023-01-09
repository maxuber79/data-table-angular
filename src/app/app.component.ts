import { Component, OnInit, VERSION, OnDestroy, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

	public nameVersion = 'Angular ' + VERSION.full;
  title = 'testDataTable';

	
	/*
	*@Table variables
	*/
	public dtOptions: DataTables.Settings = {};
	public dtTrigger: any = new Subject<void>();
	//dtTrigger: any = new Subject<void>();

	/*
	*@Checkbox variables
	*/
	public isChecked = false;
	public selectedUser: boolean = false;
	selectedAll:boolean = false;
	selected: boolean = false;
	/*
	*@Services variables
	*/

  public allUsersDummy: DummyDocente[] = [];	
	public usersLenght: DummyDocente[] = [];
	public AllUserApi: Usuario[] = [];

	/* Variables de prueba */
	public seleccionados: any = [];
	public seleccionadosForEach: Usuario[] = [];
	public seleccionadosFilter: Usuario[] = [];
	public seleccionadosMap: Usuario[] = [];

	public allItems: boolean = false;
	public soloSeleccionados: Usuario[] = [];
 @ViewChild('checkboxAll', {static: false}) checkboxall!: ElementRef;




	@Output() selectionChanged = new EventEmitter<any[]>();

	constructor(
		private router: Router, private services: ServicesService
		 
	 ) {
		console.log('%cconstructor() >>>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;');	
				
	}

	 
 /*  selectAll( event: any) {   
  	this.AllUserApi.forEach( item => item.selected = event.target.checked);
   this.selectionChanged.emit(this.getSelectedItems());
  } */

/* 	obtenerPersonasSeleccionadas() {
  return this.AllUserApi.filter( User => User.seleccionado);
} */

	ngAfterViewInit() {
	}
	ngOnInit(): void {
		console.log('%cngOnInit() >>>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;');
			this.dtOptions = {					
				pagingType: 'full_numbers',
				pageLength: 5,
				lengthMenu : [5, 10, 25],
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
	getSelectedItems(row: any, event: any) {
		/*
		*@Functions con .filter() sleccionando 1 o mas de 2
		**/
		this.seleccionadosFilter = this.AllUserApi.filter( item => item.selected);
		console.log('%cgetSelectedItems() | .filter() >>','background:  #cff4fc; color:#084298; padding: 2px 5px', this.seleccionadosFilter);
		this.allItems = false;
	}
	selectAll( event: any ) {
	/*
	*@Functions con .filter(), seleccionado a todos
	**/
	
	this.AllUserApi.filter((selectedAll, index, all: Usuario[]) => {
		selectedAll.selected = event.target.checked;	

		if(this.allItems === true ) {
			this.soloSeleccionados.push(selectedAll);			
		} else {
			this.soloSeleccionados = [];
			console.log('los 10 son false')
		}
	});
	console.log('%cselectAll | .filter() | this.soloSeleccionados >>','background:#d63384; color: #FFFFFF; padding: 2px 5px;', this.soloSeleccionados);
	}
	
}







function ngOnInit() {
	throw new Error('Function not implemented.');
}

