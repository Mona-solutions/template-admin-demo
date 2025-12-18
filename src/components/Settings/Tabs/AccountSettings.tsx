import { useRouter } from "@tanstack/react-router";

export default function AccountSettings() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("user");
    router.navigate({ to: "/" });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-medium">Account</h2>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
