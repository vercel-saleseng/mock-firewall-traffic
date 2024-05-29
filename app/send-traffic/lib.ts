import { get } from '@vercel/edge-config';
import { waitUntil } from '@vercel/functions';

type MockTrafficConfig = {
	siteUrl: string;
	numRequests: number;
	numConcurrency: number;
};

export const mockTraffic = async () => {
	const mockTrafficConfig = await get<MockTrafficConfig>('mockTraffic');
	if (!mockTrafficConfig) {
		return new Response('Missing mockTraffic config', { status: 400 });
	}

	waitUntil(sendTraffic(mockTrafficConfig));
	return new Response('Processing traffic simulation w/config ' + JSON.stringify(mockTrafficConfig));
};

export const sendTraffic = async (config: MockTrafficConfig) => {
	const { siteUrl, numRequests, numConcurrency } = config;

	const createRequest = async (): Promise<void> => {
		try {
			await fetch(siteUrl);
		} catch (error: any) {
			console.error(`Request failed: ${error.message}`);
		}
	};

	const limitConcurrency = async (tasks: (() => Promise<void>)[], concurrency: number): Promise<void> => {
		const executing: Promise<void>[] = [];
		for (const task of tasks) {
			const p = task().then(() => {
				const index = executing.indexOf(p);
				if (index > -1) {
					executing.splice(index, 1);
				}
			});
			executing.push(p);
			if (executing.length >= concurrency) {
				await Promise.race(executing);
			}
		}
		await Promise.all(executing);
	};

	const requests = Array.from({ length: numRequests }, () => createRequest);

	try {
		await limitConcurrency(
			requests.map((req) => req),
			numConcurrency
		);
		return { status: 200 };
	} catch (error) {
		console.error('Traffic simulation failed', error);
		return { status: 500 };
	}
};
