'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { X, ChevronDown, ChevronUp, Play } from 'lucide-react'
import { ProductTour } from '@/components/product-tour'

const checklistSteps = [
  { id: 1, title: 'Watch Welcome Video', videoId: 'dQw4w9WgXcQ' },
  { id: 2, title: 'Complete Interactive Tour', requiresTour: true },
  { id: 3, title: 'Create First Sample', videoId: '3JZ_D3ELwOQ' },
  { id: 4, title: 'Run QC Analysis', videoId: 'kJQP7kiw5Fk' },
  { id: 5, title: 'Generate Report', videoId: 'CevxZvSJLk8' },
]

export function OnboardingChecklist() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showTour, setShowTour] = useState(false)

  const progress = (completedSteps.length / checklistSteps.length) * 100

  const toggleComplete = (stepId: number) => {
    const step = checklistSteps.find(s => s.id === stepId)
    if (step?.requiresTour) {
      setShowTour(true)
      return
    }
    
    setCompletedSteps(prev =>
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
      <div className="fixed bottom-6 right-6 z-40 w-96">
        <Card className="shadow-xl border-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-base">Getting Started</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Complete your onboarding checklist
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
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{completedSteps.length} of {checklistSteps.length} completed</span>
                  <Badge variant={completedSteps.length === checklistSteps.length ? 'default' : 'secondary'}>
                    {Math.round(progress)}%
                  </Badge>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {checklistSteps.map((step) => {
                  const isCompleted = completedSteps.includes(step.id)
                  
                  return (
                    <div
                      key={step.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => toggleComplete(step.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {step.title}
                        </p>
                        {!isCompleted && step.videoId && (
                          <a
                            href={`https://www.youtube.com/watch?v=${step.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                          >
                            <Play className="h-3 w-3" />
                            Watch tutorial
                          </a>
                        )}
                        {!isCompleted && step.requiresTour && (
                          <button
                            onClick={() => setShowTour(true)}
                            className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                          >
                            <Play className="h-3 w-3" />
                            Start tour
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {completedSteps.length === checklistSteps.length && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    Onboarding complete!
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    You're ready to start using the LIMS platform.
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
