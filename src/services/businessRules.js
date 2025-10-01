// Business rule registry for analytics domain.
// Each rule receives the dataset and returns either null or a structured finding.

export const rules = [
  function highBounce(dataset) {
    // Placeholder: fabricate bounce from sessions vs clicks heuristic
    const totalSessions = dataset.sessions.reduce((a,b)=>a+b.value,0);
    const totalClicks = dataset.clicks.reduce((a,b)=>a+b.value,0);
    const bounceRate = totalClicks === 0 ? 0 : Math.max(0, 100 - (totalClicks / (totalSessions || 1)) * 18);
    if (bounceRate > 60) {
      return { id: 'high-bounce', severity: 'warn', message: `Estimated bounce rate elevated (~${bounceRate.toFixed(1)}%). Consider stronger first-screen CTA.` };
    }
    return null;
  },
  function weakCTA(dataset) {
    const total = dataset.ctaDistribution.reduce((a,b)=>a+b.value,0);
    const book = dataset.ctaDistribution.find(c=>c.label === 'Book Now');
    if (book && (book.value/total) < 0.18) {
      return { id: 'weak-book-cta', severity: 'info', message: 'Book Now CTA engagement comparatively low (<18%). Test alternate wording or placement.' };
    }
    return null;
  },
  function geoConcentration(dataset) {
    const total = dataset.geo.reduce((a,b)=>a+b.value,0);
    const top = dataset.geo[0];
    if (top && top.value/total > 0.45) {
      return { id: 'geo-skew', severity: 'info', message: `${top.label} represents ${(top.value/total*100).toFixed(1)}% of region traffic. Explore diversification.` };
    }
    return null;
  }
];

export function evaluateRules(dataset) {
  return rules.map(r => r(dataset)).filter(Boolean);
}
