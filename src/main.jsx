import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import App from './sections/App';
import Dashboard from './sections/Dashboard';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	</BrowserRouter>
);
