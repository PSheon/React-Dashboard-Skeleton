import React from 'react';
import { Redirect } from 'react-router-dom';

const MarketConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/market/:marketId',
			component: () => <Redirect to="/admin/maintenance" />
		},
		{
			path: '/market',
			component: React.lazy(() => import('./MarketPage'))
		}
	]
};

export default MarketConfig;
