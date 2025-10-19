import type { User } from "../../types/UserData";
import { useState } from "react";

interface LandingPageProps {
  onStart: (user: User) => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const inputClassName =
    "border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(25,52,85)]";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // demo: NO lo guardaremos

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[rgb(67,108,158)] to-[rgb(16,51,87)]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <img
          className="h-20 w-17 mx-auto mb-2"
          src="./public/Droppitlogo.png"
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
          onSubmit={(e) => {
            e.preventDefault();

            const user: User = {
              id: crypto.randomUUID(),
              name: name.trim(),
              email: email.trim(),
            };

            localStorage.setItem("user", JSON.stringify(user));

            onStart(user);
          }}
        >
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="Username"
            className={inputClassName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={inputClassName}
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className={inputClassName}
            autoComplete="off"
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
