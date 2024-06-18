import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css']
})
export class AllDataComponent implements OnInit {
  listUsers: User[] = []
  loading: boolean = false;
  

  constructor(private _userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListUser();
  }

  getListUser() {
    this.loading = true;

    this._userService.getListUser().subscribe((data: User[]) => {
      this.listUsers = data;
      this.loading = false;
    })
  }
}