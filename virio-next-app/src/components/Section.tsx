"use client"; // Required for hooks like useInView

import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Section.module.css';

interface SectionProps {
  id: string; // For navigation links
  title: string;
  children: React.ReactNode;
  className?: string; // Allow additional classes for the section element
  contentClassName?: string; // Allow additional classes for the inner content div
  triggerOnce?: boolean; // Option to trigger animation only once
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className = '',
  contentClassName = '',
  triggerOnce = true, // Default to triggering animation only once
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
    triggerOnce: triggerOnce,
  });

  // Combine base section class, passed className, and animation classes
  const sectionClasses = `
    ${styles.section}
    ${styles.sectionAnimate}
    ${inView ? styles.sectionAnimateVisible : ''}
    ${className}
  `.trim();

  const contentClasses = `${styles.content} ${contentClassName}`.trim();

  return (
    // Add the ref to the section element for intersection observer
    <section id={id} ref={ref} className={sectionClasses}>
      <h2>{title}</h2>
      <div className={contentClasses}>
        {children}
      </div>
    </section>
  );
};

export default Section;
