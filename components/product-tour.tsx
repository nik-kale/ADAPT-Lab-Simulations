'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, ArrowRight } from 'lucide-react'

const tourSteps = [
  {
    id: 1,
    title: 'Dashboard Overview',
    description: 'This is your main dashboard where you can see all active samples, instruments, and QC results at a glance.',
    position: { top: 120, left: '50%', transform: 'translateX(-50%)' },
    arrowPosition: 'top',
  },
  {
    id: 2,
    title: 'Navigation Menu',
    description: 'Use these tabs to navigate between Samples, Instruments, and QC Reports sections.',
    position: { top: 110, left: 280 },
    arrowPosition: 'top',
  },
  {
    id: 3,
    title: 'System Alerts',
    description: 'Important notifications about QC failures, calibrations, and approvals appear here.',
    position: { top: 350, right: 50 },
    arrowPosition: 'right',
  },
  {
    id: 4,
    title: 'Quick Stats',
    description: 'Monitor key metrics like pending samples, active runs, and QC pass rates in real-time.',
    position: { top: 220, left: 50 },
    arrowPosition: 'left',
  },
  {
    id: 5,
    title: "You're All Set!",
    description: 'You can now start using the LIMS platform. Click "Get Started" to begin working with samples and instruments.',
    position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    arrowPosition: 'none',
  },
]

export function ProductTour({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

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

  const getArrowClasses = () => {
    switch (step.arrowPosition) {
      case 'top':
        return 'after:absolute after:content-[""] after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-[10px] after:border-transparent after:border-b-white dark:after:border-b-slate-950 after:drop-shadow-[0_-2px_3px_rgba(0,0,0,0.1)] after:mb-[-1px]'
      case 'bottom':
        return 'after:absolute after:content-[""] after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[10px] after:border-transparent after:border-t-white dark:after:border-t-slate-950 after:drop-shadow-[0_2px_3px_rgba(0,0,0,0.1)] after:mt-[-1px]'
      case 'left':
        return 'after:absolute after:content-[""] after:right-full after:top-1/2 after:-translate-y-1/2 after:border-[10px] after:border-transparent after:border-r-white dark:after:border-r-slate-950 after:drop-shadow-[-2px_0_3px_rgba(0,0,0,0.1)] after:mr-[-1px]'
      case 'right':
        return 'after:absolute after:content-[""] after:left-full after:top-1/2 after:-translate-y-1/2 after:border-[10px] after:border-transparent after:border-l-white dark:after:border-l-slate-950 after:drop-shadow-[2px_0_3px_rgba(0,0,0,0.1)] after:ml-[-1px]'
      default:
        return ''
    }
  }

  const getPositionOffset = () => {
    switch (step.arrowPosition) {
      case 'top':
        return { marginTop: '12px' }
      case 'bottom':
        return { marginBottom: '12px' }
      case 'left':
        return { marginLeft: '12px' }
      case 'right':
        return { marginRight: '12px' }
      default:
        return {}
    }
  }

  const positionStyle = { ...step.position, ...getPositionOffset() }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-300" />

      {/* Tour Card with Popper.js-style arrow */}
      <Card
        ref={cardRef}
        className={`fixed z-50 w-96 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 ${getArrowClasses()}`}
        style={positionStyle}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="text-xs bg-gradient-to-r from-blue-600 to-purple-600">
                  Step {currentStep + 1} of {tourSteps.length}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {step.description}
          </p>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip Tour
            </Button>
            <Button onClick={handleNext} size="sm" className="gap-2">
              {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
