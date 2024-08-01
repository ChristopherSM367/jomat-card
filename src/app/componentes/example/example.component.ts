import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  template: `<button (click)="share()">Compartir</button>`,
})

export class ExampleComponent implements OnInit {
  userId: number = 1;
  listUsers: User[] = [];

  loading: boolean = false;
  public showInstallPrompt: boolean = false;
  private deferredPrompt: any;

  constructor(private _userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _activatedRoute: ActivatedRoute) { 
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        this.deferredPrompt = event;
        this.showInstallPrompt = true;
      });
  }

  ngOnInit(): void {
    this.loadStaticData();
  }

  loadStaticData(): void {
    this.listUsers = [{
      id: 1,
      businessName: '',
      businessAddress: 'Calle 62 #710 entre 43 y 41a, Cd Caucel, Caucel, Mexico, 97314',
      businessEmail: 'dayna.flores@jomatconsultores.com',
      businessPhone: '5566778899',
      businessJob: '',      
      businessLogo: './assets/jomatback.jpg',      
      facebookLink: 'https://www.facebook.com/JomatConsultores',
      twitterLink: 'https://twitter.com/JomatConsultores',
      linkedinLink: 'https://www.linkedin.com/company/jomat-consultores/',            
      instagramLink: 'https://www.instagram.com/jomatconsultores?igsh=b2lhdXI2eG56Nncx',
      businessWebsite: 'http://jomatconsultores.com/',
      backgroundLink: '/assets/jomatback.jpg',
    }]
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: 'Mi aplicación de Angular',
        url:  window.location.href,
      })
        .then(() => console.log('Enlace compartido exitosamente'))
        .catch((error) => console.error('Error al compartir enlace', error));
    } else {
      console.error('API de Web Share no disponible');
    }
  }

  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: { outcome: string; }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null;
        this.showInstallPrompt = false;
      });
    }
  }
}
