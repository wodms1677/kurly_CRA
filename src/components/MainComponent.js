import React from 'react';
import MemberComponent from './MemberComponent';

const MainComponent = ({modalOpenFn}) => {
  return (
    <main id="main">
      <MemberComponent modalOpenFn={modalOpenFn}/>
    </main>
  );
};

export default MainComponent;