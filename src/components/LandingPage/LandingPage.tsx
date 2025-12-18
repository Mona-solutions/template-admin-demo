import type { User } from "../../types/UserData";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "@tanstack/react-router";
import { appRootRoute } from "@/router/app-root";

export default function LandingPage() {
  const { setUser } = useUser();
  const router = useRouter();

  const inputClassName =
    "border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(25,52,85)]";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("userSettings");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setName(parsed.name ?? "");
      setEmail(parsed.email ?? "");
    }
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      username: "",
      avatar: "",
      password: password.trim(),
    };

    // Persistencia + contexto
    localStorage.setItem("userSettings", JSON.stringify(newUser));
    setUser(newUser);

    // 👉 Navegación TIPADA
    router.navigate({
      to: appRootRoute.to,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[rgb(67,108,158)] to-[rgb(16,51,87)]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <img
          className="h-20 w-17 mx-auto mb-2"
          src="/DroppitLogo.png"
          alt="droppit logo"
        />
        <h1 className="text-3xl font-normal mb-4 text-center text-[rgb(25,52,85)]">
          Droppit
        </h1>
        <p className="mb-6 text-center text-gray-500">
          Fast moves. Safe deliveries
        </p>

        <form
          className="flex flex-col gap-4"
          autoComplete="off"
          onSubmit={handleStart}
        >
          <input
            type="text"
            placeholder="Username"
            className={inputClassName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className={inputClassName}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={inputClassName}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-[rgb(25,52,85)] hover:bg-[rgb(32,76,130)] text-white px-6 py-3 rounded shadow transition-all duration-200 font-semibold"
          >
            Join Us
          </button>
        </form>
      </div>
    </div>
  );
}
