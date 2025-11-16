'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Database, Play, Pause, RotateCcw, AlertCircle, Beaker, TrendingUp, Settings, FileText, CheckCircle2 } from 'lucide-react'
import * as d3 from 'd3'


interface Node {
  id: string
  type: 'data-source' | 'agent' | 'hypothesis' | 'root-cause'
  iteration: number
  x: number
  y: number
  label: string
  confidence?: number
  status: 'active' | 'completed' | 'pending'
  dependencies: string[]
  agentId?: number
  data?: any
}

interface Link {
  source: string
  target: string
  type: 'data-flow' | 'collaboration' | 'conclusion'
}

export function MultiAgentAnalysis() {
  const [iterationRange, setIterationRange] = useState([8])
  const [showRejected, setShowRejected] = useState(false)
  const [showDependencies, setShowDependencies] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Generate nodes and links for the multi-agent diagnostic process
  const generateGraph = (maxIteration: number) => {
    const nodes: Node[] = []
    const links: Link[] = []

    // Data sources (iteration 0)
    const dataSources = [
      { id: 'ds-logs', label: 'Instrument Logs', y: 0 },
      { id: 'ds-qc', label: 'QC Data', y: 1 },
      { id: 'ds-telemetry', label: 'Telemetry', y: 2 },
      { id: 'ds-env', label: 'Environmental', y: 3 },
    ]

    dataSources.forEach(ds => {
      nodes.push({
        id: ds.id,
        type: 'data-source',
        iteration: 0,
        x: 0,
        y: ds.y,
        label: ds.label,
        status: 'completed',
        dependencies: [],
      })
    })

    // Agent hypotheses across iterations
    const agents = [
      { id: 1, name: 'Data Agent', color: '#3b82f6' },
      { id: 2, name: 'Correlation Agent', color: '#8b5cf6' },
      { id: 3, name: 'Evaluation Agent', color: '#ec4899' },
      { id: 4, name: 'Summary Agent', color: '#10b981' },
    ]

    for (let iter = 1; iter <= maxIteration; iter++) {
      // Each agent generates hypotheses
      agents.forEach((agent, agentIdx) => {
        const numHypotheses = iter < 3 ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 2) + 1
        
        for (let h = 0; h < numHypotheses; h++) {
          const confidence = Math.random() * 0.4 + 0.3 + (iter / maxIteration) * 0.3
          const isRejected = confidence < 0.5 && iter > 2
          const hypothesisId = `h-${iter}-${agent.id}-${h}`
          
          nodes.push({
            id: hypothesisId,
            type: 'hypothesis',
            iteration: iter,
            x: iter,
            y: agentIdx * 3 + h,
            label: `Hypothesis ${agent.id}.${h}`,
            confidence: confidence,
            status: isRejected ? 'pending' : iter === maxIteration ? 'active' : 'completed',
            dependencies: [],
            agentId: agent.id,
            data: { agentName: agent.name, color: agent.color, rejected: isRejected }
          })

          // Link from data sources (iteration 1)
          if (iter === 1) {
            dataSources.forEach(ds => {
              if (Math.random() > 0.5) {
                links.push({
                  source: ds.id,
                  target: hypothesisId,
                  type: 'data-flow'
                })
              }
            })
          } else {
            // Link from previous iteration hypotheses
            const prevNodes = nodes.filter(n => n.iteration === iter - 1 && n.type === 'hypothesis')
            const relevantPrev = prevNodes.filter(() => Math.random() > 0.3).slice(0, 3)
            relevantPrev.forEach(prevNode => {
              links.push({
                source: prevNode.id,
                target: hypothesisId,
                type: 'collaboration'
              })
            })
          }
        }
      })
    }

    // Add root cause nodes at the end
    const finalHypotheses = nodes.filter(n => n.iteration === maxIteration && n.type === 'hypothesis' && !n.data?.rejected)
    const topHypotheses = finalHypotheses
      .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
      .slice(0, 3)

    topHypotheses.forEach((hyp, idx) => {
      const rcId = `rc-${idx}`
      nodes.push({
        id: rcId,
        type: 'root-cause',
        iteration: maxIteration + 1,
        x: maxIteration + 1,
        y: idx * 4 + 2,
        label: `Root Cause ${idx + 1}`,
        confidence: hyp.confidence,
        status: idx === 0 ? 'active' : 'completed',
        dependencies: [hyp.id],
      })

      links.push({
        source: hyp.id,
        target: rcId,
        type: 'conclusion'
      })
    })

    return { nodes, links }
  }

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = 600

    svg.selectAll('*').remove()

    const { nodes, links } = generateGraph(iterationRange[0])

    // Filter nodes based on settings
    const visibleNodes = nodes.filter(n => {
      if (!showRejected && n.data?.rejected) return false
      return true
    })

    const nodeMap = new Map(visibleNodes.map(n => [n.id, n]))

    // Calculate layout
    const maxIter = Math.max(...visibleNodes.map(n => n.iteration))
    const xScale = d3.scaleLinear()
      .domain([0, maxIter + 1])
      .range([80, width - 80])

    // Group nodes by iteration to calculate y positions
    const nodesByIteration = d3.group(visibleNodes, n => n.iteration)
    nodesByIteration.forEach((iterNodes, iter) => {
      const ySpacing = height / (iterNodes.length + 1)
      iterNodes.forEach((node, idx) => {
        node.x = xScale(node.iteration)
        node.y = ySpacing * (idx + 1)
      })
    })

    const g = svg.append('g')

    const validLinks = links.filter(link => {
      return nodeMap.has(link.source) && nodeMap.has(link.target)
    })

    // Draw links
    const linkElements = g.selectAll('.link')
      .data(validLinks)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => {
        const source = nodeMap.get(d.source)
        return source?.x || 0
      })
      .attr('y1', d => {
        const source = nodeMap.get(d.source)
        return source?.y || 0
      })
      .attr('x2', d => {
        const target = nodeMap.get(d.target)
        return target?.x || 0
      })
      .attr('y2', d => {
        const target = nodeMap.get(d.target)
        return target?.y || 0
      })
      .attr('stroke', d => {
        if (d.type === 'conclusion') return '#10b981'
        if (d.type === 'data-flow') return '#3b82f6'
        return '#94a3b8'
      })
      .attr('stroke-width', d => d.type === 'conclusion' ? 3 : 1.5)
      .attr('stroke-opacity', d => showDependencies ? (d.type === 'conclusion' ? 0.8 : 0.3) : 0.1)
      .attr('stroke-dasharray', d => d.type === 'collaboration' ? '5,5' : '0')

    // Draw nodes
    const nodeGroups = g.selectAll('.node')
      .data(visibleNodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        setSelectedNode(d)
        setTooltipPos({ x: event.pageX, y: event.pageY })
        
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', d.type === 'data-source' ? 22 : d.type === 'root-cause' ? 26 : 18)
      })
      .on('mouseout', function(event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', d.type === 'data-source' ? 18 : d.type === 'root-cause' ? 22 : 14)
      })
      .on('mousemove', function(event) {
        setTooltipPos({ x: event.pageX, y: event.pageY })
      })

    // Node circles
    nodeGroups.append('circle')
      .attr('r', d => d.type === 'data-source' ? 18 : d.type === 'root-cause' ? 22 : 14)
      .attr('fill', d => {
        if (d.type === 'data-source') return '#3b82f6'
        if (d.type === 'root-cause') return d.status === 'active' ? '#10b981' : '#6b7280'
        if (d.data?.rejected) return '#ef4444'
        if (d.status === 'active') return d.data?.color || '#8b5cf6'
        if (d.status === 'completed') return '#6b7280'
        return '#94a3b8'
      })
      .attr('stroke', d => d.status === 'active' ? '#fff' : 'none')
      .attr('stroke-width', 3)
      .attr('opacity', d => d.data?.rejected ? 0.3 : 1)

    // Confidence text for hypotheses and root causes
    nodeGroups.filter(d => d.confidence)
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('fill', 'white')
      .attr('font-size', d => d.type === 'root-cause' ? '11px' : '9px')
      .attr('font-weight', 'bold')
      .text(d => Math.round((d.confidence || 0) * 100) + '%')

    // Iteration labels at top
    const iterations = Array.from(new Set(visibleNodes.map(n => n.iteration))).sort((a, b) => a - b)
    iterations.forEach(iter => {
      g.append('text')
        .attr('x', xScale(iter))
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('fill', 'hsl(var(--muted-foreground))')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .text(iter === 0 ? 'Data Sources' : iter > maxIter ? 'Root Causes' : `Iter ${iter}`)
    })

  }, [iterationRange, showRejected, showDependencies])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setIterationRange(prev => {
          const newVal = prev[0] >= 8 ? 1 : prev[0] + 1
          return [newVal]
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Multi-Agent Analysis</h1>
        <p className="text-muted-foreground">
          Adaptive Diagnostics for Recurring Lab Anomalies
        </p>
      </div>

      <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/30 shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-destructive text-xl flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Recurring Anomalies Detected
              </CardTitle>
              <CardDescription>
                Assay XYZ showing consistent issues over last 14 days
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Affected Runs', value: '18', icon: Beaker },
              { label: 'Failure Rate Increase', value: '32%', icon: TrendingUp },
              { label: 'Affected Instruments', value: '2', icon: Settings },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="p-4 bg-background/50 rounded-lg border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Multi-Agent Collaborative Diagnostic Pipeline</CardTitle>
              <CardDescription>
                Interactive visualization showing agent iterations, hypothesis formation, and root cause determination
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIterationRange([1])}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant={isPlaying ? "destructive" : "default"}
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {/* Control Panel */}
          <div className="grid grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg border">
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Select Iteration Range:</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground min-w-[60px]">Iter {iterationRange[0]}</span>
                <Slider
                  value={iterationRange}
                  onValueChange={setIterationRange}
                  min={1}
                  max={8}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-bold min-w-[40px] text-right">{iterationRange[0]}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Display Options:</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rejected"
                    checked={showRejected}
                    onCheckedChange={(checked) => setShowRejected(checked as boolean)}
                  />
                  <Label htmlFor="rejected" className="text-sm cursor-pointer">
                    Show rejected hypotheses
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dependencies"
                    checked={showDependencies}
                    onCheckedChange={(checked) => setShowDependencies(checked as boolean)}
                  />
                  <Label htmlFor="dependencies" className="text-sm cursor-pointer">
                    Show dependencies
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* D3 Visualization */}
          <div className="relative border rounded-lg bg-background/50">
            <svg ref={svgRef} width="100%" height="600" className="overflow-visible" />
            
            {/* Tooltip */}
            {selectedNode && (
              <div
                ref={tooltipRef}
                className="fixed z-50 px-4 py-3 bg-popover text-popover-foreground border rounded-lg shadow-lg max-w-xs pointer-events-none"
                style={{
                  left: tooltipPos.x + 15,
                  top: tooltipPos.y + 15,
                }}
              >
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{selectedNode.label}</p>
                  {selectedNode.data?.agentName && (
                    <p className="text-xs text-muted-foreground">Agent: {selectedNode.data.agentName}</p>
                  )}
                  {selectedNode.confidence && (
                    <p className="text-xs">
                      <span className="text-muted-foreground">Confidence:</span>{' '}
                      <span className="font-bold">{Math.round(selectedNode.confidence * 100)}%</span>
                    </p>
                  )}
                  <p className="text-xs">
                    <span className="text-muted-foreground">Status:</span>{' '}
                    <span className={`font-medium ${
                      selectedNode.status === 'active' ? 'text-primary' :
                      selectedNode.status === 'completed' ? 'text-green-600' : 'text-muted-foreground'
                    }`}>
                      {selectedNode.status === 'active' ? 'Active Hypothesis' :
                       selectedNode.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </p>
                  {selectedNode.type === 'hypothesis' && selectedNode.data?.rejected && (
                    <Badge variant="destructive" className="text-xs">Rejected - Low Confidence</Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-lg border text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#3b82f6]" />
              <span>Data Sources</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#8b5cf6]" />
              <span>Active Hypothesis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#6b7280]" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#10b981]" />
              <span>Selected Root Cause</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#ef4444] opacity-30" />
              <span>Rejected</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg">Root Cause Analysis Summary</CardTitle>
          <CardDescription>Highest confidence hypothesis selected by agents</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-green-900 dark:text-green-100">
                    Degraded Reagent Lot Causing Variable Results
                  </p>
                  <Badge className="bg-green-600">92% Confidence</Badge>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
                  Multi-agent collaboration across {iterationRange[0]} iterations identified reagent lot 5678 as the primary root cause. 
                  Data retrieval agent gathered evidence from QC history and instrument logs, correlation agent found 80% 
                  failure correlation, evaluation agent confirmed with statistical significance, and summary agent selected 
                  this as the highest confidence root cause for immediate action.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-background border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Data Sources Analyzed</p>
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs text-muted-foreground">Logs, QC, Telemetry, Env</p>
            </div>
            <div className="p-4 bg-background border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Hypotheses Generated</p>
              <p className="text-2xl font-bold">{Math.floor(iterationRange[0] * 2.5)}</p>
              <p className="text-xs text-muted-foreground">Across all iterations</p>
            </div>
            <div className="p-4 bg-background border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Collaboration Events</p>
              <p className="text-2xl font-bold">{Math.floor(iterationRange[0] * 4.2)}</p>
              <p className="text-xs text-muted-foreground">Inter-agent communications</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Report */}
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Detailed Analysis Report</CardTitle>
              <CardDescription>Complete diagnostic findings with evidence and recommendations</CardDescription>
            </div>
            <Button size="lg" className="shadow-md">
              <FileText className="mr-2 h-4 w-4" />
              Download PDF Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* PDF Preview */}
          <div className="bg-white text-black p-8 rounded-lg border-2 shadow-lg">
            <div className="space-y-6">
              <div className="border-b-2 border-gray-300 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Multi-Agent Diagnostic Analysis Report</h1>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold">Analysis ID:</p>
                    <p>ADAPT-2025-001</p>
                  </div>
                  <div>
                    <p className="font-semibold">Generated:</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Iterations:</p>
                    <p>{iterationRange[0]} cycles</p>
                  </div>
                  <div>
                    <p className="font-semibold">Confidence:</p>
                    <p className="text-green-600 font-semibold">92%</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Executive Summary</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Multi-agent collaborative analysis across {iterationRange[0]} iterations identified reagent lot 5678 as the primary 
                  root cause of recurring failures in Assay XYZ with 92% confidence. Four specialized agents gathered data from 
                  multiple sources, formed and evaluated hypotheses through iterative collaboration, and converged on this 
                  conclusion with high statistical significance.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Key Findings</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                    <p className="text-gray-700">80% correlation between failed runs and reagent lot 5678</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                    <p className="text-gray-700">Statistical significance confirmed through {iterationRange[0]} agent collaboration cycles</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                    <p className="text-gray-700">Multiple data sources validated the hypothesis independently</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Recommended Actions</h2>
                <div className="border-l-4 border-red-500 pl-3 py-2">
                  <p className="font-semibold text-gray-900">Immediate: Quarantine and replace reagent lot 5678</p>
                  <p className="text-sm text-gray-600">Expected to resolve 80% of recurring failures</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MultiAgentAnalysis
