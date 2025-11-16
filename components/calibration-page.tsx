'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle2, Wrench } from 'lucide-react'
import { CalibrationTour } from '@/components/calibration-tour'

export function CalibrationPage() {
  const [showTour, setShowTour] = useState(true)
  const [calibrationComplete, setCalibrationComplete] = useState(false)

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6">
      <div className="space-y-6">
        <div className="border-l-4 border-orange-500 pl-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Instrument Calibration
          </h2>
          <p className="text-muted-foreground mt-1">HPLC-002 requires recalibration</p>
        </div>

        <Card className="shadow-sm border-2 border-orange-200 dark:border-orange-900">
          <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Agilent 1290 Infinity II</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">HPLC-002</p>
                </div>
              </div>
              <Badge variant="destructive" className="text-white">
                Calibration Required
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Detected Issues:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>Calibration drift detected - retention time variance exceeds tolerance</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>Column pressure readings 15% above recommended range</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span>Last calibration performed 45 days ago (recommended: 30 days)</span>
                </li>
              </ul>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm font-semibold mb-4">Calibration Procedure:</p>
              <div className="space-y-3">
                {[
                  { step: 1, title: 'Prepare Standards', status: calibrationComplete ? 'complete' : 'pending' },
                  { step: 2, title: 'Run System Suitability', status: calibrationComplete ? 'complete' : 'pending' },
                  { step: 3, title: 'Verify Calibration Curve', status: calibrationComplete ? 'complete' : 'pending' },
                  { step: 4, title: 'Document Results', status: calibrationComplete ? 'complete' : 'pending' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      item.status === 'complete' 
                        ? 'bg-green-100 dark:bg-green-950' 
                        : 'bg-muted'
                    }`}>
                      {item.status === 'complete' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className="text-sm font-bold text-muted-foreground">{item.step}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium flex-1">{item.title}</span>
                    {item.status === 'complete' && (
                      <Badge variant="outline" className="text-green-600 dark:text-green-400">
                        Complete
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {!calibrationComplete && (
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setShowTour(true)}
              >
                <Wrench className="mr-2 h-4 w-4" />
                Start Guided Calibration
              </Button>
            )}

            {calibrationComplete && (
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      Calibration Complete
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      HPLC-002 is now calibrated and ready for use
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {showTour && (
        <CalibrationTour
          onComplete={() => {
            setShowTour(false)
            setCalibrationComplete(true)
          }}
        />
      )}
    </div>
  )
}
