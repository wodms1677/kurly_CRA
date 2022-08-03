import React from 'react';

const HeaderComponent = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="wrap">
          <div className="popup">
            <div className="popup-container">              
              <a href="#!">
                <span>지금 가입하고 인기상품 100원에 받아가세요!
                  <i>
                    <img src="./images/ico_arrow_fff_84x84.webp" alt=""/>
                  </i>
                </span>
              </a>              
              <span>
                <button className="popup-close_btn" title="닫기">
                  <img src="./images/ico_close_fff_42x42.webp" alt=""/>
                </button>
              </span>
            </div>
          </div>
          <h1><a href="#!" className="logo" title="logo"><img src="./images/logo_x2.png" alt="logo"/></a></h1>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;