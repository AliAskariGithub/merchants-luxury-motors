export type CarTint = {
  top: string;
  mid: string;
  low: string;
  deep: string;
  lowerBand: string;
};

export const carTints = {
  SILVER: {
    top: "#FFFFFF",
    mid: "#A7B0BB",
    low: "#7C848E",
    deep: "#434A51",
    lowerBand: "#242A31",
  },
  GRAPHITE: {
    top: "#F4F6F8",
    mid: "#7E868F",
    low: "#585F67",
    deep: "#2B3036",
    lowerBand: "#1B1F24",
  },
  MIDNIGHT: {
    top: "#DCE3EB",
    mid: "#5A626C",
    low: "#3B4149",
    deep: "#1A1E23",
    lowerBand: "#12161A",
  },
} satisfies Record<string, CarTint>;

function expand(hex: string): string {
  const value = hex.trim();
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    const [r, g, b] = value.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return value.toLowerCase();
}

function toChannels(hex: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ];
}

function toHex(channels: [number, number, number]): string {
  return (
    "#" +
    channels
      .map((value) => {
        const clamped = Math.max(0, Math.min(255, Math.round(value)));
        return clamped.toString(16).padStart(2, "0");
      })
      .join("")
  );
}

function mix(hex: string, target: number, amount: number): string {
  const channels = toChannels(hex);
  return toHex(
    channels.map((value) => value + (target - value) * amount) as [
      number,
      number,
      number,
    ],
  );
}

export function makePaintRamp(input: string): CarTint {
  const base = expand(input);
  return {
    top: mix(base, 255, 0.86),
    mid: base,
    low: mix(base, 0, 0.28),
    deep: mix(base, 0, 0.56),
    lowerBand: mix(base, 0, 0.74),
  };
}

export function shade(input: string, amount: number): string {
  const base = expand(input);
  if (amount >= 0) return mix(base, 255, amount);
  return mix(base, 0, -amount);
}
