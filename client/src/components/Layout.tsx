import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {children}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, badge, actions }: PageHeaderProps) {
  return (
    <div className="bg-accent border-b border-accent-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {badge && (
              <span className="inline-block px-2.5 py-0.5 bg-navy/10 text-navy text-xs font-semibold rounded-full mb-2">
                {badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-navy">{title}</h1>
            {subtitle && <p className="mt-1 text-gray-600 max-w-2xl">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2 shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${padding ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  );
}

interface ConfidenceBadgeProps {
  score: number;
}

export function ConfidenceBadge({ score }: ConfidenceBadgeProps) {
  const color = score >= 85 ? 'bg-green-50 text-success border-green-200'
    : score >= 70 ? 'bg-amber-50 text-warning border-amber-200'
    : 'bg-red-50 text-danger border-red-200';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${color}`}>
      {score}% confidence
    </span>
  );
}

interface SafetyAlertBadgeProps {
  severity: 'low' | 'medium' | 'high';
}

export function SafetyAlertBadge({ severity }: SafetyAlertBadgeProps) {
  const styles = {
    low: 'bg-blue-50 text-blue-700 border-blue-200',
    medium: 'bg-amber-50 text-warning border-amber-200',
    high: 'bg-red-50 text-danger border-red-200',
  };

  return (
    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border capitalize ${styles[severity]}`}>
      {severity} risk
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-navy mt-1">{value}</p>
          {trend && <p className="text-xs text-success mt-1">{trend}</p>}
        </div>
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-navy">
          {icon}
        </div>
      </div>
    </Card>
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export function Button({
  children, onClick, variant = 'primary', size = 'md', disabled, type = 'button', className = '',
}: ButtonProps) {
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-light disabled:bg-gray-300',
    secondary: 'bg-accent text-navy hover:bg-accent-dark disabled:bg-gray-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-navy ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-navy">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-navy mb-1">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm mx-auto mb-4">{description}</p>
      {action}
    </div>
  );
}
