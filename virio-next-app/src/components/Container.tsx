import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Allow passing additional classes
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  // Combine the base container style with any passed-in class names
  const combinedClassName = `${styles.container} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Container;
