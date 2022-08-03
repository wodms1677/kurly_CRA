import React,{useState} from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import MainComponent from './MainComponent';
import ModalComponent from './ModalComponent';

const WrapComponent = () => {

  // 모달 상태관리
  const [modal, setModal]=useState(
    {
      isShow:false,
      title:'',
    }
  );

  // 모달 닫기 함수
  // 모달 컴포넌트에 프롭스로 내려주기
  const modalCloseFn=()=>{
    setModal({...modal, isShow:false});
  }

  const modalOpenFn=(z)=>{
    setModal({...modal, isShow:true, title:z})
  }

  return (
    <div id="wrap">
      <HeaderComponent/>
      <MainComponent modalOpenFn={modalOpenFn}/>
      <FooterComponent/>
      <ModalComponent modal={modal} modalCloseFn={modalCloseFn}/>
    </div>
  );
};

export default WrapComponent;