'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Database, GitBranch, CheckCircle2, FileText, Play, ChevronRight, Beaker, TrendingUp, Settings, Activity } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const agents = [
  {
    id: 1,
    name: 'Data Retrieval Agent',
    icon: Database,
    color: 'text-chart-1',
    status: 'idle' as const,
  },
  {
    id: 2,
    name: 'Correlation Agent',
    icon: GitBranch,
    color: 'text-chart-2',
    status: 'idle' as const,
  },
  {
    id: 3,
    name: 'Evaluation Agent',
    icon: Activity,
    color: 'text-chart-3',
    status: 'idle' as const,
  },
  {
    id: 4,
    name: 'Summary Agent',
    icon: FileText,
    color: 'text-chart-4',
    status: 'idle' as const,
  },
]

export function MultiAgentAnalysis() {
  const [activeAgent, setActiveAgent] = useState<number | null>(null)
  const [analysisStarted, setAnalysisStarted] = useState(false)
  const [simulationRun, setSimulationRun] = useState(false)
  const [selectedChanges, setSelectedChanges] = useState<string[]>([])

  const startAnalysis = () => {
    setAnalysisStarted(true)
    setActiveAgent(1)
  }

  const nextAgent = () => {
    if (activeAgent && activeAgent < 4) {
      setActiveAgent(activeAgent + 1)
    }
  }

  const runSimulation = () => {
    setSimulationRun(true)
  }

  const toggleChange = (change: string) => {
    setSelectedChanges(prev =>
      prev.includes(change)
        ? prev.filter(c => c !== change)
        : [...prev, change]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Multi-Agent Analysis</h2>
        <p className="text-muted-foreground">
          {'Adaptive Diagnostics for Recurring Lab Anomalies'}
        </p>
      </div>

      {/* Anomalies Overview */}
      <Card className="bg-destructive/5 border-destructive/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-destructive">
                {'Recurring Anomalies Detected'}
              </CardTitle>
              <CardDescription>
                {'Assay XYZ showing consistent issues over last 14 days'}
              </CardDescription>
            </div>
            {!analysisStarted && (
              <Button onClick={startAnalysis}>
                <Play className="mr-2 h-4 w-4" />
                {'Run Deep Analysis'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{'Affected Runs'}</p>
              <p className="text-3xl font-bold">{'18'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{'Failure Rate Increase'}</p>
              <p className="text-3xl font-bold">{'32%'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{'Affected Instruments'}</p>
              <p className="text-3xl font-bold">{'2'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {analysisStarted && (
        <>
          {/* Agent Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>{'Multi-Agent Diagnostic Pipeline'}</CardTitle>
              <CardDescription>
                {'Collaborative AI agents analyzing anomaly patterns'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {agents.map((agent, idx) => {
                  const Icon = agent.icon
                  const isActive = activeAgent === agent.id
                  const isComplete = activeAgent ? activeAgent > agent.id : false

                  return (
                    <div key={agent.id} className="relative">
                      {idx < agents.length - 1 && (
                        <ChevronRight className="absolute -right-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground z-10" />
                      )}
                      <div
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'border-primary bg-primary/5'
                            : isComplete
                            ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                            : 'border-border'
                        }`}
                        onClick={() => activeAgent && activeAgent >= agent.id && setActiveAgent(agent.id)}
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          <div
                            className={`h-12 w-12 rounded-full flex items-center justify-center ${
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : isComplete
                                ? 'bg-green-500 text-white'
                                : 'bg-muted'
                            }`}
                          >
                            {isComplete ? (
                              <CheckCircle2 className="h-6 w-6" />
                            ) : (
                              <Icon className={`h-6 w-6 ${isActive ? '' : agent.color}`} />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{agent.name}</p>
                            <Badge
                              variant="outline"
                              className="mt-2"
                            >
                              {isComplete ? 'Complete' : isActive ? 'Running' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Agent Output Panel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {activeAgent && agents[activeAgent - 1].name}
                  </CardTitle>
                  <CardDescription>{'Analysis results and findings'}</CardDescription>
                </div>
                {activeAgent && activeAgent < 4 && (
                  <Button onClick={nextAgent}>
                    {'Next Agent'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {activeAgent === 1 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {'Retrieved comprehensive data from multiple sources across the laboratory ecosystem:'}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <p className="font-medium text-sm">{'QC History'}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {'142 QC records from last 30 days'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <p className="font-medium text-sm">{'Run Logs'}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {'Instrument logs from 3 HPLC systems'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <p className="font-medium text-sm">{'Instrument Configs'}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {'Method parameters and calibration data'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <p className="font-medium text-sm">{'Reagent Tracking'}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {'Lot numbers and expiration dates'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <p className="font-medium text-sm">{'Environmental Logs'}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {'Temperature and humidity data'}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <p className="font-medium text-sm">{'Maintenance Records'}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {'Service history and column replacements'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeAgent === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {'Identified statistically significant correlations between failures and operational parameters:'}
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 border-l-4 border-destructive bg-destructive/5 rounded">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-sm">{'Reagent Lot Correlation'}</p>
                        <Badge variant="destructive">{'High'}</Badge>
                      </div>
                      <p className="text-sm mb-2">
                        {'80% of failed runs used reagent lot 5678 on Instrument B'}
                      </p>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-sm">{'Environmental Condition'}</p>
                        <Badge className="bg-orange-500">{'Medium'}</Badge>
                      </div>
                      <p className="text-sm mb-2">
                        {'65% of failures occurred when room temperature exceeded 27°C'}
                      </p>
                      <Progress value={65} className="h-2 bg-orange-200" />
                    </div>
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-sm">{'Column Age'}</p>
                        <Badge className="bg-yellow-600">{'Low'}</Badge>
                      </div>
                      <p className="text-sm mb-2">
                        {'Column B-003 has 2400 injections (recommended max: 2000)'}
                      </p>
                      <Progress value={35} className="h-2 bg-yellow-200" />
                    </div>
                  </div>
                </div>
              )}

              {activeAgent === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {'Evaluated hypotheses using statistical models and domain expertise:'}
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        hypothesis: 'Degraded reagent lot causing variable results',
                        confidence: 92,
                        supporting: 4,
                        contradicting: 0,
                      },
                      {
                        hypothesis: 'Column performance degradation affecting separation',
                        confidence: 78,
                        supporting: 3,
                        contradicting: 1,
                      },
                      {
                        hypothesis: 'Environmental temperature affecting chromatography',
                        confidence: 65,
                        supporting: 2,
                        contradicting: 1,
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <p className="font-medium text-sm flex-1">{item.hypothesis}</p>
                          <Badge
                            variant={
                              item.confidence > 80
                                ? 'default'
                                : item.confidence > 60
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {item.confidence}{'% confidence'}
                          </Badge>
                        </div>
                        <Progress value={item.confidence} className="h-2 mb-2" />
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>
                            <CheckCircle2 className="inline h-3 w-3 mr-1 text-green-500" />
                            {item.supporting}{' supporting'}
                          </span>
                          <span>{item.contradicting}{' contradicting'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeAgent === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="font-semibold mb-2">{'Root Cause Analysis Summary'}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {'The recurring anomalies in Assay XYZ are primarily caused by degraded reagent lot 5678, compounded by column aging and suboptimal environmental conditions. The reagent lot shows 92% correlation with failures and should be immediately replaced. Secondary factors include column B-003 exceeding recommended injection count and elevated ambient temperatures affecting separation reproducibility.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-sm">{'Recommended Actions (Priority Order):'}</p>
                    <div className="space-y-2">
                      {[
                        {
                          priority: 1,
                          action: 'Quarantine and replace reagent lot 5678',
                          impact: 'Expected to resolve 80% of failures',
                        },
                        {
                          priority: 2,
                          action: 'Replace column B-003 with fresh column',
                          impact: 'Restore baseline separation performance',
                        },
                        {
                          priority: 3,
                          action: 'Implement HVAC monitoring and alerts',
                          impact: 'Prevent temperature-related variability',
                        },
                      ].map((item) => (
                        <div key={item.priority} className="flex items-start gap-3 p-3 bg-background border rounded-lg">
                          <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {item.priority}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.action}</p>
                            <p className="text-xs text-muted-foreground">{item.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Digital Twin Simulation */}
          {activeAgent === 4 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Beaker className="h-5 w-5 text-chart-3" />
                  <CardTitle>{'Digital Twin Simulation'}</CardTitle>
                </div>
                <CardDescription>
                  {'Test protocol and setting changes in a safe environment before applying to production'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>{'Select Changes to Simulate'}</Label>
                  <div className="space-y-2">
                    {[
                      { id: 'reagent', label: 'Replace with new reagent lot', impact: 'high' },
                      { id: 'column', label: 'Install fresh analytical column', impact: 'medium' },
                      { id: 'temp', label: 'Reduce column temperature by 5°C', impact: 'low' },
                      { id: 'flow', label: 'Adjust flow rate to 0.8 mL/min', impact: 'low' },
                    ].map((change) => (
                      <div key={change.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                        <Checkbox
                          id={change.id}
                          checked={selectedChanges.includes(change.id)}
                          onCheckedChange={() => toggleChange(change.id)}
                        />
                        <Label htmlFor={change.id} className="flex-1 cursor-pointer">
                          {change.label}
                        </Label>
                        <Badge
                          variant={
                            change.impact === 'high'
                              ? 'default'
                              : change.impact === 'medium'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {change.impact}{' impact'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={runSimulation}
                  disabled={selectedChanges.length === 0 || simulationRun}
                  className="w-full"
                  size="lg"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {'Simulate Impact'}
                </Button>

                {simulationRun && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-900 dark:text-green-100">
                            {'Simulation Complete'}
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {'Predicted outcome based on historical data and system models'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-3 bg-background rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <p className="text-xs text-muted-foreground">{'Predicted Pass Rate'}</p>
                          </div>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{'94%'}</p>
                          <p className="text-xs text-muted-foreground">{'(Current: 68%)'}</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <p className="text-xs text-muted-foreground">{'QC Pass Probability'}</p>
                          </div>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{'91%'}</p>
                          <p className="text-xs text-muted-foreground">{'High confidence'}</p>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-background rounded-lg">
                        <p className="text-sm font-medium mb-2">{'Simulation Notes:'}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {'Based on the selected changes, the model predicts a significant improvement in assay reliability. The new reagent lot alone accounts for most of the improvement (26% increase), with the fresh column providing additional stability. These changes are recommended for immediate implementation.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        {'Export Report'}
                      </Button>
                      <Button className="flex-1">
                        {'Apply Changes to Production'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
