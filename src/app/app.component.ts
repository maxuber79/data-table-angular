import { Component, OnInit, VERSION, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {

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

	//checkAllCheckBox(ev) { // Angular 9
 /*  checkAllCheckBox(ev: any) { // Angular 13
		this.AllUserApi.forEach( x => x.checked = ev.target.checked);
		console.log(this.checked);
	} */

	/* isAllCheckBoxChecked() {
		return this.AllUserApi.every( p => p.checked);
		console.log( this.checked);
	} */

getSelectedItems(row: any, event: any) {

	const inforowForEach = this.AllUserApi.forEach( row => row.selected );
	console.log('%c.forEach() >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', row);



	const infoRowFilter = this.AllUserApi.filter( item => item.selected);
	console.log('%c.filter() >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', infoRowFilter );
	 /* if (this.AllUserApi.filter( item => item.selected)) {
		console.log('%c[DEBUG] filter >>>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', row);
  	} */
	
	 let infoRowMap = this.AllUserApi.map( (row) => {
		return row;		
	 });
		console.log('%c.map() >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;',infoRowMap);
		/* var arr = [2, 5, 6, 3, 8, 9];
      
    var newArr = arr.map(function(val, index){
        return {key:index, value:val*val};
    }) */

	/* if (this.AllUserApi.map( item => item.selected)) {
		console.log('%c[DEBUG] .map() >>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', row);
  	} */
	/* const infoRowMap = this.AllUserApi.map(item => {		
		return item.selected
	});
	console.log('%c.map() >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', infoRowMap); */
	/* console.log(marcas); */
		/* if (this.AllUserApi.map( item => item.selected)) {
		console.log('%c[DEBUG] .map() >>', 'background:  #cff4fc; color:#084298; padding: 2px 5px;', row);
  	} */

		

		
	}

	selectAll(event: any) {	
		//alert('seleccionando toda la data')	
		this.AllUserApi.forEach((x, index, all: Usuario[]) => { //--> No creo un nuevo arreglo , solo lista la acantidad de objetos dentro del arreglo
			x.selected = event.target.checked
			console.log('%c selectAll .forEach() this.seleccionados >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', x);
		
			/* console.log('%c selectAll forEach (x) >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', x);
			console.log('%c selectAll forEach (index) >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', index);
			console.log('%c selectAll forEach (all) >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', all); */
		});	
		
		/* this.seleccionadosMap = this.AllUserApi.map(  (x, index, array: Usuario[]): any => array = event.target.checked );//--> Cre un nuevo arreglo
		console.log('%c selectAll .map() this.seleccionados >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', this.seleccionadosMap); */
		this.seleccionadosMap = this.AllUserApi.map(function(x, index, array: Usuario[]): any {
				 return array = event.target.checked
		} );//--> Cre un nuevo arreglo
		console.log('%c selectAll .map() this.seleccionados >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', this.seleccionadosMap);

		this.seleccionados = this.AllUserApi.map( ( x, index, Array:any)  => {
			//console.log('si hay data...', Array);
			   if(x.selected = event.target.checked) {
					console.log('si hay data...', x);
										
			} else {
				console.log('no hay data...');
			}   
			 return x
		});
		 console.log('%c const seleccionados >>', this.seleccionados);

		
		this.seleccionadosFilter = this.AllUserApi.filter((data, index, all: Usuario[]) => {
			return all;
		})
		console.log('%c selectAll .filter() this.seleccionadosFilter >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', this.seleccionadosFilter);
		
		/* 
		
		 if (this.isChecked == true) {
       $('.checkboxCls').prop('checked', false);
      this.isChecked = false;
    } else {
       $('.checkboxCls').prop('checked', true);
      this.isChecked = true;
    }
		
		*/
		 
  	//this.AllUserApi.forEach( x => x.selected = event.target.checked);
		/* this.AllUserApi.forEach( x => x.selected = event.target.checked); */	
		/* this.AllUserApi.forEach( (all,index, todos) => {
			 all.selected = event.target.checked
			 console.log(all)
		});	 */
		/* this.AllUserApi.map( (usuarios) => {
			 this.seleccionados = usuarios;
		});
	 */


		
	}

	/*  selectAll(event: any) {
			
  const infoAllRow = this.AllUserApi.forEach( item => item.selected = event.target.checked);
	 this.selectionChanged.emit(this.getSelectedItems());  
	console.log('%c All rows .forEach() >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', infoAllRow);
	} */ 
	selectedDataAll() {		
		/* const all = this.AllUserApi.forEach( item => this.selectAll);
		console.log('que devuelvo', all); */
	 /* this.AllUserApi.forEach( function(item, index, allUser) {
			console.log('item >>', item);
			console.warn('index >>', index); 
			console.info('allUser >>', allUser); 
		})   */
		/* console.log('%c All rows .forEach() >>','background: #d1e7dd; color: #0f5132; padding: 2px 5px;', event); */
	} 
	selectAllChanged() {
  	//this.AllUserApi.forEach( item => item.selected = this.selectAll);
	}

	

}







function ngOnInit() {
	throw new Error('Function not implemented.');
}

