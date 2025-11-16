'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, ArrowRight } from 'lucide-react'

const tourSteps = [
  {
    id: 1,
    title: 'Dashboard Overview',
    description: 'This is your main dashboard where you can see all active samples, instruments, and QC results at a glance.',
    position: { top: '120px', left: '50%', transform: 'translateX(-50%)' },
    highlight: 'top',
  },
  {
    id: 2,
    title: 'Navigation Menu',
    description: 'Use these tabs to navigate between Samples, Instruments, and QC Reports sections.',
    position: { top: '70px', left: '280px' },
    highlight: 'nav',
  },
  {
    id: 3,
    title: 'System Alerts',
    description: 'Important notifications about QC failures, calibrations, and approvals appear here.',
    position: { top: '350px', right: '50px' },
    highlight: 'alerts',
  },
  {
    id: 4,
    title: 'Quick Stats',
    description: 'Monitor key metrics like pending samples, active runs, and QC pass rates in real-time.',
    position: { top: '180px', left: '50px' },
    highlight: 'stats',
  },
  {
    id: 5,
    title: 'You're All Set!',
    description: 'You can now start using the LIMS platform. Click "Get Started" to begin working with samples and instruments.',
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    highlight: 'none',
  },
]

export function ProductTour({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const step = tourSteps[currentStep]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-300" />

      {/* Tour Card */}
      <Card
        className="fixed z-50 w-96 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
        style={step.position}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="text-xs">
                  Step {currentStep + 1} of {tourSteps.length}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            {step.description}
          </p>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip Tour
            </Button>
            <Button onClick={handleNext} size="sm">
              {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
