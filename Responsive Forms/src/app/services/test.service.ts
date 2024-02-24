import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {
  }
  URL = 'https://form-83fb2-default-rtdb.firebaseio.com/posts/'
  fetchpost() {
    return this.http
      .get(this.URL + '.json')
      .pipe(
        map((response: any) => {
          let posts = [];
          for (let key in response) {
            posts.push({ ...response[key], key });
          }
          return posts;
        })
      );
    }
  saveuser(postdata: any):Observable<any>{
    return this.http.post(
      this.URL + '.json',
      postdata
    );
  }

   
  clearall():Observable<any>{
    return this.http.delete(this.URL + '.json')
  }
    deleteUser(key:any):Observable<any>{
   return this.http
      .delete(this.URL+key+'.json')
    }

    updateuser(user:any, info:any):Observable<any>{
    return  this.http.put(
      this.URL +
          user +
          '.json',
        info)
    }
    
  }

