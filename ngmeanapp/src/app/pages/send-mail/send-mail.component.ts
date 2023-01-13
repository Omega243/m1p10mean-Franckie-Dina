import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SToolsService } from 'src/app/services/s-tools.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {

  filename !: File;
  destinataire : any;
  objet : any;
  contenu : any;

  message : any;

  email_client : any;

  fileInfos?: Observable<any>;

  constructor(private activatedRoute : ActivatedRoute,private toolService : SToolsService) { }

  ngOnInit(): void {
    this.email_client=this.activatedRoute.snapshot.paramMap.get("email");
    console.log(this.activatedRoute.snapshot.paramMap.get("email"));
    this.destinataire = this.email_client;
  }


  send(){
    if(this.filename==null || this.destinataire==null || this.objet==null || this.contenu==null){
      this.message = "Tous les champs sont obligatoires !";
    } else {
      let file = this.filename ;
      let mail = {
        destinataire : this.destinataire,
        objet : this.objet,
        contenu : this.contenu
      }

      console.log(mail);

      const formData = new FormData();
      const form = mail;
      formData.append("mail",JSON.stringify(form));
      formData.append("file",file);

      const success = response => {
        if(response['status']==200){
          console.log("Merci njuuu");
          // this.router.navigate(["/devis/liste"]);
        } else {
          this.message="Erreur lors de la modification , veuillez réessayez.";
        }
    }

    const error = response => {
      this.message="Erreur de chargement de la page.";
    }
    this.toolService.sendMail(formData).subscribe(success,error);
    }


  }

  onchange(event : any){
    this.filename = event.target.files[0];
    console.log(this.filename);
  }


}
