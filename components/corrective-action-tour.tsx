'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, ArrowRight, CheckCircle2 } from 'lucide-react'

const tourSteps = [
  {
    id: 1,
    title: 'Navigate to Inventory',
    description: 'First, go to the Inventory section to locate reagent lot 5678.',
    action: 'Open Inventory',
  },
  {
    id: 2,
    title: 'Search for Reagent Lot',
    description: 'Use the search function to find lot 5678 in the reagent database.',
    action: 'Search Lot 5678',
  },
  {
    id: 3,
    title: 'Quarantine the Lot',
    description: 'Click the quarantine button to prevent this lot from being used in future tests.',
    action: 'Quarantine',
  },
  {
    id: 4,
    title: 'Document the Issue',
    description: 'Add a note documenting the QC failure and correlation analysis.',
    action: 'Add Note',
  },
  {
    id: 5,
    title: 'Action Complete!',
    description: 'The reagent lot has been quarantined and documented. Quality team has been notified.',
    action: 'Done',
  },
]

export function CorrectiveActionTour({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const step = tourSteps[currentStep]
  const isLastStep = currentStep === tourSteps.length - 1

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-300" />

      <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[500px] shadow-2xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                  Step {currentStep + 1} of {tourSteps.length}
                </span>
                {isLastStep && (
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onComplete} className="hover:bg-muted">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {step.description}
          </p>

          <div className="flex items-center justify-end gap-3">
            <Button 
              onClick={handleNext} 
              className="min-w-32 shadow-sm hover:shadow-md transition-shadow"
              size="lg"
            >
              {isLastStep ? 'Complete' : step.action}
              {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
