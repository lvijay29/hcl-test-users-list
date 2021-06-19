import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  public getUserList(request: any, header): Observable<any> {
    const url = this.getUrl('https://jsonplaceholder.typicode.com/users');
    return this.http.get<any>(url, header);
  }
}
