'use client';

import { useState } from 'react';
import { 
  CpuChipIcon, 
  EyeIcon, 
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { mockAgents } from '@/lib/data';
import { formatCurrency, getStatusColor, formatDate } from '@/lib/utils';
import { AIAgent } from '@/types';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || agent.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(mockAgents.map(agent => agent.category)));
  const statuses = Array.from(new Set(mockAgents.map(agent => agent.status)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
          <p className="mt-2 text-gray-600">Manage and evaluate AI agent proposals across your organization.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Propose New Agent
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-48">
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

          {/* Category Filter */}
          <div className="w-full lg:w-48">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <CpuChipIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}

interface AgentCardProps {
  agent: AIAgent;
}

function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.name}</h3>
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
            {agent.status.replace('-', ' ')}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <EyeIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{agent.description}</p>

      {/* Metadata */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Category:</span>
          <span className="font-medium text-gray-900 capitalize">{agent.category}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vendor:</span>
          <span className="font-medium text-gray-900">{agent.vendor}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Setup Cost:</span>
          <span className="font-medium text-gray-900">{formatCurrency(agent.cost.setupCost)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Monthly Cost:</span>
          <span className="font-medium text-gray-900">{formatCurrency(agent.cost.operationalCost)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Proposed:</span>
          <span className="font-medium text-gray-900">{formatDate(agent.dateProposed)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">By:</span>
          <span className="font-medium text-gray-900">{agent.proposedBy}</span>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Key Capabilities:</p>
        <div className="flex flex-wrap gap-1">
          {agent.capabilities.slice(0, 3).map((capability, index) => (
            <span 
              key={index}
              className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
            >
              {capability}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              +{agent.capabilities.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium">
          View Details
        </button>
        <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded text-sm font-medium">
          Evaluate
        </button>
      </div>
    </div>
  );
}
