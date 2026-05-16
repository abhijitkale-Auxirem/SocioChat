import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/lib/auth';

export type RoleOption = {
  value: UserRole;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
};

interface RoleToggleProps {
  options: RoleOption[];
  selected: UserRole;
  onChange: (value: UserRole) => void;
  className?: string;
}

const RoleToggle = React.forwardRef<HTMLDivElement, RoleToggleProps>(
  ({ options, selected, onChange, className }, ref) => (
    <div ref={ref} className={cn('grid gap-3 sm:grid-cols-3', className)}>
      {options.map(option => {
        const isActive = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-200 focus:outline-none',
              isActive ? 'border-indigo-400 bg-white/10 shadow-lg shadow-indigo-500/10' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="roleToggleActive"
                className="absolute inset-0 rounded-3xl border border-indigo-400/40 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(99,102,241,0.2)]"
              />
            )}
            <div className="relative flex items-start gap-3">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-white shrink-0`}>
                {option.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{option.label}</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">{option.desc}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  )
);
RoleToggle.displayName = 'RoleToggle';

export { RoleToggle };
