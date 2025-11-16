'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle2, Clock, Beaker, FlaskConical, BarChart3 } from 'lucide-react'
import { OnboardingChecklist } from '@/components/onboarding-checklist'
import type { LIMSPage } from '@/app/page'

export function LIMSHome({ 
  setPage, 
  showOnboarding, 
  setShowOnboarding 
}: { 
  setPage: (page: LIMSPage) => void
  showOnboarding: boolean
  setShowOnboarding: (show: boolean) => void
}) {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-6 relative">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Welcome back, Dr. Chen</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Samples</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-[#b6c2ed] dark:bg-[#020308] flex items-center justify-center">
                <FlaskConical className="h-4 w-4 text-[#0a1128] dark:text-[#b6c2ed]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23</div>
              <p className="text-xs text-muted-foreground mt-1">+4 from yesterday</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Runs</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-[#c3edf8] dark:bg-[#041a20] flex items-center justify-center">
                <Beaker className="h-4 w-4 text-[#1282a2] dark:text-[#c3edf8]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">Across 3 instruments</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">QC Pass Rate</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-[#b3d9fd] dark:bg-[#010d18] flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-[#034078] dark:text-[#b3d9fd]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-[#a9c9ff] dark:bg-[#000610] flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#001f54] dark:text-[#a9c9ff]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent Samples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 'S-2024-1891', name: 'Stability Study Batch 45', status: 'In Progress' },
                  { id: 'S-2024-1890', name: 'Raw Material QC - Lot 5679', status: 'Complete' },
                  { id: 'S-2024-1889', name: 'Dissolution Test - Product A', status: 'Complete' },
                  { id: 'S-2024-1888', name: 'Impurity Testing', status: 'Pending' },
                ].map((sample) => (
                  <div key={sample.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-medium">{sample.name}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">{sample.id}</p>
                    </div>
                    <Badge variant={sample.status === 'Complete' ? 'default' : 'secondary'} className="shrink-0">
                      {sample.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors cursor-pointer">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">QC Failure Detected</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Content uniformity test failed - QC-2024-003</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 hover:bg-amber-100 dark:hover:bg-amber-950/30 transition-colors cursor-pointer">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Calibration Due</p>
                    <p className="text-xs text-muted-foreground mt-0.5">HPLC-002 requires recalibration within 3 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#b3d9fd]/30 dark:bg-[#010d18] border border-[#034078]/20 dark:border-[#034078] hover:bg-[#b3d9fd]/50 dark:hover:bg-[#022750] transition-colors cursor-pointer">
                  <CheckCircle2 className="h-4 w-4 text-[#034078] dark:text-[#b3d9fd] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Batch Approved</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Batch 2024-045 released for distribution</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <OnboardingChecklist isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  )
}
