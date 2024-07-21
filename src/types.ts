export interface ApiFormData {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface MutationApiFormData {
  [id: string]: ApiFormData;
}