'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, MessageSquare } from 'lucide-react'
import { QCAssistantModal } from '@/components/qc-assistant-modal'

const qcData = [
  { id: 'QC-2024-001', assay: 'Purity Assay (HPLC)', status: 'Pass', date: '2024-11-14', result: '99.2%' },
  { id: 'QC-2024-002', assay: 'Dissolution Test', status: 'Pass', date: '2024-11-14', result: '98.5%' },
  { id: 'QC-2024-003', assay: 'Content Uniformity', status: 'Fail', date: '2024-11-15', result: 'RSD 8.2%', flagged: true },
  { id: 'QC-2024-004', assay: 'Impurity Profile', status: 'Pass', date: '2024-11-15', result: '< 0.1%' },
  { id: 'QC-2024-005', assay: 'Moisture Content', status: 'Pass', date: '2024-11-15', result: '2.1%' },
]

export function LIMSReports() {
  const [selectedQC, setSelectedQC] = useState<typeof qcData[0] | null>(null)
  const [showAssistant, setShowAssistant] = useState(false)

  const handleAskAssistant = (qc: typeof qcData[0]) => {
    setSelectedQC(qc)
    setShowAssistant(true)
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">QC Reports</h2>
          <p className="text-muted-foreground">Review quality control test results</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent QC Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {qcData.map((qc) => (
                <div
                  key={qc.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    qc.flagged ? 'bg-destructive/5 border-destructive/20' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-sm font-medium">{qc.id}</p>
                      {qc.flagged && <AlertCircle className="h-4 w-4 text-destructive" />}
                    </div>
                    <p className="text-sm mt-1">{qc.assay}</p>
                    <p className="text-xs text-muted-foreground mt-1">Result: {qc.result}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{qc.date}</span>
                    <Badge
                      variant={qc.status === 'Pass' ? 'default' : 'destructive'}
                      className={qc.status === 'Pass' ? 'bg-green-500' : ''}
                    >
                      {qc.status}
                    </Badge>
                    {qc.flagged && (
                      <Button
                        size="sm"
                        onClick={() => handleAskAssistant(qc)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Ask Assistant
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedQC && (
        <QCAssistantModal
          open={showAssistant}
          onOpenChange={setShowAssistant}
          qcData={selectedQC}
        />
      )}
    </div>
  )
}
