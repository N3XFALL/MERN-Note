import React from 'react'
import {TriangleAlert} from 'lucide-react'

export function RateLimitedUI() {
  return (
    <div className="bg-blue-500/5 border border-blue-500 rounded-[20px]">
        <div className="mx-auto max-w-7xl p-6">
            <div className="flex items-center gap-6">
                <div className="bg-blue-500/15 border-blue-500 border flex justify-center items-center p-4 rounded-[50%]">
                    <TriangleAlert size={40} className="text-blue-500" />
                </div>
                <div>
                    <h1 className="text-blue-300 text-lg font-bold">Rate limit reached.
                    </h1>
                    <p className="text-blue-300">You've made too many requests in a short period of time.</p>
                    <p className="text-blue-300">Please Try Again Later.</p>
                </div>
                

            </div>
        </div>
    </div>
  )
}

