import { sendTraffic } from '../lib';

export const preferredRegion = ['lhr1', 'dub1'];
export const runtime = 'edge';

export const GET = async () => sendTraffic();
