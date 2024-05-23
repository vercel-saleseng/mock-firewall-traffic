import { get } from '@vercel/edge-config';
import { Sema } from 'async-sema';

type MockTrafficConfig = {
	siteUrl: string;
	numRequests: number;
	numConcurrency: number;
};

export const sendTraffic = async () => {
	const mockTrafficConfig = await get<MockTrafficConfig>('mockTraffic');
	if (!mockTrafficConfig) {
		return new Response('Missing mockTraffic config', { status: 400 });
	}

	const sema = new Sema(mockTrafficConfig.numConcurrency);
	const requests = Array.from({ length: mockTrafficConfig.numRequests }, () =>
		sema.acquire().then(() =>
			fetch(mockTrafficConfig.siteUrl)
				.catch((error: any) => {
					console.error(`Request failed: ${error.message}`);
				})
				.finally(() => sema.release())
		)
	);

	try {
		await Promise.all(requests);
		return new Response(`Traffic simulation completed - ${mockTrafficConfig.numRequests} requests sent`);
	} catch (error) {
		return new Response('Traffic simulation failed', { status: 500 });
	}
};
