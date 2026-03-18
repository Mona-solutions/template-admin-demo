import { useAuth } from "@/auth/AuthContext";

export default function GreetingUser() {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) return null;

  const user = auth.user;

  const displayName =
    (user.name && user.name.trim()) ||
    (user.username && user.username.trim()) ||
    "there";

  return (
    <section className="px-8 py-8 bg-[rgb(25,52,85)] rounded-lg text-center shadow-xl dark:bg-[#DEE6F0] dark:text-[rgb(25,52,85)]">
      <h1 className="text-white font-bold text-4xl mb-4 dark:text-[rgb(25,52,85)]">
        ¡Welcome back {displayName}!
      </h1>
      <p className="text-white text-lg dark:text-gray-800">
        Here’s a summary of your shipments.
      </p>
    </section>
  );
}
