import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GlobalStyleControls({ styles, onChange }) {
  return (
    <Card className="max-w-2xl">
      <CardContent className="space-y-4 p-4">
        <div>
          <Label htmlFor="font">Font Family</Label>
          <Input
            id="font"
            value={styles.font || ''}
            onChange={(e) => onChange({ ...styles, font: e.target.value })}
            placeholder="e.g., sans, serif, mono"
          />
        </div>
        <div>
          <Label htmlFor="primaryColor">Primary Color</Label>
          <Input
            id="primaryColor"
            value={styles.primaryColor || ''}
            onChange={(e) => onChange({ ...styles, primaryColor: e.target.value })}
            placeholder="e.g., #0ea5e9"
            type="color"
          />
        </div>
      </CardContent>
    </Card>
  );
}
