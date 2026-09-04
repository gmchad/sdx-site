'use client'

import dynamic from 'next/dynamic';

// CanvasDebugPanel renders nothing for normal users (it's a hidden dev tool
// gated behind window.sdx.tweak()). Loading it via next/dynamic keeps its
// code out of the shared layout chunk entirely; the ssr:false + dynamic()
// call must live in a Client Component, hence this thin wrapper.
const CanvasDebugPanel = dynamic(() => import('./CanvasDebugPanel'), { ssr: false });

export default CanvasDebugPanel;
