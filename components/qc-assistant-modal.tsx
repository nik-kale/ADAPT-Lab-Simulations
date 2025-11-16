'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, CheckCircle2, Loader2, Send, Ticket } from 'lucide-react'
import { CorrectiveActionTour } from '@/components/corrective-action-tour'

type AnimationStage = 'question' | 'analysis' | 'actions' | 'complete' | 'ticket-request' | 'ticket-created' | 'ticket-description'

export function QCAssistantModal({
  open,
  onOpenChange,
  qcData,
  mode = 'general',
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  qcData: { id: string; assay: string; status: string; result: string }
  mode?: 'general' | 'ticket'
}) {
  const [stage, setStage] = useState<AnimationStage>('question')
  const [showTour, setShowTour] = useState(false)
  const [userQuestion, setUserQuestion] = useState('')
  const [ticketNumber, setTicketNumber] = useState('')

  useEffect(() => {
    if (open) {
      if (mode === 'ticket') {
        // Start with ticket description workflow
        setStage('ticket-description')
        setTimeout(() => setStage('ticket-request'), 2000)
        setTimeout(() => {
          const ticketNum = `TKT-${Math.floor(Math.random() * 9000) + 1000}`
          setTicketNumber(ticketNum)
          setStage('ticket-created')
        }, 4000)
      } else {
        // Normal QC analysis workflow
        setStage('question')
        setTimeout(() => setStage('analysis'), 2000)
        setTimeout(() => setStage('actions'), 5000)
        setTimeout(() => setStage('complete'), 7000)
      }
    }
  }, [open, mode])

  const handleCreateTicket = () => {
    // Generate a random ticket number
    const ticketNum = `TKT-${Math.floor(Math.random() * 9000) + 1000}`
    setTicketNumber(ticketNum)
    
    // Show user request message
    setStage('ticket-request')
    
    // After 2 seconds, show ticket created confirmation
    setTimeout(() => {
      setStage('ticket-created')
    }, 2000)
  }

  return (
    <>
      <Dialog open={open && !showTour} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[55vh] flex flex-col shadow-2xl">
          <DialogHeader className="border-b pb-4 flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              Ask Lab Assistant
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6 overflow-y-auto flex-1 min-h-0">
            {stage === 'ticket-description' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-2">Support Ticket Information</p>
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                      <p>
                        To create a support ticket, please provide the following information:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Brief description of the issue or request</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Affected instrument, sample, or system</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Priority level (Low, Medium, High, Critical)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Any relevant error codes or test IDs</span>
                        </li>
                      </ul>
                      <p className="pt-2">
                        Creating your support ticket now...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 1: Question */}
            {mode === 'general' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">Q</span>
                    Question
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Why did QC test {qcData.id} fail, and what corrective actions should I take?
                  </p>
                </div>
              </div>
            )}

            {/* Stage 2: Analysis */}
            {mode === 'general' && (stage === 'analysis' || stage === 'actions' || stage === 'complete' || stage === 'ticket-request' || stage === 'ticket-created') && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                    {stage === 'analysis' ? (
                      <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-2">Analysis</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Based on the failure pattern and recent run history, I've identified several potential root causes for this content uniformity failure. The elevated RSD suggests inconsistent tablet weight or poor blend uniformity.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-5 space-y-3 ml-11 border shadow-sm">
                  <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Evidence & Reasoning
                  </p>
                  <ul className="space-y-2.5 text-sm">
                    <li className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">3 of last 5 content uniformity tests failed using reagent lot 5678 (correlation: 87%)</span>
                    </li>
                    <li className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">Column pressure readings 15% above recommended range on Instrument B</span>
                    </li>
                    <li className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">Blend uniformity samples from previous batch showed borderline RSD (5.8%)</span>
                    </li>
                    <li className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">Environmental logs show room temperature fluctuated above 27°C during compression</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Stage 3: Recommended Actions */}
            {mode === 'general' && (stage === 'actions' || stage === 'complete' || stage === 'ticket-request' || stage === 'ticket-created') && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3 ml-11">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Recommended Actions
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg border-2 border-green-200 dark:border-green-900 hover:border-green-300 dark:hover:border-green-800 transition-colors shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold">Isolate reagent lot 5678</p>
                        {(stage === 'complete' || stage === 'ticket-request' || stage === 'ticket-created') && (
                          <Button
                            size="sm"
                            className="shadow-sm hover:shadow-md transition-shadow"
                            onClick={() => setShowTour(true)}
                          >
                            Start Action
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Quarantine lot and test alternative lot for comparison
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg border hover:border-green-200 dark:hover:border-green-900 transition-colors shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Run column health check</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Perform system suitability test and inspect column for deterioration
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg border hover:border-green-200 dark:hover:border-green-900 transition-colors shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Re-run controls with fresh standards</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Verify method performance with known reference standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(stage === 'ticket-request' || stage === 'ticket-created') && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">Q</span>
                    Request
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Create a support ticket for this {mode === 'ticket' ? 'issue' : 'QC failure issue'}.
                  </p>
                </div>
              </div>
            )}

            {stage === 'ticket-created' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Ticket className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-2 text-green-600 dark:text-green-500">Ticket Created Successfully</p>
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                      <p>
                        Your support ticket has been created with ID: <span className="font-mono font-semibold text-foreground">{ticketNumber}</span>
                      </p>
                      <p>
                        Someone from the quality assurance team will reach out to you shortly with an update on this issue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {stage === 'complete' && mode === 'general' && (
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="flex-1 hover:shadow-sm transition-shadow">
                  Export Summary
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 hover:shadow-sm transition-shadow"
                  onClick={handleCreateTicket}
                >
                  Create Ticket
                </Button>
              </div>
            )}
          </div>

          <div className="border-t pt-4 pb-2 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Ask a follow-up question..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" className="px-3">
                <Send className="h-4 w-4" />
              </Button>
            </div>
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
