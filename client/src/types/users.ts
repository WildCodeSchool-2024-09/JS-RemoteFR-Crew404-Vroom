export type User = {
  id: number;
  profile_picture: string | null;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  birthdate: string | Date;
  sold: number;
  is_admin?: boolean;
};
