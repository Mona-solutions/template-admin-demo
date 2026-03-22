import React, { useMemo, useState } from "react";
import { useAuth } from "@/auth/AuthContext";

import { Button } from "@/components/ui/button";

import { z } from "zod";

import { ProfileCard } from "./cards/ProfileCard";
import { AccountCard } from "./cards/AccountCard";
import { PreferencesCard } from "./cards/PreferencesCard";
import { SecurityCard } from "./cards/SecurityCard";

import type { Preferences } from "./prefs/preferences.types";
import { loadPreferences, savePreferences } from "./prefs/preferences.storage";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters.").max(80, "Full name is too long."),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(24, "Username must be at most 24 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscore (_)."),
  bio: z.string().trim().max(160, "Bio must be at most 160 characters.").optional().or(z.literal("")),
  avatar: z.string().optional().nullable(),
});

type ProfileDraft = z.infer<typeof profileSchema>;

const DEFAULT_PREFS: Preferences = { language: "en", theme: "system" };

export default function Settings() {
  const authApi = useAuth() as any;
  const { auth, updateUser } = authApi;

  const logout = authApi.logout as undefined | (() => void);
  const resetAuth = authApi.resetAuth as undefined | (() => void);

  if (!auth.isAuthenticated) {
    return <div className="p-6">You have to log in</div>;
  }

  const user = auth.user;

  // Profile draft
  const [draft, setDraft] = useState<ProfileDraft>({
    name: user.name ?? "",
    username: user.username ?? "",
    bio: (user.bio as string) ?? "",
    avatar: (user.avatar as string) ?? null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProfileDraft, string>>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Preferences (local)
  const [prefs, setPrefs] = useState<Preferences>(() => loadPreferences());

  const updatePrefs = (patch: Partial<Preferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      savePreferences(next);
      return next;
    });
  };

  const resetPrefs = () => {
    setPrefs(DEFAULT_PREFS);
    savePreferences(DEFAULT_PREFS);
  };

  const initials =
    (draft.name?.trim() || draft.username || "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const isDirty = useMemo(() => {
    return (
      (user.name ?? "") !== draft.name ||
      (user.username ?? "") !== draft.username ||
      ((user.bio as string) ?? "") !== (draft.bio ?? "") ||
      ((user.avatar as string) ?? null) !== (draft.avatar ?? null)
    );
  }, [user, draft]);

  const validate = () => {
    const res = profileSchema.safeParse(draft);
    if (res.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Partial<Record<keyof ProfileDraft, string>> = {};
    for (const issue of res.error.issues) {
      const key = issue.path[0] as keyof ProfileDraft;
      fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, avatar: "Please select a valid image file." }));
      return;
    }

    const maxMb = 3;
    if (file.size > maxMb * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, avatar: `Image must be ${maxMb}MB or smaller.` }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDraft((d) => ({ ...d, avatar: reader.result as string }));
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setDraft((d) => ({ ...d, avatar: null }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaved(false);
    if (!validate()) return;

    setSaving(true);
    try {
      updateUser({
        name: draft.name.trim(),
        username: draft.username.trim(),
        bio: draft.bio?.trim() || "",
        avatar: draft.avatar || null,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleResetChanges = () => {
    setDraft({
      name: user.name ?? "",
      username: user.username ?? "",
      bio: (user.bio as string) ?? "",
      avatar: (user.avatar as string) ?? null,
    });
    setErrors({});
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[rgb(25,52,85)] text-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-200">Manage your profile, account preferences, and security settings.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleResetChanges} disabled={!isDirty || saving}>
            Discard
          </Button>

          <Button
            onClick={handleSave}
            disabled={!isDirty || saving}
            className="bg-[rgb(25,52,85)] hover:bg-[rgb(20,40,70)]"
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      {/* Saved */}
      {saved && <div className="rounded-lg border px-4 py-3 text-sm">✅ Changes saved.</div>}

      <ProfileCard
        initials={initials}
        avatarSrc={draft.avatar ?? ""}
        onAvatarChange={handleAvatarChange}
        onRemoveAvatar={handleRemoveAvatar}
        avatarError={errors.avatar}
        fullName={draft.name}
        onFullNameChange={(v) => {
          setDraft((d) => ({ ...d, name: v }));
          setSaved(false);
        }}
        fullNameError={errors.name}
        username={draft.username}
        onUsernameChange={(v) => {
          setDraft((d) => ({ ...d, username: v }));
          setSaved(false);
        }}
        usernameError={errors.username}
        bio={draft.bio ?? ""}
        onBioChange={(v) => {
          setDraft((d) => ({ ...d, bio: v }));
          setSaved(false);
        }}
        bioError={errors.bio}
      />

      <AccountCard email={user.email ?? ""} id={user.id} />

      <PreferencesCard prefs={prefs} onChange={updatePrefs} onReset={resetPrefs} />

      <SecurityCard onLogout={logout} onResetAuth={resetAuth} />

      {/* Bottom spacing */}
      <div className="h-16" aria-hidden />
    </div>
  );
}
