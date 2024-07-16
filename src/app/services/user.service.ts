import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,from } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  private myappUrl: string;
  private myApiUrl: string;
  /* private users: User[] = [
    {
      id: 1,
      businessName: '',
      businessAddress: 'Calle 62 #710 entre 43 y 41a, Cd Caucel, Caucel, Mexico, 97314',
      businessEmail: 'dayna.flores@jomatconsultores.com',
      businessPhone: '529999088613',
      businessJob: '',      
      businessLogo: './assets/jomatback.jpg',      
      facebookLink: 'https://www.facebook.com/JomatConsultores',
      twitterLink: 'https://twitter.com/JomatConsultores',
      linkedinLink: 'https://www.linkedin.com/company/jomat-consultores/',            
      instagramLink: 'https://www.instagram.com/jomatconsultores?igsh=b2lhdXI2eG56Nncx',
      businessWebsite: 'http://jomatconsultores.com/',
      backgroundLink: '/assets/jomatback.jpg',
    },
    {
      id: 2,
      businessName: 'Jomat Consultores',
      businessAddress: 'Domicilio conocido',
      businessEmail: 'dayna.flores@jomatconsultores.com',
      businessPhone: '5566778899',
      businessJob: 'Desarrollador',      
      businessLogo: 'http://jomatconsultores.com/img/logo/logo.png',      
      facebookLink: 'https://www.facebook.com/JomatConsultores',
      twitterLink: '',
      linkedinLink: 'https://www.linkedin.com/company/jomat-consultores/',            
      instagramLink: 'https://www.instagram.com/jomatconsultores?igsh=b2lhdXI2eG56Nncx',
      businessWebsite: 'http://jomatconsultores.com/',
      backgroundLink: 'http://jomatconsultores.com/img/slider_horizontal/redes.png',
    }
  ]; */
  
  constructor(private http: HttpClient) { 
    this.myappUrl = environment.endpoint;
    this.myApiUrl = 'api/usuarios/';
  }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.myappUrl + this.myApiUrl );
    // return  from([this.users]);
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.myappUrl}${this.myApiUrl}/${id}`;
    return this.http.get<User>(url);
    // return from([this.users[0]]);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.myappUrl + this.myApiUrl + id );
    // return from([undefined]);

  }

  saveUser(user: User): Observable<void>{
    return this.http.post<void>(this.myappUrl + this.myApiUrl, user);
    // return from([undefined]);
  }
  
  getUser(id: number): Observable<User>{
    return this.http.get<User>(this.myappUrl + this.myApiUrl + id);
    // return from([this.users[0]]);
  }

  updateUser(id: number, user: User):Observable<void> {
    return this.http.put<void>(this.myappUrl + this.myApiUrl + id, user);
    // return from([undefined]);
  }
}
