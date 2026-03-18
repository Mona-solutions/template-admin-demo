import { useAuth } from "@/auth/AuthContext";

export default function UserTab() {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) return null;

  const name = auth.user.username;
  const email = auth.user.email;

  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-muted/60 cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
        U
      </div>

      <div>
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-200">{email}</p>
      </div>
    </div>
  );
}
