import React from 'react';
import Link from 'next/link';
import { getCitationUrl } from '@/lib/citations'; // Import the helper function
import styles from './CitationLink.module.css'; // We'll create this next

interface CitationLinkProps {
  num: number;
}

const CitationLink: React.FC<CitationLinkProps> = ({ num }) => {
  const url = getCitationUrl(num);

  if (!url) {
    // Fallback if URL not found for the number
    return <span className={styles.citationMissing}>[{num}]</span>;
  }

  return (
    <Link
      href={url}
      target="_blank" // Open in new tab
      rel="noopener noreferrer" // Security best practice
      className={styles.citationLink}
      title={`Citation ${num}: ${url}`} // Tooltip for accessibility
    >
      [{num}]
    </Link>
  );
};

export default CitationLink;
