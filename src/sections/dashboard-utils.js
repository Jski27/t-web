import { subDays, format } from 'date-fns';

export function generateTimeSeries(days = 30, base = 200, variance = 0.4) {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const factor = 1 + (Math.sin(i / 3) * 0.15) + (Math.random() - 0.5) * variance;
    data.push({ date: format(date, 'yyyy-MM-dd'), value: Math.round(base * factor) });
  }
  return data;
}

export function generateDistribution(labels, total = 1000) {
  const parts = labels.map(() => Math.random());
  const sum = parts.reduce((a, b) => a + b, 0);
  return labels.map((l, i) => ({ label: l, value: Math.round((parts[i] / sum) * total) }));
}

export function percentChange(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function formatNumber(num) {
  return Intl.NumberFormat().format(num);
}

export function kFormat(num) {
  if (num < 1000) return num.toString();
  return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
}
