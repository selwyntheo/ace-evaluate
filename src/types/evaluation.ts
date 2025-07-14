// Evaluation framework for automatic AI agent testing and scoring

export interface EvalTest {
  id: string;
  name: string;
  description: string;
  category: 'accuracy' | 'performance' | 'safety' | 'robustness' | 'consistency';
  type: 'prompt-response' | 'benchmark' | 'scenario' | 'conversation' | 'code-generation';
  weight: number; // 1-10 scale
  timeout: number; // in seconds
  config: {
    prompts?: string[];
    expectedPatterns?: string[];
    benchmarkDataset?: string;
    scenarios?: EvalScenario[];
    metrics?: string[];
  };
}

export interface EvalScenario {
  id: string;
  name: string;
  description: string;
  input: string;
  expectedOutput?: string;
  evaluationCriteria: string[];    context?: Record<string, unknown>;
}

export interface EvalResult {
  testId: string;
  agentId: string;
  score: number; // 0-100
  passed: boolean;
  executionTime: number; // in ms
  details: {
    responses: string[];
    metrics: Record<string, number>;
    errors: string[];
    reasoning: string;
  };
  timestamp: Date;
}

export interface EvalSuite {
  id: string;
  name: string;
  description: string;
  version: string;
  tests: EvalTest[];
  categories: string[];
  estimatedDuration: number; // in minutes
}

export interface AutoEvaluation {
  id: string;
  agentId: string;
  suiteId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number; // 0-100
  startTime: Date;
  endTime?: Date;
  results: EvalResult[];
  overallScore: number;
  summary: {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    averageScore: number;
    categoryScores: Record<string, number>;
  };
  triggeredBy: string;
  autoRetry: boolean;
}
