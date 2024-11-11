import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>☹️</div>
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>Page not found</p>
      <p style={styles.description}>
        The page you are looking for doesn't exist or another error occurred. <br />
        Go back, or head over to <a href="https://weeblr.com" style={styles.link}>weeblr.com</a> to choose a new direction.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  icon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  code: {
    fontSize: '100px',
    margin: '0',
  },
  message: {
    fontSize: '24px',
    margin: '10px 0',
  },
  description: {
    fontSize: '16px',
    margin: '10px 0',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default NotFound;
