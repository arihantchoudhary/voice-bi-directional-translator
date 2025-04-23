"use client"; // Required for hooks

import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './Card.module.css';

interface CardProps {
  icon: React.ReactNode; // Allow passing JSX like the emoji div
  title: string;
  description: string;
  className?: string; // Allow additional classes
  // Optional: Add index for staggered animation delay
  // index?: number;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  className = '',
  // index = 0
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true, // Animate cards only once
  });

  // Combine base card class, passed className, and animation classes
  const cardClasses = `
    ${styles.card}
    ${styles.cardAnimate}
    ${inView ? styles.cardAnimateVisible : ''}
    ${className}
  `.trim();

  // Optional: Style for staggered delay
  // const cardStyle = { '--card-index': index } as React.CSSProperties;

  return (
    // Add ref to the card div
    <div ref={ref} className={cardClasses} /* style={cardStyle} */>
      <div className={styles.cardIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
