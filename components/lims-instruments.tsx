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
        <div>
          <h2 className="text-2xl font-bold text-foreground">Instruments</h2>
          <p className="text-muted-foreground">Monitor and manage laboratory instruments</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 'HPLC-001', name: 'Agilent 1290 Infinity II', status: 'Ready', temp: '30.0°C', pressure: '185 bar', flow: '1.0 mL/min' },
            { id: 'HPLC-002', name: 'Agilent 1290 Infinity II', status: 'Running', temp: '35.0°C', pressure: '192 bar', flow: '0.8 mL/min' },
            { id: 'HPLC-003', name: 'Waters Acquity UPLC', status: 'Ready', temp: '28.0°C', pressure: '178 bar', flow: '1.2 mL/min' },
          ].map((instrument) => (
            <Card key={instrument.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{instrument.name}</CardTitle>
                  <Badge
                    variant={instrument.status === 'Ready' ? 'default' : 'secondary'}
                    className={instrument.status === 'Ready' ? 'bg-green-500' : ''}
                  >
                    {instrument.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-mono">{instrument.id}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-help">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Column Temp</span>
                        </div>
                        <span className="text-sm font-mono">{instrument.temp}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">Column Temperature</p>
                        <p className="text-xs">
                          Maintains consistent temperature for reproducible retention times.
                        </p>
                        <button
                          onClick={() => openVideo('9bZkp7q19f0')}
                          className="text-xs text-primary hover:underline"
                        >
                          Watch tutorial video
                        </button>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-help">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Pressure</span>
                        </div>
                        <span className="text-sm font-mono">{instrument.pressure}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">System Pressure</p>
                        <p className="text-xs">
                          Current backpressure in the system. High pressure may indicate column blockage.
                        </p>
                        <button
                          onClick={() => openVideo('L_LUpnjgPso')}
                          className="text-xs text-primary hover:underline"
                        >
                          Watch tutorial video
                        </button>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-help">
                        <div className="flex items-center gap-2">
                          <Droplet className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Flow Rate</span>
                        </div>
                        <span className="text-sm font-mono">{instrument.flow}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">Flow Rate</p>
                        <p className="text-xs">
                          Mobile phase flow rate through the column. Affects separation time and resolution.
                        </p>
                        <button
                          onClick={() => openVideo('oHg5SJYRHA0')}
                          className="text-xs text-primary hover:underline"
                        >
                          Watch tutorial video
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tutorial Video</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
