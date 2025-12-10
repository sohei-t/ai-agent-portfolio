/**
 * useTouch Hook
 * Handles touch and click events for piano keys
 * Supports multi-touch for chord playing
 */

import { useCallback, useRef } from 'react';

/**
 * Custom hook for touch/click event handling
 * @param {Object} options - Configuration options
 * @param {boolean} options.preventDefault - Prevent default touch behavior
 * @param {number} options.maxTouches - Maximum simultaneous touches
 * @returns {Object} Touch event handlers and utilities
 */
const useTouch = (options = {}) => {
  const {
    preventDefault = true,
    maxTouches = 10,
  } = options;

  // Track active touches by ID
  const activeTouches = useRef(new Map());

  /**
   * Create touch/click handler
   * @param {Function} onStart - Callback when touch/click starts
   * @param {Function} onEnd - Callback when touch/click ends
   * @returns {Object} Event handlers
   */
  const createHandlers = useCallback((onStart, onEnd) => {
    /**
     * Handle touch start
     * @param {TouchEvent} event - Touch event
     */
    const handleTouchStart = (event) => {
      if (preventDefault) {
        event.preventDefault();
      }

      const touches = Array.from(event.changedTouches);

      touches.forEach(touch => {
        // Check if we've reached max touches
        if (activeTouches.current.size >= maxTouches) {
          return;
        }

        // Get touch pressure if available (force touch)
        const pressure = touch.force || 0.5;

        // Store touch info
        const touchInfo = {
          id: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
          pressure,
          target: event.currentTarget,
        };

        activeTouches.current.set(touch.identifier, touchInfo);

        // Call onStart callback
        if (onStart) {
          onStart({
            ...touchInfo,
            type: 'touch',
          });
        }
      });
    };

    /**
     * Handle touch end
     * @param {TouchEvent} event - Touch event
     */
    const handleTouchEnd = (event) => {
      if (preventDefault) {
        event.preventDefault();
      }

      const touches = Array.from(event.changedTouches);

      touches.forEach(touch => {
        const touchInfo = activeTouches.current.get(touch.identifier);

        if (touchInfo) {
          // Remove from active touches
          activeTouches.current.delete(touch.identifier);

          // Call onEnd callback
          if (onEnd) {
            onEnd({
              ...touchInfo,
              type: 'touch',
            });
          }
        }
      });
    };

    /**
     * Handle touch cancel (user drags out, etc.)
     * @param {TouchEvent} event - Touch event
     */
    const handleTouchCancel = (event) => {
      handleTouchEnd(event);
    };

    /**
     * Handle mouse down (desktop)
     * @param {MouseEvent} event - Mouse event
     */
    const handleMouseDown = (event) => {
      // Only handle left mouse button
      if (event.button !== 0) return;

      const mouseInfo = {
        id: 'mouse',
        x: event.clientX,
        y: event.clientY,
        pressure: 0.8, // Default pressure for mouse
        target: event.currentTarget,
      };

      activeTouches.current.set('mouse', mouseInfo);

      if (onStart) {
        onStart({
          ...mouseInfo,
          type: 'mouse',
        });
      }
    };

    /**
     * Handle mouse up (desktop)
     * @param {MouseEvent} event - Mouse event
     */
    const handleMouseUp = (event) => {
      const mouseInfo = activeTouches.current.get('mouse');

      if (mouseInfo) {
        activeTouches.current.delete('mouse');

        if (onEnd) {
          onEnd({
            ...mouseInfo,
            type: 'mouse',
          });
        }
      }
    };

    /**
     * Handle mouse leave (desktop)
     * @param {MouseEvent} event - Mouse event
     */
    const handleMouseLeave = (event) => {
      handleMouseUp(event);
    };

    return {
      // Touch events
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,

      // Mouse events
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    };
  }, [preventDefault, maxTouches]);

  /**
   * Get active touch count
   * @returns {number} Number of active touches
   */
  const getActiveTouchCount = useCallback(() => {
    return activeTouches.current.size;
  }, []);

  /**
   * Clear all active touches
   */
  const clearTouches = useCallback(() => {
    activeTouches.current.clear();
  }, []);

  return {
    createHandlers,
    getActiveTouchCount,
    clearTouches,
  };
};

export default useTouch;
