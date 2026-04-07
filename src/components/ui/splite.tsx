'use client'

import { Suspense, lazy } from 'react'

// Only load Spline component on client
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
             <div className="absolute inset-0 border-t-2 border-[#00f0ff] rounded-full animate-spin"></div>
             <div className="absolute inset-2 border-r-2 border-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
             <div className="absolute inset-4 border-b-2 border-purple-500 rounded-full animate-spin"></div>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
