'use client';

import { useState } from 'react';
import { 
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'evaluation', name: 'Evaluation', icon: ChartBarIcon },
    { id: 'system', name: 'System', icon: GlobeAltIcon },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account settings and evaluation preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className={`mr-3 h-5 w-5 ${
                  activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'
                }`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'evaluation' && <EvaluationSettings />}
          {activeTab === 'system' && <SystemSettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              defaultValue="Sarah"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              defaultValue="Chen"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            defaultValue="sarah.chen@company.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Product Management</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Operations</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Senior Manager</option>
            <option>Manager</option>
            <option>Evaluator</option>
            <option>Administrator</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
      
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Email Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">New agent proposals</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">Evaluation assignments</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">LLM recommendation updates</span>
            </label>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Dashboard Alerts</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">High-priority evaluations</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">Budget threshold alerts</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Change Password</h3>
          <div className="space-y-3">
            <input 
              type="password" 
              placeholder="Current password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
              type="password" 
              placeholder="New password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
              type="password" 
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">Add an extra layer of security to your account</p>
              <p className="text-xs text-gray-500">Status: Not enabled</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
              Enable 2FA
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Update Security
          </button>
        </div>
      </div>
    </div>
  );
}

function EvaluationSettings() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Evaluation Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Evaluation Criteria Weight</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Equal Weight (Standard)</option>
            <option>Technical Focus</option>
            <option>Cost Focus</option>
            <option>Business Focus</option>
            <option>Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Auto-assign Evaluations</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="auto-assign" defaultChecked className="h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm text-gray-700">Based on expertise and availability</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="auto-assign" className="h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm text-gray-700">Manual assignment only</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation Deadline</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>3 days</option>
            <option>5 days</option>
            <option>7 days</option>
            <option>10 days</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function SystemSettings() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">System Configuration</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>USD - US Dollar</option>
            <option>EUR - Euro</option>
            <option>GBP - British Pound</option>
            <option>JPY - Japanese Yen</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>UTC-8 (Pacific Time)</option>
            <option>UTC-5 (Eastern Time)</option>
            <option>UTC+0 (GMT)</option>
            <option>UTC+1 (Central European Time)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention Period</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>1 year</option>
            <option>2 years</option>
            <option>5 years</option>
            <option>Indefinite</option>
          </select>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Export Data</h3>
          <p className="text-sm text-gray-600 mb-3">Download your evaluation data and reports</p>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm">
            Export All Data
          </button>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
