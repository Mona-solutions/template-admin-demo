export type AuthUser = {
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export type AuthState =
  | { isAuthenticated: false; user: null }
  | { isAuthenticated: true; user: AuthUser };
