'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Plus, Filter, X } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export function LIMSSamples({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [showBanner, setShowBanner] = useState(true)

  const generateSamples = () => {
    const samples = []
    const sampleTypes = ['QC', 'Assay', 'Stability', 'Dissolution']
    const sampleNames = [
      'Stability Study Batch',
      'Raw Material QC - Lot',
      'Dissolution Test - Product',
      'Impurity Testing',
      'Content Uniformity Test',
      'Potency Assay',
      'Moisture Content Analysis',
      'Particle Size Distribution',
      'pH Testing',
      'Microbial Limit Test'
    ]
    const instruments = ['HPLC-001', 'HPLC-002', 'HPLC-003', 'GC-MS-001', 'UV-VIS-001']
    
    for (let i = 100; i >= 1; i--) {
      const sampleId = `S-2024-${1800 + i}`
      const isFailedSample = i === 75 // Position 75 in the list (25th from top when sorted desc)
      
      samples.push({
        id: sampleId,
        name: `${sampleNames[i % sampleNames.length]} ${Math.floor(Math.random() * 100)}`,
        type: sampleTypes[i % sampleTypes.length],
        status: isFailedSample ? 'In Progress' : (i % 3 === 0 ? 'Complete' : 'Pending'),
        hasFailure: isFailedSample,
        date: `2024-11-${String(Math.max(1, 16 - Math.floor(i / 10))).padStart(2, '0')}`,
        instrument: i % 2 === 0 ? instruments[i % instruments.length] : undefined
      })
    }
    
    return samples
  }

  const samples = generateSamples()

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6">
      {showBanner && (
        <Alert className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900 mb-6">
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-800 dark:text-orange-300 flex items-center justify-between">
            <span>Calibration drift detected on HPLC-002 for sample S-2024-1875. Please recalibrate before processing new samples.</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="default"
                onClick={() => onNavigate?.('calibration')}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                Start Calibration
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBanner(false)}
                className="h-8 w-8 p-0 hover:bg-orange-100 dark:hover:bg-orange-900/40"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Sample Management</h2>
            <p className="text-muted-foreground mt-1">Track and manage laboratory samples</p>
          </div>
          <Button className="rounded-lg shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            New Sample
          </Button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search samples..." className="pl-9 rounded-lg" />
          </div>
          <Button variant="outline" className="rounded-lg">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>All Samples ({samples.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {samples.map((sample) => (
                <div key={sample.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-sm font-medium">{sample.id}</p>
                      <Badge variant="outline" className="text-xs border-[#1282a2] text-[#1282a2]">{sample.type}</Badge>
                      {sample.instrument && (
                        <Badge variant="secondary" className="text-xs font-mono bg-[#b3d9fd] dark:bg-[#010d18] text-[#034078] dark:text-[#b3d9fd]">{sample.instrument}</Badge>
                      )}
                    </div>
                    <p className="text-sm mt-1">{sample.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{sample.date}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          sample.status === 'Complete'
                            ? 'default'
                            : 'secondary'
                        }
                        className={
                          sample.status === 'Complete'
                            ? 'bg-[#034078] hover:bg-[#022750] text-white'
                            : sample.status === 'In Progress'
                            ? 'bg-[#c3edf8] dark:bg-[#041a20] text-[#1282a2] dark:text-[#c3edf8]'
                            : 'bg-[#a9c9ff] dark:bg-[#000610] text-[#001f54] dark:text-[#a9c9ff]'
                        }
                      >
                        {sample.status}
                      </Badge>
                      {sample.hasFailure && (
                        <Badge variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">
                          Failure Detected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
