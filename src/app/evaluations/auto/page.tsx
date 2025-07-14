'use client';

import { useState } from 'react';
import { 
  BeakerIcon, 
  PlayIcon, 
  ClockIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { mockAgents } from '@/lib/data';
import { mockEvalSuites, mockAutoEvaluations, EvaluationEngine } from '@/lib/evaluation-engine';
import { AutoEvaluation, EvalSuite } from '@/types/evaluation';
import { formatDate, getStatusColor } from '@/lib/utils';

export default function AutoEvaluationPage() {
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [selectedSuite, setSelectedSuite] = useState<string>('');
  const [evaluations, setEvaluations] = useState<AutoEvaluation[]>(mockAutoEvaluations);
  const [runningEval, setRunningEval] = useState<AutoEvaluation | null>(null);
  const [suites] = useState<EvalSuite[]>(mockEvalSuites);

  const handleRunEvaluation = async () => {
    if (!selectedAgent || !selectedSuite) return;

    try {
      const evaluation = await EvaluationEngine.runEvaluation(selectedAgent, selectedSuite);
      setRunningEval(evaluation);
      setEvaluations(prev => [...prev, evaluation]);
      
      // Simulate real-time updates
      const interval = setInterval(() => {
        setRunningEval(prev => {
          if (prev && prev.status === 'running' && prev.progress < 100) {
            return { ...prev, progress: Math.min(prev.progress + 10, 100) };
          }
          if (prev && prev.progress >= 100) {
            clearInterval(interval);
            setRunningEval(null);
            return { ...prev, status: 'completed' };
          }
          return prev;
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to run evaluation:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Automatic Evaluations</h1>
        <p className="mt-2 text-gray-600">
          Run comprehensive automated evaluations against AI agents using predefined test suites and benchmarks.
        </p>
      </div>

      {/* Evaluation Setup */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <BeakerIcon className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Run New Evaluation</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select AI Agent</label>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose an agent...</option>
              {mockAgents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} - {agent.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Evaluation Suite</label>
            <select
              value={selectedSuite}
              onChange={(e) => setSelectedSuite(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a suite...</option>
              {suites.map(suite => (
                <option key={suite.id} value={suite.id}>
                  {suite.name} ({suite.tests.length} tests, ~{suite.estimatedDuration}min)
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedSuite && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Suite Details</h3>
            {(() => {
              const suite = suites.find(s => s.id === selectedSuite);
              return suite ? (
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Description:</span> {suite.description}</p>
                  <p><span className="font-medium">Version:</span> {suite.version}</p>
                  <p><span className="font-medium">Tests:</span> {suite.tests.length}</p>
                  <p><span className="font-medium">Categories:</span> {suite.categories.join(', ')}</p>
                  <p><span className="font-medium">Estimated Duration:</span> {suite.estimatedDuration} minutes</p>
                </div>
              ) : null;
            })()}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleRunEvaluation}
            disabled={!selectedAgent || !selectedSuite || runningEval !== null}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg flex items-center font-medium"
          >
            <PlayIcon className="h-5 w-5 mr-2" />
            Run Evaluation
          </button>
        </div>
      </div>

      {/* Running Evaluation */}
      {runningEval && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-blue-600 mr-2 animate-spin" />
              <h2 className="text-xl font-semibold text-gray-900">Evaluation in Progress</h2>
            </div>
            <span className="text-sm text-gray-500">
              {runningEval.progress}% Complete
            </span>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{runningEval.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${runningEval.progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Agent:</span>
              <span className="ml-2 font-medium">
                {mockAgents.find(a => a.id === runningEval.agentId)?.name}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Suite:</span>
              <span className="ml-2 font-medium">
                {suites.find(s => s.id === runningEval.suiteId)?.name}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Started:</span>
              <span className="ml-2 font-medium">
                {formatDate(runningEval.startTime)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation Results */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Evaluation History</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {evaluations.map((evaluation) => (
            <EvaluationResultCard key={evaluation.id} evaluation={evaluation} />
          ))}
        </div>
      </div>

      {/* Available Test Suites */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Available Test Suites</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suites.map((suite) => (
              <div key={suite.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{suite.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    v{suite.version}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{suite.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tests:</span>
                    <span className="font-medium">{suite.tests.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">~{suite.estimatedDuration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Categories:</span>
                    <span className="font-medium">{suite.categories.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface EvaluationResultCardProps {
  evaluation: AutoEvaluation;
}

function EvaluationResultCard({ evaluation }: EvaluationResultCardProps) {
  const agent = mockAgents.find(a => a.id === evaluation.agentId);
  const suite = mockEvalSuites.find(s => s.id === evaluation.suiteId);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 hover:bg-gray-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900 mr-3">
              {agent?.name} - {suite?.name}
            </h3>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(evaluation.status)}`}>
              {evaluation.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Started: {formatDate(evaluation.startTime)}
            {evaluation.endTime && ` • Completed: ${formatDate(evaluation.endTime)}`}
          </p>
        </div>
        
        {evaluation.status === 'completed' && (
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
              {evaluation.overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">Overall Score</div>
          </div>
        )}
      </div>

      {evaluation.status === 'completed' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">{evaluation.summary.totalTests}</div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-semibold text-green-600">{evaluation.summary.passedTests}</div>
            <div className="text-sm text-gray-600">Passed</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-lg font-semibold text-red-600">{evaluation.summary.failedTests}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600">
              {Math.round((evaluation.summary.passedTests / evaluation.summary.totalTests) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Pass Rate</div>
          </div>
        </div>
      )}

      {evaluation.status === 'running' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{evaluation.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${evaluation.progress}%` }}
            />
          </div>
        </div>
      )}

      {evaluation.status === 'completed' && evaluation.summary.categoryScores && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Category Scores</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.entries(evaluation.summary.categoryScores).map(([category, score]) => (
              <div key={category} className="text-center">
                <div className={`text-lg font-semibold ${getScoreColor(score)}`}>
                  {score.toFixed(0)}
                </div>
                <div className="text-xs text-gray-600 capitalize">
                  {category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
          <DocumentTextIcon className="h-4 w-4 mr-1" />
          View Details
        </button>
        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
          <ChartBarIcon className="h-4 w-4 mr-1" />
          View Results
        </button>
      </div>
    </div>
  );
}
