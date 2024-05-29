import { mockTraffic } from '../lib';

export const preferredRegion = ['iad1', 'sfo1'];
export const runtime = 'edge';
export const maxDuration = 60;

export const GET = async () => mockTraffic();
