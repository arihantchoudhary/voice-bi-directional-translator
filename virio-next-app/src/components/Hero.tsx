import React from "react";
import styles from "./Hero.module.css";
import Container from "./Container";

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className={styles.hero}>
      <Container className={styles.container}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </Container>
    </section>
  );
};

export default Hero;
