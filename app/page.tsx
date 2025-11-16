'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Beaker } from 'lucide-react'
import { LIMSHome } from '@/components/lims-home'
import { LIMSSamples } from '@/components/lims-samples'
import { LIMSInstruments } from '@/components/lims-instruments'
import { LIMSReports } from '@/components/lims-reports'

export type LIMSPage = 'home' | 'samples' | 'instruments' | 'reports'

export default function Page() {
  const [currentPage, setCurrentPage] = useState<LIMSPage>('home')

  return (
    <div className="min-h-screen bg-background">
      {/* LIMS Navigation Bar */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="mx-auto max-w-[1600px] px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Beaker className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">ADAPT LIMS</h1>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={currentPage === 'home' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('home')}
                  size="sm"
                >
                  Home
                </Button>
                <Button
                  variant={currentPage === 'samples' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('samples')}
                  size="sm"
                >
                  Samples
                </Button>
                <Button
                  variant={currentPage === 'instruments' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('instruments')}
                  size="sm"
                >
                  Instruments
                </Button>
                <Button
                  variant={currentPage === 'reports' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('reports')}
                  size="sm"
                >
                  QC Reports
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Dr. Sarah Chen</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && <LIMSHome setPage={setCurrentPage} />}
        {currentPage === 'samples' && <LIMSSamples />}
        {currentPage === 'instruments' && <LIMSInstruments />}
        {currentPage === 'reports' && <LIMSReports />}
      </main>
    </div>
  )
}
