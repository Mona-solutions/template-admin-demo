import { Button } from "@/components/ui/button";

type Props = {
  onLogout?: () => void;
  onResetAuth?: () => void;
};

export function SecurityCard({ onLogout, onResetAuth }: Props) {
  return (
    <section className="rounded-xl border p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Security</h2>
        <p className="text-sm text-muted-foreground">Session actions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onLogout ?? (() => alert("Missing logout() in AuthContext"))}>
          Log out
        </Button>

        <Button
          variant="destructive"
          onClick={onResetAuth ?? (() => alert("Missing resetAuth() in AuthContext"))}
        >
          Clear local data
        </Button>
      </div>
    </section>
  );
}
