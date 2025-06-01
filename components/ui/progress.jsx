'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-full w-full overflow-hidden rounded-full',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300 transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </ProgressPrimitive.Root>
));

const ProgressIndicator = React.forwardRef(({ className, ...props }, ref) => (
  <ProgressPrimitive.Indicator
    ref={ref}
    className={cn(
      'h-full bg-gradient-to-r from-cyan-400 to-cyan-300 transition-all duration-300',
      className
    )}
    {...props}
  />
));

Progress.displayName = 'Progress';
ProgressIndicator.displayName = 'ProgressIndicator';

export { Progress, ProgressIndicator };

