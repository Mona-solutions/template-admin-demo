import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Preferences } from "../prefs/preferences.types";

type Props = {
  prefs: Preferences;
  onChange: (patch: Partial<Preferences>) => void;
  onReset: () => void;
};

export function PreferencesCard({ prefs, onChange, onReset }: Props) {
  return (
    <section className="rounded-xl border p-6 space-y-6 bg-white dark:bg-card dark:border-2 dark:border-slate-200/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Preferences</h2>
          <p className="text-sm text-muted-foreground">
            Customize how the app looks and behaves.
          </p>
        </div>

        <Button variant="outline" onClick={onReset}>
          Reset to defaults
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Language</Label>
          <select
            value={prefs.language}
            onChange={(e) =>
              onChange({ language: e.target.value as Preferences["language"] })
            }
            className="w-full h-10 rounded-md border bg-background px-3 text-sm"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
          <p className="text-xs text-muted-foreground">
            Language selection is stored locally on this device.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="flex flex-col gap-2 rounded-md border p-3">
            {(["system", "light", "dark"] as const).map((t) => (
              <label
                key={t}
                className="flex items-center gap-2 text-sm capitalize"
              >
                <input
                  type="radio"
                  name="theme"
                  value={t}
                  checked={prefs.theme === t}
                  onChange={() => onChange({ theme: t })}
                />
                {t}
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Theme preference is saved locally. You can wire it to your app theme
            provider later.
          </p>
        </div>
      </div>
    </section>
  );
}
