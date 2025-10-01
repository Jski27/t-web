import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
  Title,
  ArcElement
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
  Title,
  ArcElement
);

import { percentChange, formatNumber, kFormat } from './dashboard-utils';
import { buildMockDataset, computeHeadlineMetrics, deriveInsights } from '../services/analyticsService';
import { evaluateRules } from '../services/businessRules';

// Seeded / generated mock dataset factory
const buildMock = buildMockDataset;

const PASSWORD = 't-hein-admin';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } })
};

const Dashboard = () => {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [range, setRange] = useState(30);
  const [dataset, setDataset] = useState(() => buildMock(range));
  const [insights, setInsights] = useState([]);
  const [ruleFindings, setRuleFindings] = useState([]);
  const [dark, setDark] = useState(true);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    const ds = buildMock(range);
    setDataset(ds);
  }, [range]);

  useEffect(() => {
    const cl = document.documentElement.classList;
    if (dark) cl.add('dark'); else cl.remove('dark');
  }, [dark]);

  const toggleTheme = () => setDark(d => !d);
  const refreshData = () => {
    const ds = buildMock(range);
    setDataset(ds);
  };
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `analytics-mock-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === PASSWORD) setAuthed(true); else alert('Incorrect password');
  };

  const pageViewsData = useMemo(() => {
    const labels = dataset.pageViews.map(p => p.date.slice(5));
    return {
      labels,
      datasets: [
        {
          label: 'Page Views',
          data: dataset.pageViews.map(p => p.value),
          fill: true,
          tension: 0.35,
          borderColor: '#14f1ff',
          backgroundColor: (ctx) => {
            const { chart } = ctx;
            const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, 'rgba(20,241,255,0.45)');
            gradient.addColorStop(1, 'rgba(20,241,255,0)');
            return gradient;
          },
          pointRadius: 2,
          pointBackgroundColor: '#14f1ff'
        }
      ]
    };
  }, [dataset]);

  const ctaBarData = useMemo(() => ({
    labels: dataset.ctaDistribution.map(c => c.label),
    datasets: [{
      label: 'CTA Clicks',
      data: dataset.ctaDistribution.map(c => c.value),
      backgroundColor: ['#14f1ff','#ff007a','#6a00ff','#4effa1'],
      borderRadius: 10,
      borderWidth: 0
    }]
  }), [dataset]);

  const deviceDoughnut = useMemo(() => ({
    labels: dataset.devices.map(d => d.label),
    datasets: [{
      data: dataset.devices.map(d => d.value),
      backgroundColor: ['#14f1ff','#ff007a','#6a00ff'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  }), [dataset]);

  const referrerDoughnut = useMemo(() => ({
    labels: dataset.referrers.map(d => d.label),
    datasets: [{
      data: dataset.referrers.map(d => d.value),
      backgroundColor: ['#14f1ff','#ff007a','#6a00ff','#ffb800','#4effa1'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  }), [dataset]);

  const sessionsLine = useMemo(() => ({
    labels: dataset.sessions.map(p => p.date.slice(5)),
    datasets: [{
      label: 'Sessions',
      data: dataset.sessions.map(p => p.value),
      borderColor: '#ff007a',
      tension: 0.35,
      pointRadius: 0,
      fill: false
    }]
  }), [dataset]);

  const clicksLine = useMemo(() => ({
    labels: dataset.clicks.map(p => p.date.slice(5)),
    datasets: [{
      label: 'Clicks',
      data: dataset.clicks.map(p => p.value),
      borderColor: '#6a00ff',
      tension: 0.35,
      pointRadius: 0,
      fill: false
    }]
  }), [dataset]);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#e5e7eb', font: { size: 12 } } },
      title: { display: false },
      tooltip: { backgroundColor: '#0f172a', borderColor: '#14f1ff', borderWidth: 1 }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
    }
  };

  const doughnutOptions = {
    plugins: {
      legend: { position: 'bottom', labels: { color: '#e5e7eb', boxWidth: 12 } },
      tooltip: { backgroundColor: '#0f172a', borderColor: '#14f1ff', borderWidth: 1 }
    },
    cutout: '56%'
  };

  const metrics = useMemo(() => {
    const headline = computeHeadlineMetrics(dataset);
    return [
      { label: 'Page Views', value: headline.pageViews.current, change: percentChange(headline.pageViews.current, headline.pageViews.previous) },
      { label: 'Sessions', value: headline.sessions.current, change: percentChange(headline.sessions.current, headline.sessions.previous) },
      { label: 'Clicks', value: headline.clicks.current, change: percentChange(headline.clicks.current, headline.clicks.previous) }
    ];
  }, [dataset]);

  useEffect(()=>{
    setInsights(deriveInsights(dataset));
    setRuleFindings(evaluateRules(dataset));
  }, [dataset]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-white p-6">
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl w-full max-w-sm space-y-5">
          <h1 className="font-display text-2xl font-semibold mb-2 text-center">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full bg-dark/40 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon"
          />
          <button type="submit" className="w-full py-2.5 rounded-md bg-neon text-dark font-semibold hover:scale-[1.02] transition shadow-neon">Access</button>
          <p className="text-[10px] text-white/40 tracking-wide text-center">Unauthorized access is prohibited.</p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white pb-32">
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <h1 className="font-display text-xl tracking-wide">Analytics Dashboard</h1>
        <div className="ml-auto flex items-center gap-3">
          <select value={range} onChange={e=>setRange(Number(e.target.value))} className="bg-dark/60 border border-white/10 rounded-md text-xs px-2 py-1 focus:outline-none focus:ring-2 focus:ring-neon">
            {[7,14,30,60,90].map(r=> <option key={r} value={r}>{r}d</option>)}
          </select>
          <button onClick={refreshData} className="text-xs px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10">Refresh</button>
          <button onClick={exportJSON} className="text-xs px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10">Export</button>
          <button onClick={()=>setShowRaw(r=>!r)} className="text-xs px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10">{showRaw ? 'Hide Raw' : 'Raw'}</button>
          <button onClick={toggleTheme} className="text-xs px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10">{dark ? 'Light' : 'Dark'}</button>
          <button onClick={() => setAuthed(false)} className="text-xs text-white/60 hover:text-accent transition">Logout</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-16">
        {/* Metric Headline Cards */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">
            {metrics.map((m,i)=>(
              <motion.div key={m.label} variants={cardVariants} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }} className="glass rounded-xl p-6 flex flex-col gap-3">
                <span className="text-xs tracking-wide text-white/50">{m.label}</span>
                <span className="font-display text-3xl font-semibold text-neon">{kFormat(m.value)}</span>
                <span className={`text-xs font-medium ${m.change>=0 ? 'text-emerald-400' : 'text-red-400'}`}>{m.change>=0?'+':''}{m.change.toFixed(1)}%</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Insights & Rule Findings */}
        <section className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="font-display text-lg md:text-xl font-semibold flex items-center gap-2"><span className="text-neon">A.</span> Automated Insights</h2>
            <div className="glass rounded-xl divide-y divide-white/5 overflow-hidden">
              {insights.length === 0 && <p className="px-5 py-4 text-sm text-white/50">No notable insights detected.</p>}
              {insights.map((ins,i)=>(
                <div key={i} className="px-5 py-4 text-sm flex gap-3 items-start">
                  <span className="text-neon text-xs mt-0.5">{ins.type.toUpperCase()}</span>
                  <p className="text-white/80 leading-relaxed">{ins.message}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-lg md:text-xl font-semibold flex items-center gap-2"><span className="text-neon">B.</span> Business Rule Findings</h2>
            <div className="glass rounded-xl divide-y divide-white/5 overflow-hidden">
              {ruleFindings.length === 0 && <p className="px-5 py-4 text-sm text-white/50">No rule triggers.</p>}
              {ruleFindings.map(r => (
                <div key={r.id} className="px-5 py-4 text-sm flex gap-3 items-start">
                  <span className={`text-xs mt-0.5 font-semibold ${r.severity==='warn'?'text-amber-400':'text-cyan-300'}`}>{r.severity.toUpperCase()}</span>
                  <p className="text-white/80 leading-relaxed">{r.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traffic & Engagement Overview */}
        <section className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-lg md:text-2xl font-semibold mb-4 flex items-center gap-2"><span className="text-neon">1.</span> Page Views</h2>
              <div className="glass rounded-xl p-4 h-72">
                <Line data={pageViewsData} options={commonOptions} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="glass rounded-xl p-4 h-60">
                <Line data={sessionsLine} options={commonOptions} />
              </div>
              <div className="glass rounded-xl p-4 h-60">
                <Line data={clicksLine} options={commonOptions} />
              </div>
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-semibold mb-3 tracking-wide text-white/70">Device Mix</h3>
              <div className="glass rounded-xl p-4 h-72 flex items-center justify-center">
                <Doughnut data={deviceDoughnut} options={doughnutOptions} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 tracking-wide text-white/70">Referrer Breakdown</h3>
              <div className="glass rounded-xl p-4 h-72 flex items-center justify-center">
                <Doughnut data={referrerDoughnut} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Performance */}
        <section>
          <h2 className="font-display text-lg md:text-2xl font-semibold mb-6 flex items-center gap-2"><span className="text-neon">2.</span> CTA Performance</h2>
          <div className="glass rounded-xl p-4 h-80">
            <Bar data={ctaBarData} options={commonOptions} />
          </div>
        </section>

        {/* Geography Table */}
        <section>
          <h2 className="font-display text-lg md:text-2xl font-semibold mb-6 flex items-center gap-2"><span className="text-neon">3.</span> Top Regions</h2>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/60 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3">Region</th>
                  <th className="text-left px-4 py-3">Value</th>
                  <th className="text-left px-4 py-3">Share</th>
                </tr>
              </thead>
              <tbody>
                {dataset.geo.map((g,i)=>{
                  const total = dataset.geo.reduce((a,b)=>a+b.value,0);
                  const pct = (g.value/total)*100;
                  return (
                    <tr key={g.label} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-4 py-2 font-medium text-white/80">{g.label}</td>
                      <td className="px-4 py-2 text-white/70">{formatNumber(g.value)}</td>
                      <td className="px-4 py-2 text-white/50">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 rounded-full bg-neon" style={{width: pct.toFixed(2)+'%'}} />
                          <span className="text-xs">{pct.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Raw JSON toggle */}
        {showRaw && (
          <section>
            <h2 className="font-display text-lg md:text-2xl font-semibold mb-4">Raw Dataset</h2>
            <pre className="glass p-4 rounded-xl max-h-96 overflow-auto text-xs whitespace-pre-wrap leading-relaxed">
{JSON.stringify(dataset,null,2)}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
