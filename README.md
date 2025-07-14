# AI Agent Evaluation Platform

A comprehensive Next.js TypeScript application designed for senior managers to evaluate AI agents, recommend LLM models, and track performance metrics.

## Features

- **📊 Dashboard**: Real-time metrics and analytics for AI agent evaluations
- **🤖 AI Agent Management**: Propose, evaluate, and track AI agents across different categories
- **📋 Evaluation System**: Comprehensive evaluation framework with multiple criteria
- **🧪 Automatic Evaluations**: Automated test suites and benchmarks for AI agents
- **💡 LLM Recommendations**: AI-powered recommendations for optimal LLM models based on use cases
- **📈 Analytics**: Deep insights into evaluation trends and performance metrics
- **⚙️ Settings**: User preferences and application configuration

## Evaluation Framework

### Manual Evaluations
- Structured evaluation criteria with weighted scoring
- Multiple evaluator support with consensus tracking
- Comprehensive scoring system (1-10 scale)
- Recommendation engine (approve/reject/modify)

### Automatic Evaluations
- **Test Suites**: Predefined evaluation frameworks for different use cases
- **Benchmarking**: Standardized tests for accuracy, performance, and safety
- **Real-time Execution**: Live progress tracking and results
- **Comprehensive Scoring**: Multi-dimensional evaluation with category breakdowns

#### Available Test Suites:
1. **General AI Capability Assessment**
   - Logical reasoning tests
   - Knowledge accuracy verification
   - Performance benchmarking
   - Safety and alignment checks

2. **Customer Support Specialist**
   - Support ticket handling scenarios
   - Escalation management tests
   - Empathy and professionalism evaluation
   - Policy adherence verification

3. **Code Generation and Review**
   - Code quality assessment
   - Security vulnerability detection
   - Syntax and functionality validation
   - Best practices compliance

### Evaluation Categories:
- **Accuracy**: Correctness of responses and outputs
- **Performance**: Speed and efficiency metrics
- **Safety**: Alignment with human values and ethical guidelines
- **Robustness**: Handling of edge cases and unexpected inputs
- **Consistency**: Reliability across multiple test runs

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Recharts
- **UI Components**: Headless UI
- **Development**: ESLint, Prettier

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Dashboard
│   ├── agents/            # AI agents management
│   ├── evaluations/       # Evaluation system
│   │   ├── page.tsx       # Manual evaluations
│   │   └── auto/          # Automatic evaluation system
│   ├── recommendations/   # LLM recommendations
│   ├── analytics/         # Analytics dashboard
│   ├── settings/          # Application settings
│   └── api/               # API endpoints
│       └── evaluations/   # Evaluation API
├── components/            # Reusable React components
│   └── Sidebar.tsx       # Navigation sidebar
├── lib/                   # Utility functions and data
│   ├── data.ts           # Mock data and sample content
│   ├── utils.ts          # Helper functions
│   └── evaluation-engine.ts # Automatic evaluation engine
└── types/                 # TypeScript type definitions
    ├── index.ts          # Core interfaces and types
    └── evaluation.ts     # Evaluation system types
```

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Components

### Dashboard
- Overview of AI agent evaluations
- Key performance metrics
- Evaluation trends and analytics
- Quick action buttons

### AI Agents
- Browse and filter AI agent proposals
- View agent details and capabilities
- Track evaluation status
- Cost analysis

### Evaluations
- Comprehensive evaluation framework
- Multiple evaluation criteria
- Scoring system with recommendations
- Progress tracking
- **Automatic test suites** with real-time execution
- **Benchmarking** across multiple categories
- **Safety and alignment** testing

### LLM Recommendations
- Request personalized LLM recommendations
- Compare models based on requirements
- Cost-performance analysis
- Use case matching

### Analytics
- Deep dive into evaluation metrics
- Performance trends over time
- Category-wise analysis
- Top performing agents

## Data Models

The application uses comprehensive TypeScript interfaces for:
- AI Agent specifications
- Evaluation criteria and scores
- LLM model comparisons
- User management
- Dashboard metrics

## Contributing

1. Follow the coding guidelines in `.github/copilot-instructions.md`
2. Use TypeScript for all new code
3. Follow the established component patterns
4. Ensure responsive design with Tailwind CSS
5. Test functionality across different screen sizes

## License

This project is developed for enterprise use in AI agent evaluation and management.
