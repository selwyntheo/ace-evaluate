'use client';

import { 
  ChartBarIcon, 
  CpuChipIcon, 
  DocumentCheckIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter
} from 'recharts';
import { mockDashboardMetrics, mockAgents } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

// Extended analytics data
const costAnalysisData = [
  { month: 'Jan 2025', proposed: 45000, approved: 25000, deployed: 15000 },
  { month: 'Feb 2025', proposed: 52000, approved: 30000, deployed: 20000 },
  { month: 'Mar 2025', proposed: 48000, approved: 35000, deployed: 25000 },
  { month: 'Apr 2025', proposed: 60000, approved: 40000, deployed: 30000 },
];

const evaluationMetrics = [
  { criteria: 'Technical Accuracy', avgScore: 8.4, count: 12 },
  { criteria: 'Performance', avgScore: 8.1, count: 12 },
  { criteria: 'Cost Effectiveness', avgScore: 7.8, count: 12 },
  { criteria: 'User Experience', avgScore: 8.2, count: 12 },
  { criteria: 'Security', avgScore: 8.6, count: 12 },
  { criteria: 'Integration Ease', avgScore: 7.5, count: 12 },
  { criteria: 'Scalability', avgScore: 8.0, count: 12 },
  { criteria: 'Vendor Support', avgScore: 7.9, count: 12 },
];

const vendorPerformance = [
  { vendor: 'OpenAI Solutions', agents: 2, avgScore: 8.3, totalCost: 40000 },
  { vendor: 'Anthropic Enterprise', agents: 1, avgScore: 8.9, totalCost: 35000 },
  { vendor: 'GitHub Solutions', agents: 1, avgScore: 8.5, totalCost: 15000 },
  { vendor: 'Google Cloud', agents: 1, avgScore: 7.1, totalCost: 45000 },
];

const categoryDistribution = [
  { name: 'Conversational', value: 2, color: '#3B82F6' },
  { name: 'Analytical', value: 1, color: '#10B981' },
  { name: 'Creative', value: 1, color: '#F59E0B' },
  { name: 'Operational', value: 1, color: '#EF4444' },
  { name: 'Research', value: 1, color: '#8B5CF6' },
];

export default function AnalyticsPage() {
  const metrics = mockDashboardMetrics;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">Comprehensive analytics and insights into AI agent evaluations, costs, and performance metrics.</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Evaluated Value"
          value={formatCurrency(150000)}
          trend={{ value: 12.5, isPositive: true }}
          icon={CurrencyDollarIcon}
          color="green"
        />
        <KPICard
          title="Evaluation Velocity"
          value="2.4/week"
          trend={{ value: 20, isPositive: true }}
          icon={DocumentCheckIcon}
          color="blue"
        />
        <KPICard
          title="Approval Rate"
          value="67%"
          trend={{ value: 5, isPositive: true }}
          icon={ChartBarIcon}
          color="purple"
        />
        <KPICard
          title="Avg. Time to Decision"
          value="5.2 days"
          trend={{ value: 1.2, isPositive: false }}
          icon={CpuChipIcon}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Analysis Over Time */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={costAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Area type="monotone" dataKey="proposed" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="approved" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="deployed" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span>Proposed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>Approved</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span>Deployed</span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Evaluation Criteria Performance */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Criteria Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={evaluationMetrics} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 10]} />
              <YAxis dataKey="criteria" type="category" width={120} />
              <Tooltip formatter={(value) => [`${value}/10`, 'Avg Score']} />
              <Bar dataKey="avgScore" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vendor Performance */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Performance vs Cost</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={vendorPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="totalCost" tickFormatter={(value) => `$${value / 1000}k`} />
              <YAxis dataKey="avgScore" domain={[6, 10]} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'avgScore' ? `${value}/10` : formatCurrency(value as number),
                  name === 'avgScore' ? 'Avg Score' : 'Total Cost'
                ]}
                labelFormatter={() => vendorPerformance[0]?.vendor}
              />
              <Scatter dataKey="avgScore" fill="#3B82F6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Agents</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Agent</th>
                  <th className="text-right py-2">Score</th>
                  <th className="text-right py-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                {metrics.topPerformingAgents.map((agent) => {
                  const agentData = mockAgents.find(a => a.id === agent.agentId);
                  return (
                    <tr key={agent.agentId} className="border-b border-gray-100">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{agent.agentName}</p>
                          <p className="text-gray-500 text-xs">{agentData?.category}</p>
                        </div>
                      </td>
                      <td className="text-right py-3 font-medium text-green-600">
                        {agent.averageScore}/10
                      </td>
                      <td className="text-right py-3">
                        {agentData && formatCurrency(agentData.cost.setupCost)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vendor Summary */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Performance Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Vendor</th>
                  <th className="text-right py-2">Agents</th>
                  <th className="text-right py-2">Avg Score</th>
                  <th className="text-right py-2">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {vendorPerformance.map((vendor) => (
                  <tr key={vendor.vendor} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{vendor.vendor}</td>
                    <td className="text-right py-3">{vendor.agents}</td>
                    <td className="text-right py-3 font-medium text-green-600">
                      {vendor.avgScore}/10
                    </td>
                    <td className="text-right py-3">
                      {formatCurrency(vendor.totalCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-green-700 mb-2">🎯 Performance Highlights</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Anthropic models show highest evaluation scores (8.9/10)</li>
              <li>• Security criteria consistently scores above 8.5/10</li>
              <li>• 67% approval rate indicates strong proposal quality</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-2">💡 Optimization Opportunities</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Integration ease scores lowest - focus on vendor support</li>
              <li>• Creative content agents need cost optimization</li>
              <li>• Consider bulk vendor negotiations for better pricing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  trend: { value: number; isPositive: boolean };
  icon: React.ComponentType<{ className?: string }>;
  color: 'green' | 'blue' | 'purple' | 'yellow';
}

function KPICard({ title, value, trend, icon: Icon, color }: KPICardProps) {
  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-center text-sm">
          {trend.isPositive ? (
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  );
}
