import { 
  AIAgent, 
  EvaluationCriteria, 
  LLMModel, 
  DashboardMetrics,
  User 
} from '@/types';

// Mock evaluation criteria
export const mockCriteria: EvaluationCriteria[] = [
  {
    id: 'tech-accuracy',
    name: 'Technical Accuracy',
    description: 'How accurate and reliable are the AI agent responses',
    weight: 9,
    category: 'technical'
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Response time and system efficiency',
    weight: 8,
    category: 'technical'
  },
  {
    id: 'scalability',
    name: 'Scalability',
    description: 'Ability to handle increased workload',
    weight: 7,
    category: 'technical'
  },
  {
    id: 'cost-effectiveness',
    name: 'Cost Effectiveness',
    description: 'Value for money and ROI potential',
    weight: 9,
    category: 'financial'
  },
  {
    id: 'integration',
    name: 'Integration Ease',
    description: 'How easily it integrates with existing systems',
    weight: 7,
    category: 'operational'
  },
  {
    id: 'user-experience',
    name: 'User Experience',
    description: 'Quality of interaction and usability',
    weight: 8,
    category: 'business'
  },
  {
    id: 'security',
    name: 'Security & Compliance',
    description: 'Data protection and regulatory compliance',
    weight: 9,
    category: 'operational'
  },
  {
    id: 'support',
    name: 'Vendor Support',
    description: 'Quality of documentation and customer support',
    weight: 6,
    category: 'business'
  }
];

// Mock AI Agents
export const mockAgents: AIAgent[] = [
  {
    id: 'agent-1',
    name: 'CustomerCare AI',
    description: 'Advanced conversational AI for customer support with multi-language capabilities',
    category: 'conversational',
    capabilities: ['Natural Language Processing', 'Multi-language Support', 'Sentiment Analysis', 'Ticket Routing'],
    technicalSpecs: {
      modelType: 'GPT-4 Turbo',
      parameters: '175B',
      contextWindow: 128000,
      responseTime: 2.3
    },
    cost: {
      setupCost: 25000,
      operationalCost: 8500,
      currency: 'USD'
    },
    vendor: 'OpenAI Solutions',
    status: 'under-review',
    dateProposed: new Date('2025-01-15'),
    proposedBy: 'Sarah Chen'
  },
  {
    id: 'agent-2',
    name: 'DataInsight Pro',
    description: 'AI-powered analytics agent for business intelligence and data visualization',
    category: 'analytical',
    capabilities: ['Data Analysis', 'Report Generation', 'Predictive Modeling', 'Data Visualization'],
    technicalSpecs: {
      modelType: 'Claude 3.5 Sonnet',
      parameters: '200B',
      contextWindow: 200000,
      responseTime: 1.8
    },
    cost: {
      setupCost: 35000,
      operationalCost: 12000,
      currency: 'USD'
    },
    vendor: 'Anthropic Enterprise',
    status: 'approved',
    dateProposed: new Date('2025-01-10'),
    proposedBy: 'Marcus Rodriguez'
  },
  {
    id: 'agent-3',
    name: 'CodeReview Assistant',
    description: 'AI agent specialized in code review, bug detection, and security analysis',
    category: 'operational',
    capabilities: ['Code Review', 'Bug Detection', 'Security Analysis', 'Documentation Generation'],
    technicalSpecs: {
      modelType: 'GPT-4o',
      parameters: '175B',
      contextWindow: 128000,
      responseTime: 1.5
    },
    cost: {
      setupCost: 15000,
      operationalCost: 5500,
      currency: 'USD'
    },
    vendor: 'GitHub Solutions',
    status: 'deployed',
    dateProposed: new Date('2024-12-20'),
    proposedBy: 'Alex Thompson'
  },
  {
    id: 'agent-4',
    name: 'Creative Content Hub',
    description: 'Multi-modal AI for creative content generation including text, images, and videos',
    category: 'creative',
    capabilities: ['Content Creation', 'Image Generation', 'Video Editing', 'Brand Consistency'],
    technicalSpecs: {
      modelType: 'Gemini Pro',
      parameters: '137B',
      contextWindow: 1000000,
      responseTime: 3.2
    },
    cost: {
      setupCost: 45000,
      operationalCost: 18000,
      currency: 'USD'
    },
    vendor: 'Google Cloud',
    status: 'proposed',
    dateProposed: new Date('2025-01-20'),
    proposedBy: 'Emily Watson'
  },
  {
    id: 'agent-5',
    name: 'Research Navigator',
    description: 'Advanced research AI capable of literature review, citation analysis, and knowledge synthesis',
    category: 'research',
    capabilities: ['Literature Review', 'Citation Analysis', 'Knowledge Synthesis', 'Academic Writing'],
    technicalSpecs: {
      modelType: 'Claude 3 Opus',
      parameters: '175B',
      contextWindow: 200000,
      responseTime: 2.1
    },
    cost: {
      setupCost: 30000,
      operationalCost: 10000,
      currency: 'USD'
    },
    vendor: 'Anthropic Research',
    status: 'rejected',
    dateProposed: new Date('2025-01-05'),
    proposedBy: 'Dr. James Liu'
  }
];

// Mock LLM Models
export const mockLLMModels: LLMModel[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    type: 'gpt',
    capabilities: {
      textGeneration: true,
      codeGeneration: true,
      dataAnalysis: true,
      multimodal: true,
      reasoning: true
    },
    pricing: {
      inputTokenCost: 0.01,
      outputTokenCost: 0.03,
      currency: 'USD'
    },
    limits: {
      contextWindow: 128000,
      requestsPerMinute: 500,
      tokensPerMinute: 150000
    },
    performance: {
      latency: 2300,
      accuracy: 94,
      reliability: 99.5
    },
    useCase: ['Customer Support', 'Content Creation', 'Code Generation', 'Data Analysis']
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    type: 'claude',
    capabilities: {
      textGeneration: true,
      codeGeneration: true,
      dataAnalysis: true,
      multimodal: true,
      reasoning: true
    },
    pricing: {
      inputTokenCost: 0.003,
      outputTokenCost: 0.015,
      currency: 'USD'
    },
    limits: {
      contextWindow: 200000,
      requestsPerMinute: 1000,
      tokensPerMinute: 200000
    },
    performance: {
      latency: 1800,
      accuracy: 96,
      reliability: 99.7
    },
    useCase: ['Research', 'Analysis', 'Writing', 'Problem Solving']
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    type: 'gemini',
    capabilities: {
      textGeneration: true,
      codeGeneration: true,
      dataAnalysis: true,
      multimodal: true,
      reasoning: true
    },
    pricing: {
      inputTokenCost: 0.00025,
      outputTokenCost: 0.0005,
      currency: 'USD'
    },
    limits: {
      contextWindow: 1000000,
      requestsPerMinute: 1500,
      tokensPerMinute: 300000
    },
    performance: {
      latency: 3200,
      accuracy: 92,
      reliability: 99.2
    },
    useCase: ['Multimodal Tasks', 'Long Context', 'Creative Projects', 'Research']
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'manager',
    department: 'Product Management',
    permissions: ['evaluate', 'approve', 'view-metrics']
  },
  {
    id: 'user-2',
    name: 'Marcus Rodriguez',
    email: 'marcus.rodriguez@company.com',
    role: 'evaluator',
    department: 'Engineering',
    permissions: ['evaluate', 'view-metrics']
  },
  {
    id: 'user-3',
    name: 'Emily Watson',
    email: 'emily.watson@company.com',
    role: 'manager',
    department: 'Marketing',
    permissions: ['evaluate', 'approve', 'view-metrics']
  }
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalAgents: 5,
  agentsByStatus: {
    proposed: 1,
    'under-review': 1,
    approved: 1,
    rejected: 1,
    deployed: 1
  },
  averageEvaluationScore: 7.8,
  totalEvaluations: 12,
  evaluationsThisMonth: 8,
  topPerformingAgents: [
    { agentId: 'agent-2', agentName: 'DataInsight Pro', averageScore: 8.9 },
    { agentId: 'agent-3', agentName: 'CodeReview Assistant', averageScore: 8.5 },
    { agentId: 'agent-1', agentName: 'CustomerCare AI', averageScore: 8.2 }
  ],
  costAnalysis: {
    totalProposedCost: 150000,
    totalDeployedCost: 15000,
    costSavings: 0
  },
  evaluationTrends: [
    { month: 'Sep 2024', evaluations: 3, averageScore: 7.2 },
    { month: 'Oct 2024', evaluations: 4, averageScore: 7.5 },
    { month: 'Nov 2024', evaluations: 5, averageScore: 7.8 },
    { month: 'Dec 2024', evaluations: 7, averageScore: 8.1 },
    { month: 'Jan 2025', evaluations: 8, averageScore: 7.8 }
  ]
};
