import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  initials: string;
  avatarSrc: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAvatar: () => void;
  avatarError?: string;

  fullName: string;
  onFullNameChange: (v: string) => void;
  fullNameError?: string;

  username: string;
  onUsernameChange: (v: string) => void;
  usernameError?: string;

  bio: string;
  onBioChange: (v: string) => void;
  bioError?: string;
};

export function ProfileCard({
  initials,
  avatarSrc,
  onAvatarChange,
  onRemoveAvatar,
  avatarError,
  fullName,
  onFullNameChange,
  fullNameError,
  username,
  onUsernameChange,
  usernameError,
  bio,
  onBioChange,
  bioError,
}: Props) {
  return (
    <section className="rounded-xl border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">
          This information may be visible on your account.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={avatarSrc} alt="Profile" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <Label className="block">Profile picture</Label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Input type="file" accept="image/*" onChange={onAvatarChange} className="cursor-pointer" />
            <Button variant="outline" onClick={onRemoveAvatar} disabled={!avatarSrc}>
              Remove picture
            </Button>
          </div>

          {avatarError && <p className="text-sm text-red-600">{avatarError}</p>}
          <p className="text-xs text-muted-foreground">PNG/JPG/WebP, max 3MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Full name</Label>
          <Input value={fullName} onChange={(e) => onFullNameChange(e.target.value)} />
          {fullNameError && <p className="text-sm text-red-600">{fullNameError}</p>}
        </div>

        <div className="space-y-2">
          <Label>Username</Label>
          <Input value={username} onChange={(e) => onUsernameChange(e.target.value)} />
          {usernameError && <p className="text-sm text-red-600">{usernameError}</p>}
          <p className="text-xs text-muted-foreground">Only letters, numbers and _</p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Bio</Label>
          <Input
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            placeholder="Write something short… (max 160)"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{bioError ? <span className="text-red-600">{bioError}</span> : " "}</span>
            <span>{bio.length}/160</span>
          </div>
        </div>
      </div>
    </section>
  );
}
