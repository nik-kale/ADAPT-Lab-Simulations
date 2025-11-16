'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, MessageSquare, FileText, Send, Sparkles } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const qcData = [
  { id: 'QC-2024-001', assay: 'Purity Assay (HPLC)', status: 'Pass', date: '2024-11-14' },
  { id: 'QC-2024-002', assay: 'Dissolution Test', status: 'Pass', date: '2024-11-14' },
  { id: 'QC-2024-003', assay: 'Content Uniformity', status: 'Fail', date: '2024-11-15', flagged: true },
  { id: 'QC-2024-004', assay: 'Impurity Profile', status: 'Pass', date: '2024-11-15' },
]

export function QCFailureAssistant() {
  const [selectedQC, setSelectedQC] = useState<string | null>(null)
  const [showAssistant, setShowAssistant] = useState(false)
  const [showTicketDialog, setShowTicketDialog] = useState(false)

  const failedQC = qcData.find(qc => qc.id === 'QC-2024-003')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">QC Failure Assistant</h2>
        <p className="text-muted-foreground">
          {'AI-Powered Troubleshooting for Quality Control Failures'}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Panel: QC Results Table */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{'QC Results'}</CardTitle>
            <CardDescription>{'Recent quality control tests'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {qcData.map((qc) => (
                <div
                  key={qc.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedQC === qc.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => {
                    setSelectedQC(qc.id)
                    if (qc.flagged) {
                      setShowAssistant(false)
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-mono text-sm">{qc.id}</div>
                    {qc.flagged && <AlertCircle className="h-4 w-4 text-destructive" />}
                  </div>
                  <div className="text-sm mb-2">{qc.assay}</div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={qc.status === 'Pass' ? 'default' : 'destructive'}
                      className={qc.status === 'Pass' ? 'bg-green-500' : ''}
                    >
                      {qc.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{qc.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel: QC Detail + Assistant */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedQC ? 'QC Analysis' : 'Select a QC Result'}
            </CardTitle>
            <CardDescription>
              {selectedQC
                ? 'View details and get AI-powered assistance'
                : 'Click on a QC result to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!selectedQC && (
              <div className="text-center py-12 text-muted-foreground">
                {'Select a QC result from the list to view details'}
              </div>
            )}

            {selectedQC && failedQC && (
              <>
                {/* QC Summary Card */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">{'Sample ID'}</Label>
                      <p className="font-mono">{failedQC.id}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">{'Assay Name'}</Label>
                      <p>{failedQC.assay}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">{'Failure Type'}</Label>
                      <p>{'Out of Specification (OOS)'}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">{'Date'}</Label>
                      <p>{failedQC.date}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">{'Instrument'}</Label>
                      <p>{'Agilent 1290 Infinity II'}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">{'Operator'}</Label>
                      <p>{'J. Smith'}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Label className="text-muted-foreground mb-2 block">{'Failure Details'}</Label>
                    <p className="text-sm">
                      {'Content uniformity test failed with RSD of 8.2% (specification: ≤ 6.0%). Three tablets showed values outside acceptable range.'}
                    </p>
                  </div>
                </div>

                {/* Ask Assistant Button */}
                {!showAssistant && (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowAssistant(true)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {'Ask Lab Assistant'}
                  </Button>
                )}

                {/* Assistant Response */}
                {showAssistant && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="border-l-4 border-primary pl-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="bg-muted/50 rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">{'Question:'}</p>
                            <p className="text-sm text-muted-foreground">
                              {'Why did this QC fail and what should I check?'}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <p className="text-sm font-medium">{'Analysis:'}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {'Based on the failure pattern and recent run history, I\'ve identified several potential root causes for this content uniformity failure. The elevated RSD suggests inconsistent tablet weight or poor blend uniformity.'}
                            </p>

                            {/* Reasoning Trace */}
                            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                              <p className="text-sm font-semibold mb-3">{'Evidence & Reasoning:'}</p>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-0.5">{'•'}</span>
                                  <span>{'3 of last 5 content uniformity tests failed using reagent lot 5678 (correlation: 87%)'}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-0.5">{'•'}</span>
                                  <span>{'Column pressure readings 15% above recommended range on Instrument B'}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-0.5">{'•'}</span>
                                  <span>{'Blend uniformity samples from previous batch showed borderline RSD (5.8%)'}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary mt-0.5">{'•'}</span>
                                  <span>{'Environmental logs show room temperature fluctuated above 27°C during compression'}</span>
                                </li>
                              </ul>
                            </div>

                            {/* Recommendations */}
                            <div className="space-y-2">
                              <p className="text-sm font-semibold">{'Recommended Actions:'}</p>
                              <div className="space-y-2">
                                <div className="flex items-start gap-2 p-3 bg-background rounded-lg border">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium">{'Isolate reagent lot 5678'}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {'Quarantine lot and test alternative lot for comparison'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 p-3 bg-background rounded-lg border">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium">{'Run column health check'}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {'Perform system suitability test and inspect column for deterioration'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 p-3 bg-background rounded-lg border">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium">{'Re-run controls with fresh standards'}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {'Verify method performance with known reference standards'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" className="flex-1">
                        <FileText className="mr-2 h-4 w-4" />
                        {'Re-run QC Analysis'}
                      </Button>
                      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
                        <DialogTrigger asChild>
                          <Button className="flex-1">
                            <Send className="mr-2 h-4 w-4" />
                            {'Open Support Ticket'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{'Create Support Ticket'}</DialogTitle>
                            <DialogDescription>
                              {'Pre-filled information from QC failure analysis'}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>{'Sample ID'}</Label>
                              <Input value={failedQC.id} readOnly />
                            </div>
                            <div>
                              <Label>{'Assay'}</Label>
                              <Input value={failedQC.assay} readOnly />
                            </div>
                            <div>
                              <Label>{'Instrument'}</Label>
                              <Input value="Agilent 1290 Infinity II" readOnly />
                            </div>
                            <div>
                              <Label>{'QC Failure Code'}</Label>
                              <Input value="OOS-CU-001" readOnly />
                            </div>
                            <div>
                              <Label>{'Summary'}</Label>
                              <Textarea
                                rows={4}
                                value="Content uniformity failure with elevated RSD (8.2%). Analysis suggests potential issues with reagent lot 5678, column performance, and environmental conditions. See attached reasoning trace for details."
                                readOnly
                              />
                            </div>
                            <div>
                              <Label>{'Attach Files'}</Label>
                              <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground hover:border-primary/50 cursor-pointer transition-colors">
                                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">{'Click to upload run logs and data files'}</p>
                              </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                              <Button variant="outline" className="flex-1" onClick={() => setShowTicketDialog(false)}>
                                {'Cancel'}
                              </Button>
                              <Button className="flex-1" onClick={() => setShowTicketDialog(false)}>
                                {'Submit Ticket'}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline">
                        {'Export Summary'}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
