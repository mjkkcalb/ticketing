import React from 'react';

const SplashPage = () => {
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <div>
      <img src={`${publicUrl}/images/splashscreen.svg`} alt="스플래쉬 이미지" style={{width: "100%", height:"100%"}}/>
    </div>
  );
};

export default SplashPage;