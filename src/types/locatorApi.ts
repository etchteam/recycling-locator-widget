export interface Material {
  id: number;
  name: string;
  popular: boolean;
}

export interface PostcodeResponse {
  error?: string;
  postcode?: string;
}
