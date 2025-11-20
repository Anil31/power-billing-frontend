import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { mockUsage } from "@/features/customers/mock";
import type { Customer, CustomerUsage } from "@/features/customers/types";
import {
  getCustomerById,
  createCustomer,
  updateCustomer,
} from "@/features/customers/api";

interface CustomerFormState {
  name: string;
  address: string;
  email: string;
}

interface TouchedState {
  name: boolean;
  address: boolean;
  email: boolean;
}

const numberFmt = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFmt = new Intl.DateTimeFormat("de-DE");

export default function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = id === "neu";

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loadingCustomer, setLoadingCustomer] = useState(!isNew);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [form, setForm] = useState<CustomerFormState>({
    name: "",
    address: "",
    email: "",
  });

  const [touched, setTouched] = useState<TouchedState>({
    name: false,
    address: false,
    email: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [activeTab, setActiveTab] = useState<"stammdaten" | "verbrauch">(
    "stammdaten"
  );
  const [showBill, setShowBill] = useState(false);

  // 🔄 Kunde laden (nur im Edit-Mode)
  useEffect(() => {
    if (isNew || !id) {
      setCustomer(null);
      setForm({
        name: "",
        address: "",
        email: "",
      });
      setLoadingCustomer(false);
      setLoadError(null);
      return;
    }

    async function load() {
      try {
        setLoadingCustomer(true);
        setLoadError(null);

        const data = await getCustomerById(id);
        setCustomer(data);
        setForm({
          name: data.name ?? "",
          address: data.address ?? "",
          email: data.email ?? "",
        });
      } catch (err) {
        console.error(err);
        setLoadError(
          err instanceof Error
            ? err.message
            : "Fehler beim Laden des Kunden."
        );
      } finally {
        setLoadingCustomer(false);
      }
    }

    load();
  }, [id, isNew]);

  // 🔎 Validierung
  const nameEmpty = form.name.trim() === "";
  const emailInvalid =
    form.email.trim() !== "" && !form.email.includes("@");

  const isFormValid = !nameEmpty && !emailInvalid;

  // Hat sich etwas geändert?
  const hasChanges = useMemo(() => {
    if (isNew) {
      return (
        form.name.trim() !== "" ||
        form.address.trim() !== "" ||
        form.email.trim() !== ""
      );
    }

    if (!customer) return false;

    return (
      form.name !== customer.name ||
      form.address !== customer.address ||
      form.email !== customer.email
    );
  }, [form, customer, isNew]);

  function updateField<K extends keyof CustomerFormState>(
    key: K,
    value: CustomerFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTouched({ name: true, address: true, email: true });

    if (!isFormValid || !hasChanges) return;

    setIsSaving(true);

    try {
      if (isNew) {
        // ➕ Neuen Kunden anlegen
        const payload = {
          customerNo: "",
          name: form.name.trim(),
          city: "",
          address: form.address.trim(),
          email: form.email.trim(),
        };

        const created = await createCustomer(payload);
        setCustomer(created);
        setLastSaved(new Date());

        // Nach dem Anlegen zur Detailseite des neuen Kunden navigieren
        navigate(`/kunden/${created.id}`);
      } else if (customer) {
        // 💾 Bestehenden Kunden aktualisieren
        const updated = await updateCustomer(Number(customer.id), {
          ...customer,
          name: form.name.trim(),
          address: form.address.trim(),
          email: form.email.trim(),
        });

        setCustomer(updated);
        setLastSaved(new Date());
      }
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error
          ? err.message
          : "Fehler beim Speichern der Kundendaten."
      );
    } finally {
      setIsSaving(false);
    }
  }

  // 🔌 Verbrauchsdaten (noch Mock, aber an geladenen Kunden gekoppelt)
  const usageData: CustomerUsage[] = useMemo(() => {
    if (!customer) return [];
    return mockUsage
      .filter((u) => u.customerId === customer.id)
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date)); // neueste zuerst
  }, [customer]);

  const totalKwh = useMemo(
    () => usageData.reduce((sum, u) => sum + u.kwh, 0),
    [usageData]
  );

  const basePrice = 20; // € Grundpreis (Mock)
  const pricePerKwh = 0.3; // €/kWh (Mock)
  const energyCost = totalKwh * pricePerKwh;
  const totalCost = basePrice + energyCost;

  function handleShowBill() {
    setShowBill(true);
    console.log("[MOCK] Abrechnung berechnet:", {
      totalKwh,
      basePrice,
      energyCost,
      totalCost,
    });
  }

  function handleExport() {
    console.log("[MOCK] Export PDF/Excel ausgelöst.");
    alert("Export wurde (mock) ausgelöst – Implementierung folgt im Backend.");
  }

  // 🔁 Lade-/Fehlerzustände für bestehenden Kunden
  if (!isNew && loadingCustomer) {
    return <p>Lade Kundendaten…</p>;
  }

  if (!isNew && loadError) {
    return (
      <div className="space-y-2">
        <p className="text-red-600 font-semibold">
          Fehler beim Laden des Kunden: {loadError}
        </p>
        <Link to="/kunden" className="text-sm underline">
          Zurück zur Kundenliste
        </Link>
      </div>
    );
  }

  if (!isNew && !customer) {
    return (
      <div className="space-y-2">
        <p className="text-red-600 font-semibold">Kunde nicht gefunden.</p>
        <Link to="/kunden" className="text-sm underline">
          Zurück zur Kundenliste
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {isNew ? "Neuen Kunden anlegen" : "Kundendaten bearbeiten"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isNew
              ? "Bitte die Daten für den neuen Kunden eingeben."
              : `Kundennummer ${customer!.customerNo} – ID ${customer!.id}`}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="stammdaten">Stammdaten</TabsTrigger>
          <TabsTrigger value="verbrauch" disabled={isNew}>
            Verbrauch
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: STAMMDATEN */}
        <TabsContent value="stammdaten">
          <form onSubmit={onSubmit} className="space-y-4">
            <Card className="p-4 space-y-4">
              {/* Name (Pflichtfeld) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-600">*</span>
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, name: true }))
                  }
                  placeholder="Firmenname oder Ansprechpartner"
                  className={
                    touched.name && nameEmpty
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {touched.name && nameEmpty && (
                  <p className="text-xs text-red-600 mt-1">
                    Name darf nicht leer sein.
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Offizieller Name des Kunden.
                </p>
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Adresse
                </label>
                <Input
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, address: true }))
                  }
                  placeholder="Straße, Hausnummer, PLZ Ort"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Rechnungs- oder Hauptadresse des Kunden.
                </p>
              </div>

              {/* E-Mail */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  E-Mail
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  placeholder="kontakt@kunde.de"
                  className={
                    touched.email && emailInvalid
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {touched.email && emailInvalid && (
                  <p className="text-xs text-red-600 mt-1">
                    Bitte eine gültige E-Mail-Adresse eingeben oder leer
                    lassen.
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Hauptkontaktadresse für Rechnungen und Benachrichtigungen.
                </p>
              </div>
            </Card>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={!hasChanges || !isFormValid || isSaving}
              >
                {isSaving
                  ? isNew
                    ? "Anlegen…"
                    : "Speichern…"
                  : isNew
                  ? "Anlegen"
                  : "Speichern"}
              </Button>

              {lastSaved && (
                <p className="text-xs text-muted-foreground">
                  Zuletzt gespeichert um{" "}
                  {lastSaved.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                  .
                </p>
              )}
            </div>
          </form>
        </TabsContent>

        {/* TAB 2: VERBRAUCH */}
        <TabsContent value="verbrauch">
          {usageData.length === 0 ? (
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">
                Für diesen Kunden liegen derzeit keine Verbrauchsdaten vor.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card className="p-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40 text-left">
                      <th className="py-2 px-3">Datum</th>
                      <th className="py-2 px-3">Verbrauch (kWh)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageData.map((u) => (
                      <tr key={u.id} className="border-b">
                        <td className="py-2 px-3">
                          {dateFmt.format(new Date(u.date))}
                        </td>
                        <td className="py-2 px-3">
                          {numberFmt.format(u.kwh)} kWh
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>

              <div className="flex flex-wrap gap-2">
                <Button onClick={handleShowBill}>Abrechnung anzeigen</Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleExport}
                >
                  Export PDF/Excel
                </Button>
              </div>

              {showBill && (
                <Card className="p-4 space-y-1 max-w-md">
                  <h2 className="text-sm font-semibold mb-1">
                    Abrechnung (Mock)
                  </h2>
                  <p className="text-sm">
                    Gesamtverbrauch:{" "}
                    <span className="font-medium">
                      {numberFmt.format(totalKwh)} kWh
                    </span>
                  </p>
                  <p className="text-sm">
                    Grundpreis:{" "}
                    <span className="font-medium">
                      {numberFmt.format(basePrice)} €
                    </span>
                  </p>
                  <p className="text-sm">
                    Arbeitspreis:{" "}
                    <span className="font-medium">
                      {numberFmt.format(energyCost)} €
                    </span>{" "}
                    (bei {numberFmt.format(pricePerKwh)} €/kWh)
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Gesamt:</span>{" "}
                    <span className="font-semibold">
                      {numberFmt.format(totalCost)} €
                    </span>
                  </p>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Link to="/kunden" className="text-sm underline">
        Zurück zur Kundenliste
      </Link>
    </div>
  );
}
