'use client';

import { useState } from 'react';
import { 
  DocumentCheckIcon, 
  PlusIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { formatDate, getStatusColor } from '@/lib/utils';

// Mock evaluations data
const mockEvaluations = [
  {
    id: 'eval-1',
    agentId: 'agent-1',
    agentName: 'CustomerCare AI',
    evaluatorId: 'user-1',
    evaluatorName: 'Sarah Chen',
    overallScore: 8.2,
    recommendation: 'approve' as const,
    status: 'submitted' as const,
    dateEvaluated: new Date('2025-01-18'),
    criteriaCount: 8
  },
  {
    id: 'eval-2',
    agentId: 'agent-2',
    agentName: 'DataInsight Pro',
    evaluatorId: 'user-2',
    evaluatorName: 'Marcus Rodriguez',
    overallScore: 8.9,
    recommendation: 'approve' as const,
    status: 'reviewed' as const,
    dateEvaluated: new Date('2025-01-15'),
    criteriaCount: 8
  },
  {
    id: 'eval-3',
    agentId: 'agent-3',
    agentName: 'CodeReview Assistant',
    evaluatorId: 'user-3',
    evaluatorName: 'Emily Watson',
    overallScore: 8.5,
    recommendation: 'approve' as const,
    status: 'reviewed' as const,
    dateEvaluated: new Date('2025-01-12'),
    criteriaCount: 8
  },
  {
    id: 'eval-4',
    agentId: 'agent-4',
    agentName: 'Creative Content Hub',
    evaluatorId: 'user-1',
    evaluatorName: 'Sarah Chen',
    overallScore: 7.1,
    recommendation: 'needs-modification' as const,
    status: 'draft' as const,
    dateEvaluated: new Date('2025-01-20'),
    criteriaCount: 6
  }
];

export default function EvaluationsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [recommendationFilter, setRecommendationFilter] = useState<string>('all');

  const filteredEvaluations = mockEvaluations.filter(evaluation => {
    const matchesStatus = statusFilter === 'all' || evaluation.status === statusFilter;
    const matchesRecommendation = recommendationFilter === 'all' || evaluation.recommendation === recommendationFilter;
    
    return matchesStatus && matchesRecommendation;
  });

  const statuses = Array.from(new Set(mockEvaluations.map(evaluation => evaluation.status)));
  const recommendations = Array.from(new Set(mockEvaluations.map(evaluation => evaluation.recommendation)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evaluations</h1>
          <p className="mt-2 text-gray-600">Review and manage AI agent evaluations and assessments.</p>
        </div>
        <div className="flex space-x-3">
          <a 
            href="/evaluations/auto"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <BeakerIcon className="h-5 w-5 mr-2" />
            Auto Evaluations
          </a>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            New Evaluation
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <DocumentCheckIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">{mockEvaluations.length}</p>
              <p className="text-gray-600">Total Evaluations</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">
                {mockEvaluations.filter(e => e.status === 'draft').length}
              </p>
              <p className="text-gray-600">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <StarIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">
                {(mockEvaluations.reduce((sum, e) => sum + e.overallScore, 0) / mockEvaluations.length).toFixed(1)}
              </p>
              <p className="text-gray-600">Avg. Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <UserIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">
                {new Set(mockEvaluations.map(e => e.evaluatorId)).size}
              </p>
              <p className="text-gray-600">Evaluators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Status Filter */}
          <div className="w-full sm:w-48">
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

          {/* Recommendation Filter */}
          <div className="w-full sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recommendation</label>
            <select
              value={recommendationFilter}
              onChange={(e) => setRecommendationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Recommendations</option>
              {recommendations.map(rec => (
                <option key={rec} value={rec}>
                  {rec.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Evaluations Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent & Evaluator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommendation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvaluations.map((evaluation) => (
                <tr key={evaluation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{evaluation.agentName}</div>
                      <div className="text-sm text-gray-500">by {evaluation.evaluatorName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star}>
                            {star <= Math.round(evaluation.overallScore / 2) ? (
                              <StarIconSolid className="h-5 w-5 text-yellow-400" />
                            ) : (
                              <StarIcon className="h-5 w-5 text-gray-300" />
                            )}
                          </div>
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {evaluation.overallScore}/10
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      evaluation.recommendation === 'approve' ? 'bg-green-100 text-green-800' :
                      evaluation.recommendation === 'needs-modification' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {evaluation.recommendation.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(evaluation.status)}`}>
                      {evaluation.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(evaluation.dateEvaluated)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                      {evaluation.status === 'draft' && (
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEvaluations.length === 0 && (
        <div className="text-center py-12">
          <DocumentCheckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No evaluations found</h3>
          <p className="text-gray-500">Try adjusting your filters or create a new evaluation.</p>
        </div>
      )}
    </div>
  );
}
