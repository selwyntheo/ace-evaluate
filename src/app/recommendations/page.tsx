'use client';

import { useState } from 'react';
import { 
  LightBulbIcon, 
  PlusIcon,
  CpuChipIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { mockLLMModels } from '@/lib/data';
import { formatCurrency, getStatusColor, formatDate } from '@/lib/utils';

// Mock recommendations data
const mockRecommendations = [
  {
    id: 'rec-1',
    requestedBy: 'Sarah Chen',
    useCase: 'Customer Support Automation',
    requirements: {
      budget: 10000,
      performance: 'high' as const,
      latency: 'low' as const,
      accuracy: 'high' as const,
      features: ['Natural Language Processing', 'Multi-language Support', 'Sentiment Analysis']
    },
    recommendedModels: [
      {
        modelId: 'gpt-4-turbo',
        ranking: 1,
        reasoningScore: 9.2,
        costScore: 7.5,
        performanceScore: 9.1,
        overallScore: 8.8,
        justification: 'Excellent accuracy and performance with strong multilingual capabilities'
      },
      {
        modelId: 'claude-3-5-sonnet',
        ranking: 2,
        reasoningScore: 9.0,
        costScore: 8.5,
        performanceScore: 8.8,
        overallScore: 8.7,
        justification: 'Great cost-performance ratio with reliable customer support capabilities'
      }
    ],
    dateRequested: new Date('2025-01-18'),
    status: 'completed' as const
  },
  {
    id: 'rec-2',
    requestedBy: 'Marcus Rodriguez',
    useCase: 'Code Review and Analysis',
    requirements: {
      budget: 5000,
      performance: 'high' as const,
      latency: 'medium' as const,
      accuracy: 'high' as const,
      features: ['Code Analysis', 'Bug Detection', 'Security Review']
    },
    recommendedModels: [
      {
        modelId: 'gpt-4-turbo',
        ranking: 1,
        reasoningScore: 9.5,
        costScore: 6.8,
        performanceScore: 9.2,
        overallScore: 8.9,
        justification: 'Superior code understanding and analysis capabilities'
      }
    ],
    dateRequested: new Date('2025-01-16'),
    status: 'reviewed' as const
  },
  {
    id: 'rec-3',
    requestedBy: 'Emily Watson',
    useCase: 'Creative Content Generation',
    requirements: {
      budget: 15000,
      performance: 'medium' as const,
      latency: 'medium' as const,
      accuracy: 'medium' as const,
      features: ['Content Creation', 'Image Generation', 'Brand Consistency']
    },
    recommendedModels: [],
    dateRequested: new Date('2025-01-20'),
    status: 'pending' as const
  }
];

export default function RecommendationsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const filteredRecommendations = mockRecommendations.filter(rec => {
    return statusFilter === 'all' || rec.status === statusFilter;
  });

  const statuses = Array.from(new Set(mockRecommendations.map(rec => rec.status)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">LLM Recommendations</h1>
          <p className="mt-2 text-gray-600">Get AI-powered recommendations for the best LLM models based on your specific use case and requirements.</p>
        </div>
        <button 
          onClick={() => setShowRequestForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Request Recommendation
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <LightBulbIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">{mockRecommendations.length}</p>
              <p className="text-gray-600">Total Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">
                {mockRecommendations.filter(r => r.status === 'pending').length}
              </p>
              <p className="text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <CpuChipIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">{mockLLMModels.length}</p>
              <p className="text-gray-600">Available Models</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">
                {mockRecommendations.filter(r => r.status === 'completed').length}
              </p>
              <p className="text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-6">
        {filteredRecommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.id} recommendation={recommendation} />
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <LightBulbIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-500">Try adjusting your filters or request a new recommendation.</p>
        </div>
      )}

      {/* Request Form Modal (simplified) */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Request LLM Recommendation</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Use Case</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Customer Support Automation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (USD)</label>
                  <input 
                    type="number" 
                    placeholder="10000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface RecommendationCardProps {
  recommendation: typeof mockRecommendations[0];
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{recommendation.useCase}</h3>
          <p className="text-sm text-gray-500">Requested by {recommendation.requestedBy} • {formatDate(recommendation.dateRequested)}</p>
        </div>
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(recommendation.status)}`}>
          {recommendation.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Budget:</span>
            <span className="ml-1 font-medium">{formatCurrency(recommendation.requirements.budget)}</span>
          </div>
          <div>
            <span className="text-gray-500">Performance:</span>
            <span className="ml-1 font-medium capitalize">{recommendation.requirements.performance}</span>
          </div>
          <div>
            <span className="text-gray-500">Latency:</span>
            <span className="ml-1 font-medium capitalize">{recommendation.requirements.latency}</span>
          </div>
          <div>
            <span className="text-gray-500">Accuracy:</span>
            <span className="ml-1 font-medium capitalize">{recommendation.requirements.accuracy}</span>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-gray-500 text-sm">Required Features:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {recommendation.requirements.features.map((feature, index) => (
              <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Models */}
      {recommendation.recommendedModels.length > 0 ? (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recommended Models</h4>
          <div className="space-y-3">
            {recommendation.recommendedModels.map((model) => {
              const llmModel = mockLLMModels.find(m => m.id === model.modelId);
              return (
                <div key={model.modelId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-gray-900">#{model.ranking} {llmModel?.name}</h5>
                      <p className="text-sm text-gray-500">{llmModel?.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{model.overallScore}/10</p>
                      <p className="text-xs text-gray-500">Overall Score</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Reasoning:</span>
                      <span className="ml-1 font-medium">{model.reasoningScore}/10</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Cost:</span>
                      <span className="ml-1 font-medium">{model.costScore}/10</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Performance:</span>
                      <span className="ml-1 font-medium">{model.performanceScore}/10</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <strong>Justification:</strong> {model.justification}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <ClockIcon className="h-8 w-8 mx-auto mb-2" />
          <p>Recommendation in progress...</p>
        </div>
      )}
    </div>
  );
}
