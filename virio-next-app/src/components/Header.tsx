import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Container from '@/components/Container'; // Use path alias

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <h1>Virio</h1>
          <span className={styles.tagline}>AI-Native Content Personalization</span>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="#overview">Overview</Link></li>
            <li><Link href="#kpis">KPIs</Link></li>
            <li><Link href="#memory">Memory</Link></li>
            <li><Link href="#data">Data Ingestion</Link></li>
            {/* Removed API Design and Future Insights links as they don't match current page sections */}
            {/* Add link to the new Demo page */}
            <li><Link href="/demo">Demo</Link></li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
