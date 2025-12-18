import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  name: string;
  email: string;
  username: string;
  avatar: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  name: "",
  email: "",
  username: "",
  avatar: "",
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  // 🔵 Cargar del mismo localStorage que pisa landing page
  useEffect(() => {
    const saved = localStorage.getItem("userSettings");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // 🔵 Guardar cambios cuando se actualiza el user
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
