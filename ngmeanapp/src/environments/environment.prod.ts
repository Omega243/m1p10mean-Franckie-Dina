export const environment = {
  production: true
};

export const base_url = 'http://localhost:3000/';
export const user = {
  _id : '',
  nom : '',
  prenom : '',
  mail : '',
  mdp : '',
  contact : '',
  role : ''
};

export const voiture = {
  _id : '',
  matricule : '',
  marque : '',
  type : ''
};

export const user_base_url = base_url+'users';

export const roles_base_url = base_url+'roles';

export const voitures_base_url = base_url+'voitures';

export const fiches_base_url = base_url+'fiches';

export const typedepenses_base_url = base_url+'typedepenses';

export const finances_base_url = base_url+'finances';

export const etatfiche_base_url = base_url+'etatfiches';


// export const userCustomer = {
//   id : '',
//   nom : '',
//   prenom : '',
//   mail : '',
//   mdp : '',
//   contact : ''
// };
