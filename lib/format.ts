export function formatKgCo2e(value: number): string {
  return `${new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: value > 0 && value < 1 ? 2 : 0
  }).format(value)} kg CO2e`;
}

export function formatTonnesCo2e(valueKg: number): string {
  return `${new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 3,
    minimumFractionDigits: 2
  }).format(valueKg / 1000)} ton CO2e`;
}

export function formatCategory(category: string): string {
  const labels: Record<string, string> = {
    electricity: "Elektrik",
    natural_gas: "Dogal gaz",
    diesel: "Dizel",
    gasoline: "Benzin"
  };

  return labels[category] ?? category;
}

export function formatScope(scope: string): string {
  return scope === "scope2" ? "Scope 2" : "Scope 1";
}
