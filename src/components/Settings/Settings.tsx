import { useUser } from "@/context/UserContext";
import type { User } from "@/types/UserData";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Settings() {
  const { user, setUser } = useUser();

  const handleChange = <K extends keyof User>(key: K, value: User[K]) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUser((prev) => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("userSettings", JSON.stringify(user));
    alert("Changes saved!");
  };

  return (
    <div className="space-y-8">
      {/* Avatar */}
      <div className="flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.avatar} alt="Profile" />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <Label className="block mb-1">Cambiar foto</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Nombre completo</Label>
          <Input
            value={user.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user.email} disabled className="bg-gray-100" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Username</Label>
          <Input
            value={user.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="bg-[rgb(25,52,85)] hover:bg-[rgb(20,40,70)]"
      >
        Guardar cambios
      </Button>
    </div>
  );
}
