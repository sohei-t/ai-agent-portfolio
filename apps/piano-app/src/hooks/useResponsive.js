/**
 * useResponsive Hook
 * Detects screen size and provides responsive keyboard configuration
 */

import { useState, useEffect } from 'react';
import { debounce } from '../utils/helpers';

/**
 * Screen size breakpoints
 */
const BREAKPOINTS = {
  xs: 320,   // Extra small devices (phones, portrait)
  sm: 576,   // Small devices (phones, landscape)
  md: 768,   // Medium devices (tablets)
  lg: 992,   // Large devices (desktops)
  xl: 1200,  // Extra large devices (large desktops)
};

/**
 * Keyboard configuration by screen size
 */
const KEYBOARD_CONFIG = {
  xs: { keys: 12, octaves: 1 },  // 1 octave on small phones
  sm: { keys: 18, octaves: 1.5 }, // 1.5 octaves on large phones
  md: { keys: 24, octaves: 2 },   // 2 octaves on tablets
  lg: { keys: 30, octaves: 2.5 }, // 2.5 octaves on desktops
  xl: { keys: 36, octaves: 3 },   // 3 octaves on large screens
};

/**
 * Get current screen size category
 * @param {number} width - Window width
 * @returns {string} Size category
 */
const getScreenSize = (width) => {
  if (width < BREAKPOINTS.sm) return 'xs';
  if (width < BREAKPOINTS.md) return 'sm';
  if (width < BREAKPOINTS.lg) return 'md';
  if (width < BREAKPOINTS.xl) return 'lg';
  return 'xl';
};

/**
 * Get device orientation
 * @returns {string} 'portrait' | 'landscape'
 */
const getOrientation = () => {
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

/**
 * Custom hook for responsive design
 * @param {Object} options - Configuration options
 * @param {number} options.debounceDelay - Delay for resize debounce (ms)
 * @returns {Object} Responsive state and utilities
 */
const useResponsive = (options = {}) => {
  const { debounceDelay = 150 } = options;

  const [state, setState] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    size: typeof window !== 'undefined' ? getScreenSize(window.innerWidth) : 'md',
    orientation: typeof window !== 'undefined' ? getOrientation() : 'landscape',
  }));

  useEffect(() => {
    /**
     * Handle window resize
     */
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setState({
        width,
        height,
        size: getScreenSize(width),
        orientation: getOrientation(),
      });
    }, debounceDelay);

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Handle orientation change on mobile devices
    if ('orientation' in window) {
      window.addEventListener('orientationchange', handleResize);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if ('orientation' in window) {
        window.removeEventListener('orientationchange', handleResize);
      }
    };
  }, [debounceDelay]);

  // Get keyboard configuration for current screen size
  const keyboardConfig = KEYBOARD_CONFIG[state.size];

  return {
    ...state,
    keyboardConfig,
    isXs: state.size === 'xs',
    isSm: state.size === 'sm',
    isMd: state.size === 'md',
    isLg: state.size === 'lg',
    isXl: state.size === 'xl',
    isMobile: state.size === 'xs' || state.size === 'sm',
    isTablet: state.size === 'md',
    isDesktop: state.size === 'lg' || state.size === 'xl',
    isPortrait: state.orientation === 'portrait',
    isLandscape: state.orientation === 'landscape',
  };
};

export default useResponsive;
