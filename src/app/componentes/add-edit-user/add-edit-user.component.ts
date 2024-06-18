import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute){
    this.form = this.fb.group({
      
      businessName: ['', [Validators.required, Validators.maxLength(50)]],
      businessAddress: ['', [Validators.required, Validators.maxLength(50)]],
      businessPhone: ['', [Validators.required, Validators.maxLength(10)]],
      businessEmail: ['', [Validators.required, Validators.maxLength(50)]],
      businessWebsite: ['',[Validators.maxLength(500)]],
      businessLogo: ['', [Validators.required, Validators.maxLength(600)]], 
      facebookLink: ['', [Validators.maxLength(600)]], 
      twitterLink: ['', [Validators.maxLength(600)]],
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
        businessAddress: data.businessAddress ,
        businessPhone: data.businessPhone,
        businessEmail: data.businessEmail ,
        businessWebsite: data.businessWebsite,
        businessLogo: data.businessLogo,
        facebookLink: data.facebookLink,
        twitterLink: data.twitterLink,
        instagramLink: data.backgroundLink,
        linkedinLink: data.linkedinLink,
        youtubeLink: data.businessJob 
      })
    })
  }

  generateId(): number {
    return Math.floor(100000 + Math.random() * 90000);
  }
  texto: string = 'ID: ';

  public defaultId: number = this.generateId();


   addUser(){
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


    if (this.id !== 0){
      
      //Editar
      this.loading = true;
      user.id = this.id;
      this. _userService.updateUser(this.id, user).subscribe(() =>{
        this.loading = false;
        this.toastr.info('El usuario: '+ user.businessName + ' fue actualizado con exito', 'Actualizado');
        this.router.navigate(['/']);
      })

    }  else {

      //Agregar

      this.loading = true;
      this._userService.saveUser(user).subscribe(() => {
      
        this.loading = false;
    
        this.router.navigate(['/'+user.id]);
      })
    }
  
  } 
}
