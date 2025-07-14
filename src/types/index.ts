// Core interfaces for AI Agent evaluation system

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  category: 'conversational' | 'analytical' | 'creative' | 'operational' | 'research';
  capabilities: string[];
  technicalSpecs: {
    modelType: string;
    parameters: string;
    contextWindow: number;
    responseTime: number;
  };
  cost: {
    setupCost: number;
    operationalCost: number;
    currency: string;
  };
  vendor: string;
  status: 'proposed' | 'under-review' | 'approved' | 'rejected' | 'deployed';
  dateProposed: Date;
  proposedBy: string;
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number; // 1-10 scale
  category: 'technical' | 'business' | 'operational' | 'financial';
}

export interface Evaluation {
  id: string;
  agentId: string;
  evaluatorId: string;
  evaluatorName: string;
  criteria: {
    criteriaId: string;
    score: number; // 1-10 scale
    comments: string;
  }[];
  overallScore: number;
  recommendation: 'approve' | 'reject' | 'needs-modification';
  comments: string;
  dateEvaluated: Date;
  status: 'draft' | 'submitted' | 'reviewed';
}

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  type: 'gpt' | 'claude' | 'gemini' | 'llama' | 'custom';
  capabilities: {
    textGeneration: boolean;
    codeGeneration: boolean;
    dataAnalysis: boolean;
    multimodal: boolean;
    reasoning: boolean;
  };
  pricing: {
    inputTokenCost: number;
    outputTokenCost: number;
    currency: string;
  };
  limits: {
    contextWindow: number;
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
  performance: {
    latency: number; // ms
    accuracy: number; // percentage
    reliability: number; // percentage
  };
  useCase: string[];
}

export interface LLMRecommendation {
  id: string;
  requestId: string;
  requestedBy: string;
  useCase: string;
  requirements: {
    budget: number;
    performance: 'low' | 'medium' | 'high';
    latency: 'low' | 'medium' | 'high';
    accuracy: 'low' | 'medium' | 'high';
    features: string[];
  };
  recommendedModels: {
    modelId: string;
    ranking: number;
    reasoningScore: number;
    costScore: number;
    performanceScore: number;
    overallScore: number;
    justification: string;
  }[];
  dateRequested: Date;
  status: 'pending' | 'completed' | 'reviewed';
}

export interface DashboardMetrics {
  totalAgents: number;
  agentsByStatus: Record<AIAgent['status'], number>;
  averageEvaluationScore: number;
  totalEvaluations: number;
  evaluationsThisMonth: number;
  topPerformingAgents: {
    agentId: string;
    agentName: string;
    averageScore: number;
  }[];
  costAnalysis: {
    totalProposedCost: number;
    totalDeployedCost: number;
    costSavings: number;
  };
  evaluationTrends: {
    month: string;
    evaluations: number;
    averageScore: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'evaluator' | 'admin';
  department: string;
  permissions: string[];
}
