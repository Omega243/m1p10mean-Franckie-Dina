import { Injectable } from '@angular/core';
import { base_url } from 'src/environments/environment';
import { SToolsService } from './s-tools.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SUsersService {

  constructor(private tools : SToolsService, private http : HttpClient) { }

  getList(){
    var url =base_url+"users/liste";
    const options = this.tools.formOption(true);
    return this.http.get(url, options);
  }

  getRoles(){
    var url= base_url+"users/role";
    const options = this.tools.formOption(true);
    return this.http.get(url, options);
  }

  add(_id: BigInteger , mail: string , mdp: string){
    let input = {
      _id : _id,
      mail : mail,
      mdp : mdp
    }
    var url= base_url+"users/add";
    return this.http.post(url, input);
  }

  getById(_id){
    const options = this.tools.formOption(true);
    return this.http.get(base_url+"/user/file/"+_id,  options);
  }

  delete(_id: any){
    console.log("Deleting...");
    const options = this.tools.formOption(true);
    return this.http.get(base_url+"/user/delete/"+_id,  options);
  }

  update(user){
    var url = base_url+"/user/update";
    const options = this.tools.formOption(true);
    return this.http.put(url, user, options);
  }


  updateProfil(user){
    var url = base_url+"/user/update/profile";
    const options = this.tools.formOption(true);
    return this.http.put(url, user, options);
  }

}
