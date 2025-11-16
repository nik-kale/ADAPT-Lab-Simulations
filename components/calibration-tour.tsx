'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, ArrowRight, Beaker, Clock, CheckCircle2, FileText } from 'lucide-react'

const tourSteps = [
  {
    id: 1,
    title: 'Prepare Calibration Standards',
    icon: Beaker,
    description: 'Verify all calibration standards are within their expiration dates and properly stored at 2-8°C. Bring standards to room temperature before use (approximately 30 minutes). Record the lot numbers and expiration dates in the system.',
    tips: [
      'Check visual appearance for particulates or discoloration',
      'Verify certificate of analysis is available',
      'Use standards within 4 hours of opening'
    ]
  },
  {
    id: 2,
    title: 'Run System Suitability Test',
    icon: Clock,
    description: 'Execute the system suitability test sequence to verify instrument performance. The test includes column efficiency check, detector response verification, and baseline stability assessment.',
    tips: [
      'System suitability must pass before calibration',
      'Monitor column pressure and flow rate stability',
      'Baseline noise should be &lt; 2 mAU'
    ]
  },
  {
    id: 3,
    title: 'Verify Calibration Curve',
    icon: CheckCircle2,
    description: 'Review the generated calibration curve to ensure linearity meets acceptance criteria. The correlation coefficient (R²) must be ≥ 0.999, and all calibration points must be within ±15% of the calculated concentration.',
    tips: [
      'Check for outliers in calibration points',
      'Verify curve spans the expected concentration range',
      'Document any deviations from acceptance criteria'
    ]
  },
  {
    id: 4,
    title: 'Complete Documentation',
    icon: FileText,
    description: 'Document all calibration results in the electronic batch record. Sign and date the calibration report. Update the instrument logbook with the calibration completion date and next due date.',
    tips: [
      'Attach calibration curve and raw data files',
      'Record any observations or deviations',
      'Update instrument status in LIMS'
    ]
  },
]

export function CalibrationTour({ 
  currentStep, 
  onNext,
  onComplete 
}: { 
  currentStep: number
  onNext: () => void
  onComplete: () => void 
}) {
  const [showTips, setShowTips] = useState(false)
  const step = tourSteps[currentStep - 1]
  
  if (!step) return null

  const Icon = step.icon

  const handleNext = () => {
    if (currentStep < tourSteps.length) {
      onNext()
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <>
      <div className="fixed inset-0 bg-prussian_blue-900/80 z-50 backdrop-blur-sm" />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl">
        <div className="bg-background border-2 border-yale_blue-500 shadow-2xl rounded-xl p-8 mx-4 relative">
          {/* Arrow pointing effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-background border-t-2 border-l-2 border-yale_blue-500 rotate-45" />
          
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yale_blue-500 to-cerulean-500 text-white flex items-center justify-center shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Step {step.id} of {tourSteps.length}</div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4 border">
                <button 
                  onClick={() => setShowTips(!showTips)}
                  className="text-sm font-semibold flex items-center justify-between w-full"
                >
                  <span>💡 Best Practices</span>
                  <span className="text-xs">{showTips ? '▼' : '▶'}</span>
                </button>
                {showTips && (
                  <ul className="mt-3 space-y-2">
                    {step.tips.map((tip, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-yale_blue-500 mt-0.5">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="ml-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <div className="flex gap-2">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index < currentStep ? 'w-8 bg-cerulean-500' : index === currentStep - 1 ? 'w-12 bg-yale_blue-500' : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={handleSkip}>
                Skip Tour
              </Button>
              <Button size="sm" onClick={handleNext} className="min-w-[100px]">
                {currentStep < tourSteps.length ? (
                  <>
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Finish <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
