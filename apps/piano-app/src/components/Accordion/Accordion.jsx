/**
 * Accordion Component
 * Collapsible sections for better UI organization
 */
import React, { useState } from 'react';
import styles from './Accordion.module.css';

/**
 * Accordion Item Component
 */
export const AccordionItem = ({
  title,
  icon,
  children,
  defaultExpanded = false,
  status = null,
  theme = 'classic'
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  const getStatusBadge = () => {
    if (!status) return null;

    const { text, type } = status;
    return (
      <span className={`${styles.statusBadge} ${type ? styles[type] : ''}`}>
        {text}
      </span>
    );
  };

  return (
    <div className={`${styles.accordionItem} ${isExpanded ? styles.expanded : ''}`} data-theme={theme}>
      <div className={styles.accordionHeader} onClick={toggleExpanded}>
        <h3 className={styles.accordionTitle}>
          <span className={styles.accordionIcon}>{icon}</span>
          <span>{title}</span>
        </h3>
        {getStatusBadge()}
        <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
          ▼
        </span>
      </div>
      <div className={`${styles.accordionContent} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.accordionInner}>
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Accordion Container Component
 */
export const Accordion = ({ children, theme = 'classic' }) => {
  return (
    <div className={styles.accordion} data-theme={theme}>
      {children}
    </div>
  );
};