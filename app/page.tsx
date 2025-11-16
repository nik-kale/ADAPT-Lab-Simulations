'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Beaker, User, ChevronDown, MessageSquare, Ticket } from 'lucide-react'
import { LIMSHome } from '@/components/lims-home'
import { LIMSSamples } from '@/components/lims-samples'
import { LIMSInstruments } from '@/components/lims-instruments'
import { LIMSReports } from '@/components/lims-reports'
import { CalibrationPage } from '@/components/calibration-page'
import { MultiAgentAnalysis } from '@/components/multi-agent-analysis'
import { Footer } from '@/components/footer'
import { QCAssistantModal } from '@/components/qc-assistant-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type LIMSPage = 'home' | 'samples' | 'instruments' | 'reports' | 'calibration' | 'agentic'

export default function Page() {
  const [currentPage, setCurrentPage] = useState<LIMSPage>('home')
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showAssistant, setShowAssistant] = useState(false)
  const [assistantMode, setAssistantMode] = useState<'general' | 'ticket'>('general')

  const handleOpenAssistant = () => {
    setAssistantMode('general')
    setShowAssistant(true)
  }

  const handleOpenTicket = () => {
    setAssistantMode('ticket')
    setShowAssistant(true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* LIMS Navigation Bar */}
      <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-[1600px] px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                  <Beaker className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-xl font-semibold text-foreground">ADAPT LIMS</h1>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={currentPage === 'home' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('home')}
                  size="sm"
                  className="rounded-lg"
                >
                  Home
                </Button>
                <Button
                  variant={currentPage === 'samples' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('samples')}
                  size="sm"
                  className="rounded-lg"
                >
                  Samples
                </Button>
                <Button
                  variant={currentPage === 'instruments' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('instruments')}
                  size="sm"
                  className="rounded-lg"
                >
                  Instruments
                </Button>
                <Button
                  variant={currentPage === 'reports' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('reports')}
                  size="sm"
                  className="rounded-lg"
                >
                  QC Reports
                </Button>
                <Button
                  variant={currentPage === 'agentic' ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage('agentic')}
                  size="sm"
                  className="rounded-lg"
                >
                  Agentic AI
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Dr. Sarah Chen</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleOpenAssistant}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask Assistant
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOpenTicket}>
                    <Ticket className="h-4 w-4 mr-2" />
                    Open Support Ticket
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowOnboarding(true)}>
                    Onboarding Assistant
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'home' && <LIMSHome setPage={setCurrentPage} showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} />}
        {currentPage === 'samples' && <LIMSSamples onNavigate={setCurrentPage} />}
        {currentPage === 'instruments' && <LIMSInstruments />}
        {currentPage === 'reports' && <LIMSReports />}
        {currentPage === 'calibration' && <CalibrationPage />}
        {currentPage === 'agentic' && <MultiAgentAnalysis />}
      </main>

      {/* Footer */}
      <Footer />

      <QCAssistantModal
        open={showAssistant}
        onOpenChange={setShowAssistant}
        mode={assistantMode}
        qcData={{
          id: 'QC-2024-003',
          assay: 'Content Uniformity',
          status: 'Fail',
          result: 'RSD 8.2%'
        }}
      />
    </div>
  )
}
