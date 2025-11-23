# ADAPT Lab Simulations

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/niks-projects-f824e530/v0-lab-simulation-demos)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

> An interactive web application demonstrating next-generation AI-powered workflows for modern laboratory information management systems (LIMS).

## Overview

**ADAPT Lab Simulations** is a sophisticated demonstration platform showcasing how artificial intelligence can revolutionize pharmaceutical and chemical testing laboratory operations. The application simulates a complete Laboratory Information Management System (LIMS) with integrated AI-powered diagnostics, multi-agent analysis, and intelligent QC failure handling.

This project serves as both an educational tool and a reference implementation for building modern, interactive laboratory management applications using cutting-edge web technologies.

### Key Highlights

- **AI-Powered Diagnostics**: Multi-agent analysis system visualizing collaborative AI reasoning
- **Interactive Workflows**: Guided calibration processes, onboarding tours, and step-by-step procedures
- **Real-time Monitoring**: Live instrument tracking with parameter monitoring
- **Intelligent Assistance**: AI-powered QC failure analysis with automated corrective action recommendations
- **Modern UI/UX**: Dark mode support, responsive design, and accessibility-first components

## Features

### Sample Management
- Track and manage laboratory samples across various testing stages
- Filter and search through 100+ sample records
- Support for multiple sample types: QC, Assay, Stability, and Dissolution tests
- Real-time status updates (Pending, In Progress, Complete, Failed)
- Proactive alerts for failed samples and calibration drift warnings

### Instrument Monitoring
- Monitor 6 HPLC instruments from leading manufacturers (Agilent, Waters, Shimadzu)
- Real-time metrics: column temperature, system pressure, flow rate
- Status indicators with visual feedback (Ready, Running, Maintenance)
- Interactive tooltips with educational content and tutorial links

### Quality Control & Reporting
- Comprehensive QC test result tracking
- AI-powered failure analysis and root cause identification
- Automated corrective action recommendations
- Support ticket generation for complex issues
- Regulatory compliance reporting

### Multi-Agent AI Analysis
- Visual representation of AI agent collaboration using D3.js
- Interactive knowledge graph showing:
  - Multiple data sources (Instrument logs, QC data, Telemetry, Environmental)
  - Specialized AI agents (Data, Correlation, Evaluation, Summary)
  - Hypothesis generation and refinement across iterations
  - Root cause identification with confidence scores
- Real-time simulation controls with iteration playback

### Guided Calibration Workflow
- Step-by-step instrument calibration process:
  1. Prepare Standards
  2. Run System Suitability Test
  3. Verify Calibration Curve
  4. Document Results
- Progress tracking with visual indicators
- Input validation and data capture
- Animated transitions and helpful guidance

### Onboarding & Educational Features
- Interactive 5-step getting started guide
- Embedded video tutorials
- Guided product tours with contextual help
- Progress tracking and completion indicators
- Collapsible interface for improved user experience

## Technology Stack

### Frontend
- **[Next.js 16.0.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.0](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### UI Components & Styling
- **[Shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Data Visualization
- **[D3.js](https://d3js.org/)** - Advanced data visualization for multi-agent graphs
- **[Recharts 2.15.4](https://recharts.org/)** - React charting library

### Form Handling
- **[React Hook Form 7.60.0](https://react-hook-form.com/)** - Performant form management
- **[Zod 3.25.76](https://zod.dev/)** - TypeScript-first schema validation

### Additional Libraries
- **[date-fns 4.1.0](https://date-fns.org/)** - Date utility library
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel component
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nik-kale/ADAPT-Lab-Simulations.git
cd ADAPT-Lab-Simulations
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
ADAPT-Lab-Simulations/
├── app/
│   ├── page.tsx              # Main application entry point
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles
├── components/
│   ├── lims-home.tsx         # Dashboard home page
│   ├── lims-samples.tsx      # Sample management module
│   ├── lims-instruments.tsx  # Instrument monitoring
│   ├── lims-reports.tsx      # QC reporting interface
│   ├── calibration-page.tsx  # Calibration workflow
│   ├── multi-agent-analysis.tsx # AI diagnostics visualization
│   ├── qc-assistant-modal.tsx   # QC analysis assistant
│   ├── onboarding-checklist.tsx # Getting started guide
│   ├── product-tour.tsx      # Interactive tour component
│   └── ui/                   # Shadcn UI primitives
├── lib/
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── .github/                  # GitHub templates and workflows
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Deployment

This project is automatically deployed to Vercel. Any changes pushed to the main branch will trigger a new deployment.

**Live Demo**: [https://vercel.com/niks-projects-f824e530/v0-lab-simulation-demos](https://vercel.com/niks-projects-f824e530/v0-lab-simulation-demos)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nik-kale/ADAPT-Lab-Simulations)

## Usage

### Navigating the Application

The application features a tab-based navigation system:

- **Home**: Dashboard overview with quick stats and recent activity
- **Samples**: Sample management and tracking interface
- **Instruments**: Real-time instrument monitoring
- **QC Reports**: Quality control test results and analysis
- **Agentic AI**: Multi-agent diagnostic visualization

### User Profile Features

Access additional features from the user menu:
- **Ask Assistant**: Get help with general LIMS questions
- **Open Support Ticket**: Create support tickets for issues
- **Onboarding Assistant**: Restart the guided tour

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## Security

For information about reporting security vulnerabilities, please see our [Security Policy](./.github/SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Built with [v0.app](https://v0.app) - AI-powered UI generation
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## Contact & Support

For questions, feedback, or support:
- Open an issue on GitHub
- Check the [Discussions](https://github.com/nik-kale/ADAPT-Lab-Simulations/discussions) page
- Review the [documentation](./docs) (coming soon)

---

**Built with** ❤️ **for the laboratory science community**
