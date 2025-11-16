'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gauge, Thermometer, Droplet } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function LIMSInstruments() {
  const [showVideo, setShowVideo] = useState(false)
  const [currentVideo, setCurrentVideo] = useState('')

  const openVideo = (videoId: string) => {
    setCurrentVideo(videoId)
    setShowVideo(true)
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6">
      <div className="space-y-6">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Instruments
          </h2>
          <p className="text-muted-foreground mt-1">Monitor and manage laboratory instruments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 'HPLC-001', name: 'Agilent 1290 Infinity II', status: 'Ready', temp: '30.0°C', pressure: '185 bar', flow: '1.0 mL/min' },
            { id: 'HPLC-002', name: 'Agilent 1290 Infinity II', status: 'Running', temp: '35.0°C', pressure: '192 bar', flow: '0.8 mL/min' },
            { id: 'HPLC-003', name: 'Waters Acquity UPLC', status: 'Ready', temp: '28.0°C', pressure: '178 bar', flow: '1.2 mL/min' },
            { id: 'HPLC-004', name: 'Shimadzu Prominence', status: 'Maintenance', temp: '25.0°C', pressure: '0 bar', flow: '0.0 mL/min' },
            { id: 'HPLC-005', name: 'Thermo Vanquish', status: 'Ready', temp: '30.0°C', pressure: '188 bar', flow: '1.1 mL/min' },
            { id: 'HPLC-006', name: 'PerkinElmer Flexar', status: 'Running', temp: '33.0°C', pressure: '195 bar', flow: '0.9 mL/min' },
          ].map((instrument) => (
            <Card key={instrument.id} className="hover:shadow-lg transition-shadow duration-200 border-muted">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{instrument.name}</CardTitle>
                  <Badge
                    variant={instrument.status === 'Ready' ? 'default' : 'secondary'}
                    className={
                      instrument.status === 'Ready' 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : instrument.status === 'Running'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }
                  >
                    {instrument.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-mono mt-1">{instrument.id}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted hover:to-muted/50 cursor-help transition-all duration-200">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#b6c2ed] dark:bg-[#020308] flex items-center justify-center">
                            <Thermometer className="h-4 w-4 text-[#0a1128] dark:text-[#b6c2ed]" />
                          </div>
                          <span className="text-sm font-medium">Column Temp</span>
                        </div>
                        <span className="text-sm font-mono font-semibold">{instrument.temp}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs shadow-lg">
                      <div className="space-y-2">
                        <p className="font-semibold">Column Temperature</p>
                        <p className="text-xs leading-relaxed">
                          Maintains consistent temperature for reproducible retention times.
                        </p>
                        <button
                          onClick={() => openVideo('m-bH_mQQ-Dg')}
                          className="text-xs text-[#4cc9eb] hover:text-[#88dbf2] hover:underline font-medium"
                        >
                          Watch tutorial video →
                        </button>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted hover:to-muted/50 cursor-help transition-all duration-200">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#a9c9ff] dark:bg-[#000610] flex items-center justify-center">
                            <Gauge className="h-4 w-4 text-[#001f54] dark:text-[#a9c9ff]" />
                          </div>
                          <span className="text-sm font-medium">Pressure</span>
                        </div>
                        <span className="text-sm font-mono font-semibold">{instrument.pressure}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs shadow-lg">
                      <div className="space-y-2">
                        <p className="font-semibold">System Pressure</p>
                        <p className="text-xs leading-relaxed">
                          Current backpressure in the system. High pressure may indicate column blockage.
                        </p>
                        <button
                          onClick={() => openVideo('KnFbPtieRTE')}
                          className="text-xs text-[#4cc9eb] hover:text-[#88dbf2] hover:underline font-medium"
                        >
                          Watch tutorial video →
                        </button>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted hover:to-muted/50 cursor-help transition-all duration-200">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#b3d9fd] dark:bg-[#010d18] flex items-center justify-center">
                            <Droplet className="h-4 w-4 text-[#034078] dark:text-[#b3d9fd]" />
                          </div>
                          <span className="text-sm font-medium">Flow Rate</span>
                        </div>
                        <span className="text-sm font-mono font-semibold">{instrument.flow}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs shadow-lg">
                      <div className="space-y-2">
                        <p className="font-semibold">Flow Rate</p>
                        <p className="text-xs leading-relaxed">
                          Mobile phase flow rate through the column. Affects separation time and resolution.
                        </p>
                        <button
                          onClick={() => openVideo('m-bH_mQQ-Dg')}
                          className="text-xs text-[#4cc9eb] hover:text-[#88dbf2] hover:underline font-medium"
                        >
                          Watch tutorial video →
                        </button>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Tutorial Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
