import { sendTraffic } from '../lib';

export const preferredRegion = ['iad1', 'sfo1'];
export const runtime = 'edge';

export const GET = async () => sendTraffic();
