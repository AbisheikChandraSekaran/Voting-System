import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VoterVerification.module.css'; // Import the CSS module for styling
import backgroundImage from '/src/assets/government.png'; // Import your background image

const VoterVerification = () => {
  const navigate = useNavigate();
  const [verificationResult, setVerificationResult] = useState('');
  const [verificationComplete, setVerificationComplete] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = mediaStream;
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    startCamera();

    return () => {
      clearInterval(intervalRef.current);
      if (videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const takeSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  };

  const sendSnapshot = async () => {
    try {
      const imageData = takeSnapshot();
      if (!imageData) return;

      const formData = new FormData();
      formData.append('File1', dataURItoBlob(imageData), 'snapshot.jpg');

      const response = await fetch('http://localhost:5000/check-face', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      displayResult(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  };

  const displayResult = (result) => {
    if (result.length > 0 && result[0]._label !== 'unknown') {
      setVerificationResult('Verification Successful');
      navigate('/voter');
      setVerificationComplete(true); // Set verification complete to true
    } else {
      setVerificationResult('Verification Failed');
    }
  };

  useEffect(() => {
    if (!verificationComplete) { 
      intervalRef.current = setInterval(sendSnapshot, 30000);
    } else { 
      clearInterval(intervalRef.current);
      if (videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  }, [verificationComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <img src={backgroundImage} alt="Background" className={styles.backgroundImage} />
      </div>
      <div className={styles.rightPanel}>
        <h1 className={styles.heading}>Voter Verification</h1>
        <video ref={videoRef} autoPlay className={styles.video}></video>
        <p className={styles.result}>{verificationResult}</p>
      </div>
    </div>
  );
};

export default VoterVerification;
