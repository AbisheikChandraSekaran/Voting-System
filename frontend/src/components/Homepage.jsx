import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Homepage.module.css';

const Homepage = () => {
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Voting System</h1>
        <p className={styles.subtext}>Please select your role to continue.</p>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonRow}>
            <Link to="/voterverification" className={styles.buttonLink}>
              <button className={styles.button}>Voter</button>
            </Link>
          </div>
          <div className={styles.buttonRow}>
            <Link to="/organizer" className={styles.buttonLink}>
              <button className={styles.button}>Organizer</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.image}></div>
    </div>
  );
}

export default Homepage;
