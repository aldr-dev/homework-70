export interface ApiFormData {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface MutationApiFormData extends ApiFormData {
 id: string;
}