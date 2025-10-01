// Central service layer for analytics data and business logic hooks.
// Later you can replace the generators with real API fetches.
import { generateTimeSeries, generateDistribution } from '../sections/dashboard-utils';

export function buildMockDataset(range) {
  const pageViews = generateTimeSeries(range, 300, 0.55);
  const sessions = generateTimeSeries(range, 120, 0.5);
  const clicks = generateTimeSeries(range, 800, 0.7);
  const ctaDistribution = generateDistribution(['Listen', 'Book Now', 'Gallery', 'Contact'], 2000);
  const geo = generateDistribution(['US', 'UK', 'DE', 'NL', 'CA', 'AU'], 3500).sort((a,b)=>b.value-a.value);
  const devices = generateDistribution(['Mobile','Desktop','Tablet'], 1800);
  const referrers = generateDistribution(['Direct','Instagram','TikTok','Email','Other'], 2200);
  const generatedAt = new Date().toISOString();
  return { pageViews, sessions, clicks, ctaDistribution, geo, devices, referrers, meta: { range, generatedAt } };
}

export function computeHeadlineMetrics(dataset) {
  const sum = (arr) => arr.reduce((a,b)=>a + b.value, 0);
  const pv = sum(dataset.pageViews);
  const sess = sum(dataset.sessions);
  const clk = sum(dataset.clicks);
  // Fake previous period deltas; you can replace with persisted baseline later.
  const metrics = {
    pageViews: { current: pv, previous: pv * 0.92 },
    sessions: { current: sess, previous: sess * 0.9 },
    clicks: { current: clk, previous: clk * 0.88 }
  };
  return metrics;
}

export function deriveInsights(dataset) {
  const insights = [];
  const totalCTA = dataset.ctaDistribution.reduce((a,b)=>a+b.value,0);
  const topCTA = dataset.ctaDistribution.slice().sort((a,b)=>b.value-a.value)[0];
  if (topCTA) {
    const pct = (topCTA.value/totalCTA)*100;
    insights.push({ type: 'cta', message: `"${topCTA.label}" accounts for ${pct.toFixed(1)}% of CTA clicks.` });
  }
  // Trend detection: simple slope check on last 5 page views
  const lastFive = dataset.pageViews.slice(-5).map(p=>p.value);
  if (lastFive.length === 5) {
    const avgFirst = (lastFive[0] + lastFive[1]) / 2;
    const avgLast = (lastFive[3] + lastFive[4]) / 2;
    const change = ((avgLast - avgFirst)/avgFirst) * 100;
    if (Math.abs(change) > 10) {
      insights.push({ type: 'trend', message: `Page views ${change > 0 ? 'up' : 'down'} ${change.toFixed(1)}% over the recent window.` });
    }
  }
  // Device dominance
  const topDevice = dataset.devices.slice().sort((a,b)=>b.value-a.value)[0];
  if (topDevice && topDevice.value / dataset.devices.reduce((a,b)=>a+b.value,0) > 0.55) {
    insights.push({ type: 'device', message: `${topDevice.label} dominates device mix (>55%). Consider optimizing that experience.` });
  }
  return insights;
}
