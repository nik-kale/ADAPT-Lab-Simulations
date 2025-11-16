'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Plus, Filter } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export function LIMSSamples() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6">
      <Alert className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900 mb-6">
        <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        <AlertDescription className="text-orange-800 dark:text-orange-300">
          Calibration drift detected on HPLC-002. Please recalibrate before processing new samples.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Sample Management</h2>
            <p className="text-muted-foreground">Track and manage laboratory samples</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Sample
          </Button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search samples..." className="pl-9" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Samples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { id: 'S-2024-1891', name: 'Stability Study Batch 45', type: 'QC', status: 'In Progress', date: '2024-11-15' },
                { id: 'S-2024-1890', name: 'Raw Material QC - Lot 5679', type: 'QC', status: 'Complete', date: '2024-11-15' },
                { id: 'S-2024-1889', name: 'Dissolution Test - Product A', type: 'Assay', status: 'Complete', date: '2024-11-14' },
                { id: 'S-2024-1888', name: 'Impurity Testing', type: 'Assay', status: 'Pending', date: '2024-11-14' },
                { id: 'S-2024-1887', name: 'Content Uniformity Test', type: 'QC', status: 'Failed', date: '2024-11-14' },
              ].map((sample) => (
                <div key={sample.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-sm font-medium">{sample.id}</p>
                      <Badge variant="outline" className="text-xs">{sample.type}</Badge>
                    </div>
                    <p className="text-sm mt-1">{sample.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{sample.date}</span>
                    <Badge
                      variant={
                        sample.status === 'Complete'
                          ? 'default'
                          : sample.status === 'Failed'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {sample.status}
                    </Badge>
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
