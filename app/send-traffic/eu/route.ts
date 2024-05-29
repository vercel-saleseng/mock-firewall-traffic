import { mockTraffic } from '../lib';

export const preferredRegion = ['cdg1', 'arn1'];
export const runtime = 'edge';
export const maxDuration = 60;

export const GET = async () => mockTraffic();
