'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { ChevronDown, ChevronRight, Play, Info, AlertTriangle, CheckCircle2, X, Thermometer, Gauge, Droplet } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const steps = [
  {
    id: 1,
    title: 'Prepare Instrument',
    description: 'Verify instrument status and prepare for calibration',
    videoPlaceholder: 'Instrument Preparation Guide',
  },
  {
    id: 2,
    title: 'Load Standard / Reagent',
    description: 'Load calibration standards and verify reagent integrity',
    videoPlaceholder: 'Standard Loading Procedure',
  },
  {
    id: 3,
    title: 'Run Calibration',
    description: 'Execute automated calibration sequence',
    videoPlaceholder: 'Calibration Execution',
  },
  {
    id: 4,
    title: 'Review QC Results',
    description: 'Analyze calibration curves and QC metrics',
    videoPlaceholder: 'QC Results Interpretation',
  },
  {
    id: 5,
    title: 'Lock Settings',
    description: 'Save and lock calibration parameters',
    videoPlaceholder: 'Finalizing Calibration',
  },
]

export function GuidedCalibration() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showWarning, setShowWarning] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [events, setEvents] = useState<Array<{ time: string; action: string; element: string }>>([])

  const toggleStep = (stepId: number) => {
    const newExpanded = expandedStep === stepId ? null : stepId
    setExpandedStep(newExpanded)
    
    if (newExpanded) {
      addEvent('Expanded step', `Step ${stepId}: ${steps.find(s => s.id === stepId)?.title}`)
    }
  }

  const toggleComplete = (stepId: number) => {
    const newCompleted = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId]
    
    setCompletedSteps(newCompleted)
    addEvent('Completed step', `Step ${stepId}: ${steps.find(s => s.id === stepId)?.title}`)
    
    if (newCompleted.length === steps.length) {
      setShowSuccess(true)
      setShowWarning(false)
    }
  }

  const addEvent = (action: string, element: string) => {
    const now = new Date()
    const time = now.toLocaleTimeString()
    setEvents(prev => [{ time, action, element }, ...prev.slice(0, 9)])
  }

  const progress = (completedSteps.length / steps.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Guided Calibration</h2>
        <p className="text-muted-foreground">
          {'HPLC Instrument Portal - Automated Onboarding Workflow'}
        </p>
      </div>

      {/* Notification Banners */}
      {showWarning && (
        <Alert className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900">
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-800 dark:text-orange-300 flex items-center justify-between">
            <span>{'Calibration drift detected in last 3 runs. Please recalibrate before proceeding.'}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowWarning(false)
                addEvent('Dismissed warning banner', 'Calibration drift warning')
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {showSuccess && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-300">
            {'Calibration completed successfully. QC results within expected range.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{'Calibration Progress'}</CardTitle>
              <CardDescription>
                {'Step '}{completedSteps.length}{' of '}{steps.length}{' · '}{Math.round(progress)}{'% completed'}
              </CardDescription>
            </div>
            <Badge variant={completedSteps.length === steps.length ? 'default' : 'secondary'}>
              {completedSteps.length === steps.length ? 'Complete' : 'In Progress'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Panel: Instrument Dashboard */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{'Instrument Status'}</CardTitle>
            <CardDescription>{'Agilent 1290 Infinity II HPLC'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{'Status'}</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900">
                {'Ready'}
              </Badge>
            </div>

            <div className="space-y-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-help"
                      onClick={() => addEvent('Viewed tooltip', 'Column Temperature')}
                    >
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{'Column Temp'}</span>
                      </div>
                      <span className="text-sm font-mono">{'30.0°C'}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-semibold">{'Column Temperature'}</p>
                      <p className="text-xs">
                        {'Maintains consistent temperature for reproducible retention times. Typical range: 25-40°C for reversed-phase separations.'}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-help"
                      onClick={() => addEvent('Viewed tooltip', 'System Pressure')}
                    >
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{'Pressure'}</span>
                      </div>
                      <span className="text-sm font-mono">{'185 bar'}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-semibold">{'System Pressure'}</p>
                      <p className="text-xs">
                        {'Current backpressure in the system. High pressure may indicate column blockage or increased mobile phase viscosity.'}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-help"
                      onClick={() => addEvent('Viewed tooltip', 'Flow Rate')}
                    >
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{'Flow Rate'}</span>
                      </div>
                      <span className="text-sm font-mono">{'1.0 mL/min'}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-semibold">{'Flow Rate'}</p>
                      <p className="text-xs">
                        {'Mobile phase flow rate through the column. Affects separation time and resolution. Typical range: 0.1-2.0 mL/min.'}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-help"
                      onClick={() => addEvent('Viewed tooltip', 'Injection Volume')}
                    >
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{'Injection Vol'}</span>
                      </div>
                      <span className="text-sm font-mono">{'5.0 μL'}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-semibold">{'Injection Volume'}</p>
                      <p className="text-xs">
                        {'Sample volume injected per run. Larger volumes increase sensitivity but may cause peak distortion. Adjust based on detector sensitivity.'}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: Guided Checklist */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{'Calibration Checklist'}</CardTitle>
            <CardDescription>{'Follow each step to complete instrument calibration'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step) => {
              const isExpanded = expandedStep === step.id
              const isCompleted = completedSteps.includes(step.id)

              return (
                <div key={step.id} className="border rounded-lg">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => toggleComplete(step.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div>
                        <h4 className="font-medium">
                          {'Step '}{step.id}{': '}{step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="p-4 pt-0 space-y-3 border-t">
                      {/* Video Placeholder */}
                      <div 
                        className="aspect-video bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80"
                        onClick={() => addEvent('Played video', step.videoPlaceholder)}
                      >
                        <div className="text-center">
                          <Play className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium">{step.videoPlaceholder}</p>
                        </div>
                      </div>

                      {/* Step Instructions */}
                      <div className="text-sm space-y-2">
                        <p className="font-medium">{'Instructions:'}</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>{'Review the video tutorial above'}</li>
                          <li>{'Follow on-screen prompts from the instrument'}</li>
                          <li>{'Verify all parameters are within specification'}</li>
                          <li>{'Mark as complete when finished'}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Panel */}
      <Card>
        <CardHeader>
          <CardTitle>{'Guidance Analytics'}</CardTitle>
          <CardDescription>{'Recent user interactions with guidance elements'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                {'No events recorded yet. Interact with tooltips and steps to see analytics.'}
              </p>
            ) : (
              <div className="space-y-1">
                {events.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm py-2 border-b last:border-0">
                    <span className="text-muted-foreground font-mono text-xs">{event.time}</span>
                    <span className="font-medium min-w-32">{event.action}</span>
                    <span className="text-muted-foreground">{event.element}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
