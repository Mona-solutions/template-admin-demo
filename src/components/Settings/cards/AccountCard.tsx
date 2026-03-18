import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  email: string;
  id?: string;
};

export function AccountCard({ email, id }: Props) {
  return (
    <section className="rounded-xl border p-6 space-y-6 bg-white dark:bg-card dark:border-2 dark:border-slate-200/60">
      <div>
        <h2 className="text-lg font-semibold">Account</h2>
        <p className="text-sm text-muted-foreground">
          Access information and primary account details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={email} disabled className="bg-gray-100" />
          <p className="text-xs text-muted-foreground">
            (For now) read-only with your current authentication.
          </p>
        </div>

        <div className="space-y-2">
          <Label>ID</Label>
          <Input value={id ?? "—"} disabled className="bg-gray-100" />
        </div>
      </div>
    </section>
  );
}
