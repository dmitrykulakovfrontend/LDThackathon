export type Token = {
  sub: string;
  role: string[];
  iat: number;
  exp: number;
};
export type User = {
  id: number;
  name: string;
  email: string;
  organisation: string;
  inn: string;
  website: string;
  country: string;
  city: string;
  business_type: string;
  job: string;
  password: string;
  roles: Role[];
  enabled: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

export type Authority = {
  authority: string;
};

export type Role = {
  id: number;
  name: string;
};
