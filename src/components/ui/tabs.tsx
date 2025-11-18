import * as React from "react";

type TabsValue = string;

type TabsContextValue = {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
};

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined
);

interface TabsProps {
  value: TabsValue;
  onValueChange: (value: TabsValue) => void;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-md border bg-muted/40 p-1 gap-1">
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: TabsValue;
  children: React.ReactNode;
  disabled?: boolean;
}

export function TabsTrigger({ value, children, disabled }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within <Tabs>");

  const isActive = ctx.value === value;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          ctx.setValue(value);
        }
      }}
      className={
        "px-3 py-1 text-sm rounded-md outline-none " +
        (disabled
          ? "opacity-50 cursor-not-allowed"
          : isActive
          ? "bg-background shadow font-medium"
          : "text-muted-foreground hover:bg-background/70")
      }
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: TabsValue;
  children: React.ReactNode;
}

export function TabsContent({ value, children }: TabsContentProps) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within <Tabs>");

  if (ctx.value !== value) return null;
  return <div className="mt-4">{children}</div>;
}
