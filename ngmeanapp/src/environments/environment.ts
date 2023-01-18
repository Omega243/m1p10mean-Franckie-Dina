// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
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

// USER: {
//   getAllUser: 'getalluser',
//   getUser: 'getuser/:id',
//   updateUser: 'updatuser/:id',
//   deleteUser: 'deletuser/:id',
//   ajoutUser: 'inscription'
// },
//export const garage_base_url = 'http://localhost:3000/garage/user';
// VOITURE: {

// }
// export const userCustomer = {
//   id : '',
//   nom : '',
//   prenom : '',
//   mail : '',
//   mdp : '',
//   contact : ''
// };

// const UserSchema = new Schema({
//   nom: { type: String, required: true } ,
//   prenom: { type: String, required: true } ,
//   mail: { type: String, required: true } ,
//   mdp: { type: String, required: true } ,
//   contact: { type: String, required: true}  ,
//   role: { type: ObjectId, ref: "Role", required: true }
// }) ;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
