export interface User {
  id?: string;
  accnumber: string;
  title: string;
  dob: string;
  surname: string;
  givenName: string;
  gender: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  contacNumber: string;
  mobileNumber: string;
  email: string;
  toc: any[];
  reasonNameChange: any[];
  nctitle: string;
  ncsurname: string;
  ncgivenName: string;
  newaddress: string;
  newsuburb: string;
  newstate: string;
  newpostcode: string;
  country: string;
}

export interface FormStateData {
  id: string;
  userId: string;
  formData: User;
  lastModified: string;
}