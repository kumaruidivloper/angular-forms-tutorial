export interface UserFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
  comments: string;
}

export interface FormStateData {
  id: string;
  userId: string;
  formData: UserFormData;
  lastModified: string;
}