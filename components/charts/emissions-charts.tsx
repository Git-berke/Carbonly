"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatCategory, formatKgCo2e, formatScope } from "@/lib/format";
import type { ActivityCategory, EmissionScope } from "@/lib/types";

type MonthlyPoint = {
  month: string;
  emissionsKgCo2e: number;
};

type CategoryPoint = {
  category: ActivityCategory;
  emissionsKgCo2e: number;
};

type ScopePoint = {
  scope: EmissionScope;
  emissionsKgCo2e: number;
};

const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  electricity: "#10b981",
  natural_gas: "#0ea5e9",
  diesel: "#f59e0b",
  gasoline: "#ef4444"
};

const SCOPE_COLORS: Record<EmissionScope, string> = {
  scope1: "#14b8a6",
  scope2: "#6366f1"
};

function tooltipFormatter(value: number | string) {
  return formatKgCo2e(Number(value));
}

export function MonthlyEmissionsChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={data} margin={{ bottom: 8, left: 0, right: 12, top: 8 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            stroke="var(--muted-foreground)"
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${Number(value).toFixed(0)}`}
            tickLine={false}
            width={42}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--foreground)"
            }}
            formatter={tooltipFormatter}
            labelFormatter={(label) => `Ay: ${label}`}
          />
          <Line
            activeDot={{ r: 5 }}
            dataKey="emissionsKgCo2e"
            dot={{ r: 3 }}
            name="Emisyon"
            stroke="#10b981"
            strokeWidth={3}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryEmissionsChart({ data }: { data: CategoryPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ bottom: 8, left: 0, right: 12, top: 8 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            stroke="var(--muted-foreground)"
            tick={{ fontSize: 12 }}
            tickFormatter={formatCategory}
            tickLine={false}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${Number(value).toFixed(0)}`}
            tickLine={false}
            width={42}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--foreground)"
            }}
            formatter={tooltipFormatter}
            labelFormatter={(label) => formatCategory(String(label))}
          />
          <Bar dataKey="emissionsKgCo2e" name="Emisyon" radius={[6, 6, 0, 0]}>
            {data.map((item) => (
              <Cell fill={CATEGORY_COLORS[item.category]} key={item.category} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ScopeEmissionsChart({ data }: { data: ScopePoint[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <div className="h-56 w-full">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="emissionsKgCo2e"
              innerRadius={54}
              nameKey="scope"
              outerRadius={86}
              paddingAngle={4}
            >
              {data.map((item) => (
                <Cell fill={SCOPE_COLORS[item.scope]} key={item.scope} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--foreground)"
              }}
              formatter={tooltipFormatter}
              labelFormatter={(label) => formatScope(String(label))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col justify-center gap-3">
        {data.map((item) => (
          <div
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-background p-3 text-sm"
            key={item.scope}
          >
            <span className="flex items-center gap-2 font-medium">
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: SCOPE_COLORS[item.scope] }}
              />
              {formatScope(item.scope)}
            </span>
            <span className="text-muted-foreground">
              {formatKgCo2e(item.emissionsKgCo2e)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
