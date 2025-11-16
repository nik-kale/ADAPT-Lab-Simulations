'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, ArrowRight } from 'lucide-react'

const tourSteps = [
  {
    id: 1,
    title: 'Prepare Calibration Standards',
    description: 'First, prepare your calibration standards according to the SOP. Ensure all standards are within their expiration dates.',
    position: 'center',
  },
  {
    id: 2,
    title: 'Load Standards into Autosampler',
    description: 'Place the calibration standards in the autosampler tray according to the sequence table.',
    position: 'center',
  },
  {
    id: 3,
    title: 'Run System Suitability Test',
    description: 'Execute the system suitability test to verify instrument performance before calibration.',
    position: 'center',
  },
  {
    id: 4,
    title: 'Verify Calibration Curve',
    description: 'Review the calibration curve to ensure R² ≥ 0.999 and all points are within acceptance criteria.',
    position: 'center',
  },
  {
    id: 5,
    title: 'Complete Documentation',
    description: 'Document the calibration results in the LIMS and sign the electronic batch record.',
    position: 'center',
  },
]

export function CalibrationTour({ onComplete }: { onComplete: () => void }) {
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
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
        <div className="bg-background border-2 border-primary shadow-2xl rounded-lg p-6 mx-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step.id}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex gap-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSkip}>
                Skip Tour
              </Button>
              <Button size="sm" onClick={handleNext}>
                {currentStep < tourSteps.length - 1 ? (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  'Finish'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
