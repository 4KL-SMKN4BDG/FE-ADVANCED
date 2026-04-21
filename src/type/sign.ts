export type SignIn = {
  nomorInduk: string;
  password: string;
};

export type SignUp = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  phoneWA: string;
};

export type Reset = Omit<SignUp, "email" | "phoneNumber">;

export type Forget = Omit<SignIn, "password">;
