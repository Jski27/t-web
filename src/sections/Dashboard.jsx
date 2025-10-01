import React, { useState, useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
  Title
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
  Title
);

// Mock analytics data
const mockData = {
  pageViews: [
    { date: '2025-09-01', views: 120 },
    { date: '2025-09-02', views: 180 },
    { date: '2025-09-03', views: 90 },
    { date: '2025-09-04', views: 240 },
    { date: '2025-09-05', views: 320 },
    { date: '2025-09-06', views: 280 },
    { date: '2025-09-07', views: 300 },
  ],
  buttonClicks: {
    listen: 420,
    book: 610
  },
  engagement: {
    avgSessionMinutes: 3.6,
    bounceRate: 42, // percent
    totalClicks: 1580
  }
};

const PASSWORD = 't-hein-admin';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } })
};

const Dashboard = () => {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === PASSWORD) setAuthed(true); else alert('Incorrect password');
  };

  const pageViewsData = useMemo(() => {
    const labels = mockData.pageViews.map(p => p.date.slice(5));
    return {
      labels,
      datasets: [
        {
          label: 'Page Views',
            data: mockData.pageViews.map(p => p.views),
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
            pointRadius: 3,
            pointBackgroundColor: '#14f1ff'
        }
      ]
    };
  }, []);

  const buttonClicksData = useMemo(() => {
    return {
      labels: ['Listen', 'Book Now'],
      datasets: [
        {
          label: 'Clicks',
          data: [mockData.buttonClicks.listen, mockData.buttonClicks.book],
          backgroundColor: ['#14f1ff', '#ff007a'],
          borderRadius: 8,
          borderWidth: 0
        }
      ]
    };
  }, []);

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
    <div className="min-h-screen bg-dark text-white pb-20">
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/40 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl tracking-wide">Dashboard</h1>
        <button onClick={() => setAuthed(false)} className="text-xs text-white/60 hover:text-accent transition">Logout</button>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-14">
        <section>
          <h2 className="font-display text-lg md:text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-neon">1.</span> Page Views
          </h2>
          <div className="glass rounded-xl p-4 h-72">
            <Line data={pageViewsData} options={commonOptions} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg md:text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-neon">2.</span> Most Clicked Buttons
          </h2>
          <div className="glass rounded-xl p-4 h-72">
            <Bar data={buttonClicksData} options={commonOptions} />
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg md:text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-neon">3.</span> Engagement Metrics
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: 'Avg Session (min)', value: mockData.engagement.avgSessionMinutes, fmt: v => v.toFixed(1) },
              { label: 'Bounce Rate', value: mockData.engagement.bounceRate, fmt: v => v + '%' },
              { label: 'Total Clicks', value: mockData.engagement.totalClicks, fmt: v => v.toLocaleString() }
            ].map((m, i) => (
              <motion.div
                key={m.label}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                custom={i}
                viewport={{ once: true, amount: 0.4 }}
                className="glass rounded-xl p-6 flex flex-col"
              >
                <span className="text-xs tracking-wide text-white/50 mb-2">{m.label}</span>
                <span className="font-display text-3xl font-semibold text-neon">{m.fmt(m.value)}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
