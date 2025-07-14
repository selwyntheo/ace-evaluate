'use client';

import { 
  ChartBarIcon, 
  CpuChipIcon, 
  DocumentCheckIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockDashboardMetrics, mockAgents } from '@/lib/data';
import { formatCurrency, getStatusColor, formatDate } from '@/lib/utils';

const statusColors = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

export default function Dashboard() {
  const metrics = mockDashboardMetrics;
  const recentAgents = mockAgents.slice(0, 3);

  const statusData = Object.entries(metrics.agentsByStatus).map(([status, count], index) => ({
    name: status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value: count,
    color: statusColors[index]
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Agent Evaluation Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor and evaluate AI agent proposals, track performance metrics, and manage recommendations.</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total AI Agents"
          value={metrics.totalAgents.toString()}
          icon={CpuChipIcon}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <MetricCard
          title="Evaluations"
          value={metrics.totalEvaluations.toString()}
          icon={DocumentCheckIcon}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <MetricCard
          title="Avg. Score"
          value={metrics.averageEvaluationScore.toString()}
          icon={ChartBarIcon}
          trend={{ value: 0.3, isPositive: true }}
          color="purple"
        />
        <MetricCard
          title="Total Cost"
          value={formatCurrency(metrics.costAnalysis.totalProposedCost)}
          icon={CurrencyDollarIcon}
          trend={{ value: 15000, isPositive: false }}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evaluation Trends */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.evaluationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="evaluations" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="averageScore" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Agent Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Agents & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Agents */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Agents</h3>
          <div className="space-y-4">
            {metrics.topPerformingAgents.map((agent, index) => (
              <div key={agent.agentId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{agent.agentName}</p>
                  <p className="text-sm text-gray-500">Rank #{index + 1}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">{agent.averageScore}</p>
                  <p className="text-xs text-gray-500">Avg. Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent AI Agent Proposals */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Proposals</h3>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
              <EyeIcon className="h-4 w-4 mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{agent.name}</p>
                  <p className="text-sm text-gray-500">{agent.category} • {formatDate(agent.dateProposed)}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                  {agent.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ActionButton
            title="Evaluate New Agent"
            description="Start evaluation process for a new AI agent proposal"
            href="/evaluations/new"
            color="blue"
          />
          <ActionButton
            title="Auto Evaluation"
            description="Run automated test suites against AI agents"
            href="/evaluations/auto"
            color="green"
          />
          <ActionButton
            title="Request LLM Recommendation"
            description="Get recommendations for the best LLM model for your use case"
            href="/recommendations/new"
            color="green"
          />
          <ActionButton
            title="View Analytics"
            description="Explore detailed analytics and performance metrics"
            href="/analytics"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: { value: number; isPositive: boolean };
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

function MetricCard({ title, value, icon: Icon, trend, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-600">{title}</p>
        <div className="flex items-center mt-2">
          {trend.isPositive ? (
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm ml-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  title: string;
  description: string;
  href: string;
  color: 'blue' | 'green' | 'purple';
}

function ActionButton({ title, description, href, color }: ActionButtonProps) {
  const colorClasses = {
    blue: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50',
    green: 'border-green-200 hover:border-green-300 hover:bg-green-50',
    purple: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
  };

  return (
    <a 
      href={href}
      className={`block p-4 border-2 rounded-lg transition-colors ${colorClasses[color]}`}
    >
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </a>
  );
}
