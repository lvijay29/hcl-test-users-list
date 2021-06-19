import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterOption } from './filter-option.interface';
import { UsersService } from '../users.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public usersList;
  selectedValue;
  allUsersList;
  options: FilterOption[] = [
    {
      value: 'name',
      text: 'Name'
    },
    {
      value: 'username',
      text: 'User Name'
    },
    {
      value: 'email',
      text: 'Email'
    },
    {
      value: 'phone',
      text: 'Phone'
    },
    {
      value: 'website',
      text: 'Website'
    }
  ];

  constructor(public userService:UsersService) { }

  ngOnInit() {
    this.selectedValue = 'name'
    this.bindUserDetails()
  }
 async bindUserDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'Accept' : 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    let response = await this.getUsers(httpOptions)
    this.usersList = response;
    this.allUsersList = response;
  }

  changeOption(value)
  {
    this.selectedValue = value
  }
  filters(item) {
    this.usersList = this.allUsersList;
    this.usersList = this.usersList.filter( items => {
      return items[this.selectedValue].toLowerCase().includes(item);
    });
  }
  public getUsers(header) {
    return new Promise((resolve, reject) => {
      this.userService.getUserList(header).subscribe((data: any) => {
        resolve(data);
      });
    });
  }

}
