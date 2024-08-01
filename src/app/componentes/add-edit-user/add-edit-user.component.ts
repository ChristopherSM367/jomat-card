import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  texto: string = 'ID: '
  defaultId: number = this.generateId();

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
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
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id !== 0){
      this.operacion = 'Editar ';
      this.getUser(this.id);
    }
  }

  getUser(id: number): void {
    this.loading = true;
    this._userService.getUser(id).subscribe({
      next: (data: User) => {
        this.form.setValue({
          businessName: data.businessName,
          businessAddress: data.businessAddress,
          businessPhone: data.businessPhone,
          businessEmail: data.businessEmail,
          businessWebsite: data.businessWebsite,
          businessLogo: data.businessLogo,
          facebookLink: data.facebookLink,
          twitterLink: data.twitterLink,
          instagramLink: data.instagramLink,
          backgroundLink: data.backgroundLink,
          linkedinLink: data.linkedinLink,
          businessJob: data.businessJob
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error buscando usuario:', error);
        this.loading = false;
        this.toastr.error('Error buscando datos del usuario', 'Error');
      }
    });
  }

  addUser(): void {
    const user: User = {
      id: this.id !== 0 ? this.id : this.defaultId,
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
    };

    this.loading = true;
    if (this.id !== 0) {
      this._userService.updateUser(this.id, user).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.info('El usuario: '+ user.businessName + ' fue actualizado con éxito', 'Actualizado');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error actualizando usuario:', error);
          this.loading = false;
          this.toastr.error('Error actualizando usuario', 'Error');
        }
      });
    } else {
      this._userService.saveUser(user).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('El usuario: ' + user.businessName + ' fue creado con éxito', 'Creado');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creando usuario:', error);
          this.loading = false;
          this.toastr.error('Error creando usuario', 'Error');
        }
      });
    }
  }

  generateId(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
