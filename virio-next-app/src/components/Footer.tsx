import React from 'react';
import styles from './Footer.module.css';
import Container from './Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <p>&copy; {currentYear} Virio. All rights reserved.</p>
        {/* Add any other footer content here if needed */}
      </Container>
    </footer>
  );
};

export default Footer;
