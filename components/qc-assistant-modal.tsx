'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react'
import { CorrectiveActionTour } from '@/components/corrective-action-tour'

type AnimationStage = 'question' | 'analysis' | 'actions' | 'complete'

export function QCAssistantModal({
  open,
  onOpenChange,
  qcData,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  qcData: { id: string; assay: string; status: string; result: string }
}) {
  const [stage, setStage] = useState<AnimationStage>('question')
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    if (open) {
      setStage('question')
      // Animate through stages
      setTimeout(() => setStage('analysis'), 2000)
      setTimeout(() => setStage('actions'), 5000)
      setTimeout(() => setStage('complete'), 7000)
    }
  }, [open])

  return (
    <>
      <Dialog open={open && !showTour} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Lab Assistant Analysis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Stage 1: Question */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Question:</p>
                <p className="text-sm text-muted-foreground">
                  Why did QC test {qcData.id} fail, and what corrective actions should I take?
                </p>
              </div>
            </div>

            {/* Stage 2: Analysis */}
            {(stage === 'analysis' || stage === 'actions' || stage === 'complete') && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {stage === 'analysis' ? (
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">Analysis:</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Based on the failure pattern and recent run history, I've identified several potential root causes for this content uniformity failure. The elevated RSD suggests inconsistent tablet weight or poor blend uniformity.
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 space-y-2 ml-11">
                  <p className="text-sm font-semibold mb-3">Evidence & Reasoning:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>3 of last 5 content uniformity tests failed using reagent lot 5678 (correlation: 87%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Column pressure readings 15% above recommended range on Instrument B</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Blend uniformity samples from previous batch showed borderline RSD (5.8%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Environmental logs show room temperature fluctuated above 27°C during compression</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Stage 3: Recommended Actions */}
            {(stage === 'actions' || stage === 'complete') && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3 ml-11">
                <p className="text-sm font-semibold">Recommended Actions:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-background rounded-lg border">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Isolate reagent lot 5678</p>
                        {stage === 'complete' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowTour(true)}
                          >
                            Start Action
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Quarantine lot and test alternative lot for comparison
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-background rounded-lg border">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Run column health check</p>
                      <p className="text-xs text-muted-foreground">
                        Perform system suitability test and inspect column for deterioration
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-background rounded-lg border">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Re-run controls with fresh standards</p>
                      <p className="text-xs text-muted-foreground">
                        Verify method performance with known reference standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {stage === 'complete' && (
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1">
                  Export Summary
                </Button>
                <Button variant="outline" className="flex-1">
                  Create Ticket
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {showTour && (
        <CorrectiveActionTour
          onComplete={() => {
            setShowTour(false)
            onOpenChange(false)
          }}
        />
      )}
    </>
  )
}
