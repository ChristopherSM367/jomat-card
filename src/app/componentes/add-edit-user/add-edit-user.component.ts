import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http'; // Importación de HttpClient

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private http: HttpClient // Inyección de HttpClient
  ) {
    this.form = this.fb.group({
      businessName: ['', [Validators.required, Validators.maxLength(50)]],
      businessAddress: ['', [Validators.required, Validators.maxLength(50)]],
      businessPhone: ['', [Validators.required, Validators.maxLength(10)]],
      businessEmail: ['', [Validators.required, Validators.maxLength(50)]],
      businessWebsite: ['',[Validators.required, Validators.maxLength(500)]],
      businessLogo: ['', [Validators.maxLength(600)]], 
      facebookLink: ['', [Validators.maxLength(600)]], 
      twitterLink: ['', [Validators.maxLength(600)]],
      instagramLink: ['', [Validators.maxLength(600)]],
      backgroundLink:  ['', [Validators.required, Validators.maxLength(600)]],
      linkedinLink: ['', [Validators.maxLength(600)]],
      businessJob : ['', [Validators.required, Validators.maxLength(200)]]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0){
      //Editar
      this.operacion = 'Editar ';
      this.getUser(this.id);
    }
  }

  getUser(id: number){
    this.loading = true;
    this._userService.getUser(id).subscribe((data: User) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        id: data.id,
        businessName: data.businessName,
        businessAddress: data.businessAddress,
        businessPhone: data.businessPhone,
        businessEmail: data.businessEmail ,
        businessWebsite: data.businessWebsite,
        businessLogo: data.businessLogo,
        facebookLink: data.facebookLink,
        twitterLink: data.twitterLink,
        instagramLink: data.instagramLink, // instagramLink
        backgroundLink: data.backgroundLink, // backgroundLink
        linkedinLink: data.linkedinLink,
        businessJob: data.businessJob // businessJob
      })
    })
  }

  generateId(): number {
    return Math.floor(100000 + Math.random() * 90000);
  }

  texto: string = 'ID: ';
  public defaultId: number = this.generateId();

  addUser() {
    /* console.log(this.form.value.nombre); *****/
    const id = this.defaultId;;
    const user: User = {
      id: id,
      businessName: this.form.value.businessName,
      businessAddress: this.form.value.businessAddress,
      businessPhone: this.form.value.businessPhone,
      businessEmail: this.form.value.businessEmail,
      businessWebsite: this.form.value.businessWebsite,
      businessLogo: this.form.value.businessLogo,
      facebookLink: this.form.value.facebookLink,
      twitterLink: this.form.value.twitterLink,
      instagramLink: this.form.value.instagramLink,
      backgroundLink: this.form.value.backgroundLink,
      linkedinLink: this.form.value.linkedinLink,
      businessJob: this.form.value.businessJob
    } 

    if (this.id !== 0) {
      //Editar
      this.loading = true;
      user.id = this.id;
      this. _userService.updateUser(this.id, user).subscribe(() => {
        this.loading = false;
        this.toastr.info('El usuario: '+ user.businessName + ' fue actualizado con exito', 'Actualizado');
        this.router.navigate(['/']);
      })
    }  else {
      //Agregar
      this.loading = true;
      this._userService.saveUser(user).subscribe(() => {
        this.loading = false;
        this.toastr.success('El usuario: ' + user.businessName + 'fue creado con éxito', 'Creado'); // Crear
        this.sendJsonToBackend(user); // Usar función
        this.router.navigate(['/'+user.id]);
      })
    }
  } 

  sendJsonToBackend(user: User) { // Función declarada
    const url = '';
    const headers = { 'Content-Type': 'application/json' };
    const jsonData = JSON.stringify(user);

    this.http.post(url, jsonData, { headers }).subscribe(
      response => {
        console.log('Datos enviados exitosamente', response);
        this.toastr.success('Los datos han sido enviados al backend con éxito', 'Envío completado');
      },
      error => {
        console.error('Error al enviar los datos', error);
        this.toastr.error('Hubo un error al enviar los datos al backend', 'Error de envío')
      }
    )
  }
}
