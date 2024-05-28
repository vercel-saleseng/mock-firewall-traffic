import { sendTraffic } from '../lib';

export const preferredRegion = ['lhr1', 'dub1'];
export const runtime = 'edge';
export const maxDuration = 60;

export const GET = async () => sendTraffic();
