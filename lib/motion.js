'use client';

import React from 'react';

export const motion = {
  div: React.forwardRef((props, ref) => {
    const { initial, animate, transition, whileHover, whileTap, ...rest } = props;

    const style = {
      ...rest.style,
      ...(animate || {}),
      transition: transition
        ? `all ${transition.duration || 0.3}s ${transition.ease || 'ease'} ${transition.delay || 0}s`
        : undefined,
    };

    return React.createElement('div', { ref, ...rest, style });
  }),

  h1: React.forwardRef((props, ref) => {
    const { initial, animate, transition, whileHover, whileTap, ...rest } = props;

    const style = {
      ...rest.style,
      ...(animate || {}),
      transition: transition
        ? `all ${transition.duration || 0.3}s ${transition.ease || 'ease'} ${transition.delay || 0}s`
        : undefined,
    };

    return React.createElement('h1', { ref, ...rest, style });
  }),

  p: React.forwardRef((props, ref) => {
    const { initial, animate, transition, whileHover, whileTap, ...rest } = props;

    const style = {
      ...rest.style,
      ...(animate || {}),
      transition: transition
        ? `all ${transition.duration || 0.3}s ${transition.ease || 'ease'} ${transition.delay || 0}s`
        : undefined,
    };

    return React.createElement('p', { ref, ...rest, style });
  }),

  span: React.forwardRef((props, ref) => {
    const { initial, animate, transition, whileHover, whileTap, ...rest } = props;

    const style = {
      ...rest.style,
      ...(animate || {}),
      transition: transition
        ? `all ${transition.duration || 0.3}s ${transition.ease || 'ease'} ${transition.delay || 0}s`
        : undefined,
    };

    return React.createElement('span', { ref, ...rest, style });
  })
};