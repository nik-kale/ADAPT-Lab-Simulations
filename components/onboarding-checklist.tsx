'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { ProductTour } from '@/components/product-tour'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const checklistSteps = [
  { 
    id: 1, 
    title: 'Watch Welcome Video',
    description: 'Get an overview of the ADAPT LIMS platform and learn about its key features for laboratory management.',
    videoId: 'm-bH_mQQ-Dg' // Laboratory Management System Introduction
  },
  { 
    id: 2, 
    title: 'Complete Interactive Tour',
    description: 'Take a guided tour through the platform to understand navigation, sample tracking, and reporting features.',
    requiresTour: true
  },
  { 
    id: 3, 
    title: 'Create First Sample',
    description: 'Learn how to register and track samples in the LIMS system with proper metadata and workflow assignments.',
    videoId: 'KnFbPtieRTE' // Sample Management Tutorial
  },
  { 
    id: 4, 
    title: 'Run QC Analysis',
    description: 'Understand quality control procedures, how to interpret results, and manage QC failures effectively.',
    videoId: 'm-bH_mQQ-Dg' // Laboratory Quality Control
  },
  { 
    id: 5, 
    title: 'Generate Report',
    description: 'Create comprehensive reports for regulatory compliance, including data visualization and export options.',
    videoId: 'KnFbPtieRTE' // Laboratory Reporting and Compliance
  },
]

export function OnboardingChecklist({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showTour, setShowTour] = useState(false)
  const [expandedSteps, setExpandedSteps] = useState<number[]>([])

  const progress = (completedSteps.length / checklistSteps.length) * 100

  const toggleComplete = (stepId: number) => {
    const step = checklistSteps.find(s => s.id === stepId)
    if (step?.requiresTour && !completedSteps.includes(stepId)) {
      setShowTour(true)
      return
    }
    
    setCompletedSteps(prev =>
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    )
  }

  const toggleExpanded = (stepId: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    )
  }

  const handleTourComplete = () => {
    setShowTour(false)
    setCompletedSteps(prev => [...prev, 2])
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 w-[420px]">
        <Card className="shadow-2xl border-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-base">Getting Started</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Learn the essentials with interactive tutorials and hands-on demos.
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{completedSteps.length} of {checklistSteps.length} completed</span>
                  <Badge variant={completedSteps.length === checklistSteps.length ? 'default' : 'secondary'}>
                    {Math.round(progress)}%
                  </Badge>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {checklistSteps.map((step) => {
                  const isCompleted = completedSteps.includes(step.id)
                  const isExpanded = expandedSteps.includes(step.id)
                  
                  return (
                    <Collapsible
                      key={step.id}
                      open={isExpanded}
                      onOpenChange={() => toggleExpanded(step.id)}
                    >
                      <div className="rounded-lg border bg-card hover:shadow-sm transition-all">
                        <div className="flex items-start gap-3 p-3">
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => toggleComplete(step.id)}
                            className="mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <CollapsibleTrigger asChild>
                              <button className="w-full text-left">
                                <div className="flex items-center justify-between gap-2">
                                  <p className={`text-sm font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                    {step.title}
                                  </p>
                                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                              </button>
                            </CollapsibleTrigger>
                          </div>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="px-3 pb-3 pl-11 space-y-3">
                            <p className="text-xs text-muted-foreground">
                              {step.description}
                            </p>
                            
                            {step.videoId && (
                              <div className="rounded-lg overflow-hidden border">
                                <iframe
                                  width="100%"
                                  height="200"
                                  src={`https://www.youtube.com/embed/${step.videoId}`}
                                  title={step.title}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full"
                                />
                              </div>
                            )}
                            
                            {step.requiresTour && (
                              <Button
                                onClick={() => setShowTour(true)}
                                size="sm"
                                className="w-full"
                                variant="outline"
                              >
                                Start Interactive Tour
                              </Button>
                            )}
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  )
                })}
              </div>

              {completedSteps.length === checklistSteps.length && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-900 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                    Onboarding complete!
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    {"You're ready to start using the LIMS platform."}
                  </p>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>

      {showTour && <ProductTour onComplete={handleTourComplete} />}
    </>
  )
}
