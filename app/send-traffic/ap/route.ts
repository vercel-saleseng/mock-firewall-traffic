import { mockTraffic } from '../lib';

export const preferredRegion = ['hnd1', 'bom1'];
export const runtime = 'edge';
export const maxDuration = 60;

export const GET = async () => mockTraffic();
