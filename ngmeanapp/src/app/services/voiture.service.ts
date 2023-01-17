import { Injectable } from '@angular/core';
import { base_url } from 'src/environments/environment';
import { SToolsService } from './s-tools.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private tools : SToolsService, private http : HttpClient) { }
  getList(){
    var url =base_url+"car/list";
    const options = this.tools.formOption(true);
    return this.http.get(url, options);
  }

  add(matricule: string , marque: string, type: string){
    let input = {
      matricule : matricule,
      marque : marque,
      type : type
    }
    var url= base_url+"car/add";
    return this.http.post(url, input);
  }

  getById(_id){
    const options = this.tools.formOption(true);
    return this.http.get(base_url+"/car/file/"+_id,  options);
  }

  delete(_id: any){
    console.log("Deleting...");
    const options = this.tools.formOption(true);
    return this.http.get(base_url+"/car/remove/"+_id,  options);
  }

  update(voiture){
    var url = base_url+"/car/update";
    const options = this.tools.formOption(true);
    return this.http.put(url, voiture, options);
  }

  // REPARATION VOITURE
  getVoitureAReparer(){
    var url = base_url+"/car/torepair/";
    const options = this.tools.formOption(true);
    return this.http.get(url, options);
  }

  // HISTORIQUE
  getHistorique(voiture){
    var url = base_url+"/car/historique/"+voiture;
    const options = this.tools.formOption(true);
    return this.http.get(url, options);
  }

  // DETAIL FICHE
  getFilesDetails(){
    var url = base_url+"/car/details/";
    const options = this.tools.formOption(true);
    return this.http.get(url, options);
  }

  // SEARCH
  search(voiture){
    var url =base_url+'/car/search/'+voiture;
    const options = this.tools.formOption(true);
    return this.http.get(url, options);
  }

}
