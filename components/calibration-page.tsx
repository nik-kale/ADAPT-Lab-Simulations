'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle, CheckCircle2, Wrench, Clock, FileText, Beaker } from 'lucide-react'
import { CalibrationTour } from '@/components/calibration-tour'

export function CalibrationPage() {
  const [showTour, setShowTour] = useState(false)
  const [calibrationStep, setCalibrationStep] = useState(0)
  const [standardsLoaded, setStandardsLoaded] = useState(false)
  const [calibrationData, setCalibrationData] = useState({
    lotNumber: '',
    technicianName: '',
    temperature: '',
    r2Value: '',
  })

  const steps = [
    { 
      id: 1, 
      title: 'Prepare Standards', 
      icon: Beaker,
      description: 'Verify and prepare calibration standards'
    },
    { 
      id: 2, 
      title: 'Run System Suitability', 
      icon: Clock,
      description: 'Execute system suitability test'
    },
    { 
      id: 3, 
      title: 'Verify Calibration Curve', 
      icon: CheckCircle2,
      description: 'Confirm curve meets acceptance criteria'
    },
    { 
      id: 4, 
      title: 'Document Results', 
      icon: FileText,
      description: 'Complete electronic batch record'
    },
  ]

  const startCalibration = () => {
    setShowTour(true)
    setCalibrationStep(1)
  }

  const completeStep = () => {
    if (calibrationStep < steps.length) {
      setCalibrationStep(calibrationStep + 1)
    }
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6">
      <div className="space-y-6">
        <div className="border-l-4 border-yale_blue-500 pl-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Instrument Calibration
          </h2>
          <p className="text-muted-foreground mt-1">Complete calibration workflow for HPLC-002</p>
        </div>

        <Card className="shadow-lg border-2 border-amber-200 dark:border-amber-900/50">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-950/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center shadow-sm">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Agilent 1290 Infinity II</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono mt-1">HPLC-002 • Lab Station B-12</p>
                </div>
              </div>
              <Badge variant="destructive" className="text-white px-3 py-1">
                Calibration Required
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Detected Issues:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Retention time variance exceeds ±2% tolerance (current: 3.2%)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Column pressure 15% above recommended range (current: 345 bar, limit: 300 bar)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>Last calibration: 45 days ago • Next due: 15 days overdue</span>
                </li>
              </ul>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm font-semibold mb-4">Calibration Procedure:</p>
              
              <div className="space-y-3">
                {steps.map((item, index) => {
                  const isComplete = calibrationStep > index + 1
                  const isActive = calibrationStep === index + 1
                  const Icon = item.icon

                  return (
                    <div 
                      key={item.id} 
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                        isActive 
                          ? 'border-yale_blue-500 bg-yale_blue-50 dark:bg-yale_blue-950/20 shadow-md' 
                          : isComplete
                          ? 'border-cerulean-200 dark:border-cerulean-900/30 bg-cerulean-50/50 dark:bg-cerulean-950/10'
                          : 'border-muted bg-background'
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm ${
                        isComplete 
                          ? 'bg-cerulean-500 dark:bg-cerulean-600' 
                          : isActive
                          ? 'bg-yale_blue-500 dark:bg-yale_blue-600'
                          : 'bg-muted'
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : (
                          <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold block">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                      {isComplete && (
                        <Badge variant="outline" className="text-cerulean-600 dark:text-cerulean-400 border-cerulean-300">
                          Complete
                        </Badge>
                      )}
                      {isActive && (
                        <Badge className="bg-yale_blue-500 text-white">
                          In Progress
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>

              {calibrationStep > 0 && calibrationStep <= steps.length && (
                <div className="mt-6 p-4 border-2 border-yale_blue-200 dark:border-yale_blue-900 rounded-lg bg-yale_blue-50/30 dark:bg-yale_blue-950/10">
                  <p className="text-sm font-semibold mb-4">Step {calibrationStep} Information:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {calibrationStep === 1 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="lotNumber" className="text-xs">Standard Lot Number</Label>
                          <Input 
                            id="lotNumber" 
                            placeholder="LOT-2024-XXX"
                            value={calibrationData.lotNumber}
                            onChange={(e) => setCalibrationData({...calibrationData, lotNumber: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="temperature" className="text-xs">Room Temperature (°C)</Label>
                          <Input 
                            id="temperature" 
                            placeholder="22.5"
                            type="number"
                            value={calibrationData.temperature}
                            onChange={(e) => setCalibrationData({...calibrationData, temperature: e.target.value})}
                          />
                        </div>
                      </>
                    )}
                    {calibrationStep === 3 && (
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="r2Value" className="text-xs">Calibration Curve R² Value</Label>
                        <Input 
                          id="r2Value" 
                          placeholder="0.9999"
                          value={calibrationData.r2Value}
                          onChange={(e) => setCalibrationData({...calibrationData, r2Value: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={completeStep}
                    disabled={calibrationStep === 1 && (!calibrationData.lotNumber || !calibrationData.temperature)}
                  >
                    Complete Step {calibrationStep}
                  </Button>
                </div>
              )}
            </div>

            {calibrationStep === 0 && (
              <Button 
                className="w-full shadow-lg hover:shadow-xl transition-all" 
                size="lg"
                onClick={startCalibration}
              >
                <Wrench className="mr-2 h-5 w-5" />
                Start Guided Calibration
              </Button>
            )}

            {calibrationStep > steps.length && (
              <div className="p-6 bg-gradient-to-r from-cerulean-50 to-cerulean-100/50 dark:from-cerulean-950/30 dark:to-cerulean-950/10 border-2 border-cerulean-300 dark:border-cerulean-800 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-cerulean-500 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-cerulean-900 dark:text-cerulean-100">
                      Calibration Successfully Completed
                    </p>
                    <p className="text-sm text-cerulean-700 dark:text-cerulean-300 mt-1">
                      HPLC-002 is now calibrated and ready for production use • Next calibration due: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {showTour && calibrationStep > 0 && calibrationStep <= steps.length && (
        <CalibrationTour
          currentStep={calibrationStep}
          onNext={completeStep}
          onComplete={() => {
            setShowTour(false)
            setCalibrationStep(steps.length + 1)
          }}
        />
      )}
    </div>
  )
}
