import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function calculateOverallScore(
  criteriaScores: { score: number; weight: number }[]
): number {
  const totalWeight = criteriaScores.reduce((sum, item) => sum + item.weight, 0);
  const weightedSum = criteriaScores.reduce(
    (sum, item) => sum + item.score * item.weight,
    0
  );
  return Math.round((weightedSum / totalWeight) * 10) / 10;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    proposed: 'bg-blue-100 text-blue-800',
    'under-review': 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    deployed: 'bg-purple-100 text-purple-800',
    draft: 'bg-gray-100 text-gray-800',
    submitted: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-green-100 text-green-800',
    pending: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
