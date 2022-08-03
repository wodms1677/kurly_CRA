import React,{ useState, useEffect } from 'react';
import Postcode, { loadPostcode } from 'react-daum-postcode';
import '../postcode.scss'  // node-sass

const MemberComponent = ({modalOpenFn,이용약관}) => {

  const onCompletePost=(data)=>{
    setField({...field, 주소1:data.address});
  }
  
  const style = {  
    position:'fixed',
    top:'50%',
    left:'50%',
    width:'400px',
    height:'500px',
    marginLeft:'-200px',
    marginTop:'-250px',
    zIndex:'3',
    background:'#fff',
    border:'1px solid #ccc'
  }

  const [field, setField] = useState(
    {
      아이디:'',
      아이디중복확인:true, // 로컬스토리지 저장 후 false 수정
      isShowId:false,
      isClassId:'',
      비밀번호:'',
      isShowPw:'',
      isClassPw1:'',
      isClassPw2:'',
      isClassPw3:'',
      비밀번호확인:'',
      isShowPwRe:'',
      isClassPwRe:'',
      이름:'',
      이메일:'',
      이메일중복확인Ok:true,  // 로컬스토리지 저장 후 false 수정      
      휴대폰:'',
      휴대폰확인:'',
      isDisabledPh:true,
      isShowPh:false,
      minutes:2,  // 2, 1, 0
      seconds:59, // 59 58 57 ... 0
      인증번호:'',
      setId:0,
      인증확인번호:'',
      휴대폰인증번호확인Ok:false,
      isDisabledPhInput:false,
      isDisabledPhBtn:false,
      isClassPh1:false,
      isClassPh2:false,
      isShowPhSpan:true,
      주소1:'',
      주소2:'',
      isShowAddr:false,
      성별:'선택안함',
      생년:'',
      생월:'',
      생일:'',
      isShowBirthText:'',
      isShowBirthError:false,
      추가입력사항:'',
      추가입력사항선택:'',
      isShowAddInput:false,      
      이용약관동의:[],      
    }
  );

  // 아이디
  const onFocusId=()=>{
    setField({...field, isShowId:true});
  }

  const onChangeId=(e)=>{    
    const regExp = /^(?=.*[A-Za-z])+(?=.*[0-9])*[^\s][A-Za-z0-9]{6,}$/g;
    let imsi='';

        if(regExp.test(e.target.value)){
          imsi = true;
        }    
        else {      
          imsi = false;
        }
        setField({...field, 아이디:e.target.value, isClassId:imsi});

  }

  // 아이디 중복확인: 모달 오픈
  const onClickIdOk=(e)=>{
    e.preventDefault();
    if(field.아이디===''){
      modalOpenFn('아이디를 입력하세요.');
    }
    else {
      if(field.isClassId===false){
        modalOpenFn('사용할 수 없는 아이디입니다. (6자 이상의 영문 혹은 영문과 숫자를 조합)');
      }
      else{ // 중복검사
        // 임시
        modalOpenFn('오류 없음 중복 검사');

        // 로컬스토리지 데이터 가져오기
        let imsi=[];
        for(let i=0; i<localStorage.length; i++){          
          imsi.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        // 전송 버튼(submir)
        let result=imsi.map((item)=>item.아이디===field.아이디);
           
            if(result.includes(true)){
              modalOpenFn('중복된 아이디입니다.')
            }
            else{
              modalOpenFn('사용 가능한 아이디입니다.')
            }
        
      }      
    }
  }

  // 비밀번호
  const onFocusPw=()=>{
    setField({...field, isShowPw:true});
  }

  const onChangePw=(e)=>{
    const regExp1 = /.{10,}/; 
    const regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
    const regExp3 = /(.)\1\1/;
    let imsi1='';
    let imsi2='';
    let imsi3='';

        // 10자 이상
        if(regExp1.test(e.target.value)===true){
          imsi1=true;
        }
        else {
          imsi1=false;
        }

        // 영문 필수, (숫자 또는 특수문자) 필수
        if(regExp2.test(e.target.value)===true){
          imsi2=true;
        }
        else {
          imsi2=false;
        }

        // 연속 3자 X
        if(regExp3.test(e.target.value)===true){
          imsi3=false;
        }
        else {
          imsi3=true;
        }
        setField({...field, 비밀번호:e.target.value, isClassPw1:imsi1, isClassPw2:imsi2, isClassPw3:imsi3});

  }

  // 비밀번호 확인
  const onFocusPwRe=()=>{
    setField({...field, isShowPwRe:true})
  }

  const onChangePwRe=(e)=>{
    let imsi='';

        if(field.비밀번호===e.target.value){
          imsi=true;
        }    
        else {
          imsi=false;
        }
        setField({...field, 비밀번호확인:e.target.value, isClassPwRe:imsi});

  }

  // 이름
  const onChangeName=(e)=>{
    const regExp=/[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;
    let imsi='';

        imsi=e.target.value.toString().replace(regExp,'');
        setField({...field, 이름:imsi});

  }

  // 이메일
  const onChangeEmail=(e)=>{
    const regExp = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*.[A-Za-z]{2,3}$/;
    let imsi='';

        if(regExp.test(e.target.value)){
          imsi=true;
        }
        else {
          imsi=false;
        }
        setField({...field, 이메일:e.target.value, 이메일확인:imsi});

  }

  // 이메일 중복확인
  const onClickEmailOk=(e)=>{
    e.preventDefault();
    if(field.이메일===''){
      modalOpenFn('이메일을 입력하세요.');
    }
    else{
      if(field.이메일===false){
        modalOpenFn('사용할 수 없는 이메일입니다.');
      }
      else{

        // 로컬스토리지 데이터 가져오기
        let imsi=[];
        for(let i=0; i<localStorage.length; i++){          
          imsi.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        // 전송 버튼(submir)
        let result=imsi.map((item)=>item.이메일===field.이메일);
           
            if(result.includes(true)){
              modalOpenFn('중복된 이메일입니다.')
            }
            else{
              modalOpenFn('사용 가능한 이메일입니다.')
            }
      }
    }
  }

  // 휴대폰
  const onChangePh=(e)=>{
    const regExp=/^01[0|6|7|8|9]+\d{3,4}\d{4}$/;
    let imsi='';

          if(regExp.test(e.target.value)){
            imsi=true;
          }
          else{
            imsi=false;
          }
          setField({...field, 휴대폰:e.target.value, 휴대폰확인:imsi, isDisabledPh:!imsi});

  }

  // 휴대폰 인증 버튼
  const onMouseDownPh=()=>{
    clearInterval(field.setId);
    setField({...field, isShowPh:false});
  }

  const onClickPh=(e)=>{
    e.preventDefault();
    let num=Math.floor(Math.random()*900000+100000);
    
        setField({...field, isShowPh:true, 인증번호: num.toString()});
        if(field.휴대폰===''){
          modalOpenFn(`휴대폰 번호를 입력해 주세요.`);
        }
        else {
          modalOpenFn(`휴대폰으로 인증번호(${num})가 전송되었습니다.`);
        }

  }

  // 타이머 카운트
  const timerCount=()=>{
    let s  = 59; 
    let m = 2;  
    let setId = 0;

        setId = setInterval(()=>{
          s--;  
          if(s<=0){
            s=59;
            m--;
            if(m<=0){
              clearInterval(setId);
              s=0;
              m=0;
            }
          }
          setField({...field,  seconds: s, minutes: m, setId: setId  });
        },1000);

  }

  useEffect(()=>{
    field.isShowPh&&timerCount();
  },[field.isShowPh]);

  const onChangePhNum=(e)=>{
    clearInterval(field.setId);
    setField({...field, 인증확인번호:e.target.value})
  }

  // 인증번호확인
  const onClickPhConfirm=(e)=>{
    e.preventDefault();
    if(field.인증번호===field.인증확인번호){      
      modalOpenFn('인증이 확인되었습니다.');
      setField({...field, 
        isDisabledPhInput:true, 
        isDisabledBtn:true, 
        isDisabledPh:true,
        isClassPh1:true, 
        isClassPh2:true, 
        인증확인번호:'',        
        isShowPhSpan:false,
        휴대폰인증번호확인Ok:true,
      });
    }
    else{
      modalOpenFn('인증번호를 다시 확인 하세요.');
    }
  }

  // 주소
  const onClickAddr=(e)=>{
    e.preventDefault();
    setField({...field, isShowAddr:true});
  }

  const onChangeAddr1=(e)=>{
    setField({...field, 주소1:e.target.value});
  }
  
  const onChangeAddr2=(e)=>{
    setField({...field, 주소2:e.target.value});
  }

  // 성별 라디오 버튼
  const onChangeGender=(e)=>{
    setField({...field, 성별:e.target.value});
  }

  // 생년월일
  const onChangeYear=(e)=>{
    const regExp=/[^0-9]/g;    
      let imsi=e.target.value.trim().replace(regExp,'')
          setField({...field, 생년:imsi});
  }
  
  const onChangeMonth=(e)=>{
    const regExp=/[^0-9]/g;    
    let imsi=e.target.value.trim().replace(regExp,'')
        setField({...field, 생월:imsi});
  }
  
  const onChangeDate=(e)=>{
    const regExp=/[^0-9]/g;    
    let imsi=e.target.value.trim().replace(regExp,'')
        setField({...field, 생일:imsi});
  }

  // 생년월일 공통
  const birthDayCheck=(e)=>{
    const {생년,생월,생일}=field;
    
    const regExpYear=/^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g;
    const regExpMonth=/^(?:0?[1-9]|1[0-2])$/g;
    const regExpDate=/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;

    const nowYear = new Date().getFullYear(); //년 4자리
    const nowMonth = new Date().getMonth()+1; //월 0~11
    const nowDate = new Date().getDate(); //일
    const today = new Date( nowYear, nowMonth, nowDate );

        if(생년===''&&생월===''&&생일===''){
          return;
        }
        else{
          // 생년
          if(regExpYear.test(생년)===false){            
            setField({...field, isShowBirthError:true, isShowBirthText:'태어난 년도 4자리를 정확하게 입력해주세요.'});
            return;
          }
          else {
            setField({...field, isShowBirthError:false, isShowBirthText:''});
            // 생월
            if(regExpMonth.test(생월)===false){
              setField({...field, isShowBirthError:true, isShowBirthText:'태어난 월을 정확하게 입력해주세요'});
              return;
            }
            else{
              setField({...field, isShowBirthError:false, isShowBirthText:''});
              // 생일
              if(regExpDate.test(생일)===false){
                setField({...field, isShowBirthError:true, isShowBirthText:'태어난 일을 정확하게 입력해주세요'});
                return;
              }
              else{
                setField({...field, isShowBirthError:false, isShowBirthText:''});
              }

              const birthDay  = new Date(생년, 생월, 생일);  // 태어난 년월일
              const nowYear120 = new Date(nowYear-120, nowMonth, nowDate);  //120세 초과 변수
              const nowYear14 = new Date(nowYear-14, nowMonth, nowDate);  //14세 미만 변수

              // 미래
              if(birthDay>today){
                setField({...field, isShowBirthError:true, isShowBirthText:'날짜가 미래로 입력되었습니다'});
                return;
              }
              else{
                setField({...field, isShowBirthError:false, isShowBirthText:''});
              }

              // 14세 미만
              if(birthDay>nowYear14){
                setField({...field, isShowBirthError:true, isShowBirthText:'만 14세 이상은 가입이 불가합니다'})
                return;
              }
              else{
                setField({...field, isShowBirthError:false, isShowBirthText:''});
              }

              // 120 초과
              if(birthDay<nowYear120){
                setField({...field, isShowBirthError:true, isShowBirthText:'생년월일을 다시 확인해주세요'});
                return;
              }
              else{
                setField({...field, isShowBirthError:false, isShowBirthText:''});
              }
            }
          }
        }

  }

  // 생년월일 포커스 아웃
  const onBlurBirth=()=>{
    birthDayCheck();  
  }

  // 추가입력사항: 추천인, 이벤트
  const onChangeRadioAddInput=(e)=>{   
    setField({...field, isShowAddInput:true, 추가입력사항선택:e.target.value});
  }
  
  const onChangeAddInput=(e)=>{    
    setField({...field, 추가입력사항:e.target.value});
  }

  // 약관동의: 전체동의
  const onChangeServiceAll=(e)=>{
    // 체크되면
    if(e.target.checked){
      setField({...field, 이용약관동의:이용약관});
    }    
    else{
      setField({...field, 이용약관동의:[]});
    }
  }

  // 약관동의: 각 체크항목
  const onChangeService=(e)=>{
    let imsi=[];
    const {이용약관동의}=field;
    
        if(e.target.checked){
        
          if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보수신 동의'){
            setField({...field, 이용약관동의:[...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보수신 동의','SMS','이메일']});
          }
          else if(field.이용약관동의.includes('SMS')&&e.target.value==='이메일'){
            setField({...field, 이용약관동의:[...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보수신 동의','이메일']});
          }
          else if(field.이용약관동의.includes('이메일')&&e.target.value==='SMS'){
            setField({...field, 이용약관동의:[...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보수신 동의','SMS']});
          }
          else{
            setField({...field, 이용약관동의:[...이용약관동의, e.target.value]})
          }

        }
        else{ // 체크 해제 시: 배열에 저장된 데이터를 삭제, 체크 해제된 데이터만 filter()

          if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보수신 동의'){
            imsi=이용약관동의.filter((item)=>item!==e.target.value);
            imsi=imsi.filter((item)=>item!=='SMS');
            imsi=imsi.filter((item)=>item!=='이메일');            
          }
          else if(이용약관동의.includes('SMS')&&e.target.value==='이메일'){
            imsi=이용약관동의.filter((item)=>item!==e.target.value);
            imsi=imsi.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보수신 동의');            
          }
          else if(이용약관동의.includes('이메일')&&e.target.value==='SMS'){
            imsi=이용약관동의.filter((item)=>item!==e.target.value);
            imsi=imsi.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보수신 동의');            
          }
          else{
            imsi=이용약관동의.filter((item)=>item!==e.target.value);  // 삭제하고 나머지만 저장                        
          }          
          setField({...field, 이용약관동의:imsi});

        }

  }

  // 폼 전송 onSubmit() : 전송버튼 클릭 시 동작
  // 1. 로컬스토리지에 저장
  // 2. 닷홈 비동기 전송방식: AXIOS 전송 => 서버와 정보 송수신(CRUD)하기 위해 사용
  const onSubmitMember=(e)=>{
    e.preventDefault();
    // 빈칸 X : 필수입력사항
    const {아이디,비밀번호,비밀번호확인,이름,이메일,휴대폰,주소1,주소2,성별,생년,생월,생일,추가입력사항선택,추가입력사항,이용약관동의,아이디중복확인Ok,이메일중복확인Ok,휴대폰인증번호확인Ok} = field;

        // 아이디 중복확인
        if(아이디===''||비밀번호===''||비밀번호확인===''||이름===''||이메일===''||휴대폰===''||주소1===''||주소2===''||아이디중복확인Ok===false||이메일중복확인Ok===false||휴대폰인증번호확인Ok===false){
          if(아이디===''){
            modalOpenFn('아이디를 입력해 주세요.');
          }
          else if(비밀번호===''){
            modalOpenFn('비밀번호를 입력해 주세요.');
          }
          else if(비밀번호확인===''){
            modalOpenFn('비밀번호 확인을 완료해 주세요.');
          }
          else if(이름===''){
            modalOpenFn('이름을 입력해 주세요.');
          }
          else if(이메일===''){
            modalOpenFn('이메일을 입력해 주세요.');
          }
          else if(휴대폰===''){
            modalOpenFn('휴대폰 번호를 입력해 주세요.');
          }
          else if(주소1===''||주소2===''){
            modalOpenFn('주소를 입력해 주세요.');
          }
          else if(아이디중복확인Ok===false){
            modalOpenFn('아이디 중복 확인이 필요합니다.');
          }
          else if(이메일중복확인Ok===false){
            modalOpenFn('이메일 중복 확인이 필요합니다.');
          }
          else if(휴대폰인증번호확인Ok===false){
            modalOpenFn('인증번호 확인이 필요합니다.');
          }
          return;
        }
        else{
          // 전송할 데이터 배열 저장, 로컬스토리지 전송
          // 필수 약관동의 3개 미만이면 return;
          let cnt=0;
          
              이용약관동의.map((item)=>{
                if(item.includes('필수')){
                  cnt++;
                }
              });

              if(cnt<3){
                modalOpenFn('필수 동의란을 확인해 주세요.');
                return;
              }
              else {

                let imsi = {
                  아이디:아이디,
                  비밀번호:비밀번호,
                  비밀번호확인:비밀번호확인,
                  이름:이름,
                  이메일:이메일,
                  휴대폰:휴대폰,
                  주소:`${주소1} ${주소2}`,
                  성별:성별,
                  생년월일:`${생년}-${생월}-${생일}`,
                  추가입력사항:`${추가입력사항선택}:${추가입력사항}`,
                  이용약관동의:이용약관동의
                };
      
                    localStorage.setItem(imsi.아이디, JSON.stringify(imsi));  // 로컬스토리지: 데이터 저장시 객체 저장 불가능, 문자열로 변환해야 함
                    modalOpenFn('가입이 완료되었습니다.');
      
                // 초기화
                setField({...field,
                  아이디:'',
                  아이디중복확인:true,
                  isShowId:false,
                  isClassId:'',
                  비밀번호:'',
                  isShowPw:'',
                  isClassPw1:'',
                  isClassPw2:'',
                  isClassPw3:'',
                  비밀번호확인:'',
                  isShowPwRe:'',
                  isClassPwRe:'',
                  이름:'',
                  이메일:'',
                  이메일중복확인Ok:true,
                  휴대폰:'',  
                  휴대폰확인:'',
                  isDisabledPh:true,
                  isShowPh:false,
                  minutes:2,
                  seconds:59,
                  인증번호:'',
                  setId:0,
                  인증확인번호:'',
                  휴대폰인증번호확인Ok:false,
                  isDisabledPhInput:false,
                  isDisabledPhBtn:false,
                  isClassPh1:false,
                  isClassPh2:false,
                  isShowPhSpan:true,
                  주소1:'',
                  주소2:'',
                  isShowAddr:false,
                  성별:'선택안함',
                  생년:'',
                  생월:'',
                  생일:'',
                  isShowBirthText:'',
                  isShowBirthError:false,
                  추가입력사항:'',
                  추가입력사항선택:'',
                  isShowAddInput:false,      
                  이용약관동의:[]
                });        

              }

         
        }        
  } 

  return (
    <section id="member">
      <div className="container">
        <div className="wrap">
          {/* <!-- 타이틀 --> */}
          <div className="title">
            <h2>회원가입</h2>
          </div>
          {/* <!-- 전송할 회원가입폼 --> */}
          <div className="content">
            <form onSubmit={onSubmitMember} id="member" name="member" method="post" action="response.php" autoComplete='off' >
              <ul id="memberform">
                <li>
                  <h3><i>*</i><span>필수입력사항</span></h3>
                </li>
                <li>
                  <div className="left">
                    <label><span>아이디</span><i>*</i></label>
                  </div>
                  <div className="right">
                    <input 
                      type="text" 
                      id="inputId" 
                      name="inputId" 
                      placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합" 
                      maxLength="20"
                      onChange={onChangeId}
                      onFocus={onFocusId}
                      value={field.아이디}
                    />
                    <button onClick={onClickIdOk} className="id-double-btn">중복확인</button>
                    {
                      field.isShowId && (
                        <div className="guide-txt guide-id">
                          <p className={field.isClassId===''?'':(field.isClassId?'success':'error')}>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                          <p>아이디 중복확인</p>
                        </div>
                      )
                    }
                  </div>
                </li>
                <li>
                  <div className="left">
                    <label><span>비밀번호</span><i>*</i></label>
                  </div>
                  <div className="right">
                    <input 
                      type="password" 
                      id="inputPw" 
                      name="inputPw" 
                      placeholder="비밀번호를 입력해주세요" 
                      maxLength="20"
                      onChange={onChangePw}
                      onFocus={onFocusPw}
                      value={field.비밀번호}
                    />
                    {                  
                      field.isShowPw && (
                        <div className="guide-txt guide-pw">
                          <p className={field.isClassPw1===''?'':(field.isClassPw1?'success':'error')}>10자 이상 입력</p>
                          <p className={field.isClassPw2===''?'':(field.isClassPw2?'success':'error')}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                          <p className={field.isClassPw3===''?'':(field.isClassPw3?'success':'error')}>동일한 숫자 3개 이상 연속 사용 불가</p>
                        </div>
                      )  
                    }
                  </div>
                </li>
                <li>
                  <div className="left">
                    <label><span>비밀번호확인</span><i>*</i></label>
                  </div>
                  <div className="right">
                    <input 
                     type="password" 
                     id="inputPwConfirm" 
                     name="inputPwConfirm" 
                     placeholder="비밀번호를 한번 더 입력해주세요" 
                     maxLength="20"
                     onChange={onChangePwRe}
                     onFocus={onFocusPwRe}
                     value={field.비밀번호확인}
                    />
                    {
                      field.isShowPwRe && (
                        <div className="guide-txt guide-password-confirm">
                          <p className={field.isClassPwRe===''?'':(field.isClassPwRe?'success':'error')}>동일한 비밀번호를 입력해주세요.</p>
                        </div>
                      )
                    }   
                  </div>
                </li>
                <li>
                  <div className="left">
                    <label><span>이름</span><i>*</i></label>
                  </div>
                  <div className="right">
                    <input 
                      type="text" 
                      id="inputName" 
                      name="inputName" 
                      placeholder="이름을 입력해주세요" 
                      maxLength="30"
                      onChange={onChangeName}    
                      value={field.이름}                  
                    />
                  </div>
                </li>
                <li>
                  <div className="left">
                    <label><span>이메일</span><i>*</i></label>
                  </div>
                  <div className="right">
                    <input 
                      type="email" 
                      id="inputEmail"                       
                      name="inputEmail" 
                      placeholder="예: marketkurly@kurly.com" 
                      maxLength="250"
                      onChange={onChangeEmail}
                      value={field.이메일}                      
                    />
                    <button onClick={onClickEmailOk} className="email-double-btn">중복확인</button>
                  </div>
                </li>
                <li>
                  <div className="left">
                    <label><span>휴대폰</span><i>*</i></label>
                  </div>
                  <div className="right">
                    <input 
                      type="text" 
                      id="inputPhone" 
                      name="inputPhone" 
                      placeholder="숫자만 입력해주세요" 
                      maxLength="11"
                      onChange={onChangePh}
                      value={field.휴대폰}
                    />
                    {/* 기본값: 사용불가, disabled=true(사용불가) */}
                    <button onMouseDown={onMouseDownPh} onClick={onClickPh} disabled={field.isDisabledPh} className={field.isDisabledPh?"phone-btn":"phone-btn on"}>인증번호 받기</button>                                            
                    {
                      field.isShowPh && (
                        <>                          
                          <input disabled={field.isDisabledPhInput} onChange={onChangePhNum} type="text" id="inputPhoneok" className={field.isClassPh1?'ok':''} name="inputPhoneok" placeholder="인증번호를 입력해주세요" maxLength="6" value={field.인증확인번호}/>                          
                          <button disalbed={field.isDisabledPhBtn} onClick={onClickPhConfirm} className={field.isClassPh2?'phone-btn phone-ok-btn ok':'phone-btn phone-ok-btn'}>인증번호 확인</button>                    
                          {
                            field.isShowPhSpan&&(
                              <span className="count-timer">{field.minutes}:{field.seconds<10?`0${field.seconds}`:field.seconds}</span>
                            )
                          }
                        </>
                      )
                    }
                  </div>
                </li>
                <li className="address">
                  <div className="left">
                    <label><span>주소</span><i>*</i></label>
                  </div>
                  <div className="right">
                    {
                      field.isShowAddr && (
                        <>
                          <input onChange={onChangeAddr1} value={field.주소1} type="text" id="inputAddress1" name="inputAddress1" placeholder="검색주소"/>
                          <input onChange={onChangeAddr2} value={field.주소2} type="text" id="inputAddress2" name="inputAddress2" placeholder="세부주소를 입력하세요"/>
                        </>
                      )
                    }
                    <button onClick={onClickAddr} id="addressBtn" className="address-btn" title="주소검색"><span><img src="./images/ico_search.svg" alt=""/><i className="address-txt">주소검색</i></span></button>
                    <div className="guide-txt guide-transfer on">
                      <h4></h4>
                    </div>
                    <p className="address-guidetxt">배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                    {
                      field.isShowAddr&&(
                        <div>
                          <Postcode                                                     
                            style={style}
                            onComplete={onCompletePost}
                          />
                        </div>
                      )
                    }
                  </div>
                </li>
                <li>
                  <div className="left">
                    <label><span>성별</span></label>
                  </div>
                  <div className="right gender">
                    <label htmlFor="male">
                      <input onChange={onChangeGender} checked={field.성별.includes('남자')} type="radio" id="male" name="gender" value="남자"/>
                      <span>남자</span>
                    </label>
                    <label htmlFor="female">
                      <input onChange={onChangeGender} checked={field.성별.includes('여자')} type="radio" id="female" name="gender" value="여자"/>
                      <span>여자</span>
                    </label>
                    <label htmlFor="none">
                      <input onChange={onChangeGender} checked={field.성별.includes('선택안함')} type="radio" id="none" name="gender" value="선택안함"/>
                      <span>선택안함</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="left">
                    <label><span>생년월일</span></label>
                  </div>
                  <div className="right">
                    <div className="date-box">
                      <ul>
                        <li>
                          <input 
                            onChange={onChangeYear} 
                            onBlur={onBlurBirth} 
                            value={field.생년} 
                            type="text" 
                            id="year" 
                            name="year" 
                            placeholder="YYYY" 
                            maxLength="4"
                          />
                        </li>
                        <li><span>/</span></li>
                        <li>
                          <input
                           onChange={onChangeMonth}
                           onBlur={onBlurBirth} 
                           onFocus={onBlurBirth} 
                           value={field.생월} 
                           type="text" 
                           id="month" 
                           name="montsh"
                           placeholder="MM" 
                           maxLength="2"
                          />
                        </li>
                        <li><span>/</span></li>
                        <li>
                          <input 
                            onChange={onChangeDate} 
                            onBlur={onBlurBirth}
                            onFocus={onBlurBirth}
                            value={field.생일} 
                            type="text" 
                            id="date" 
                            name="date" 
                            placeholder="DD" 
                            maxLength="2"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="guide-txt guide-birthday-confirm">
                      {
                        field.isShowBirthError && (
                          <p className="error">{field.isShowBirthText}</p>
                        )
                      }
                    </div>
                  </div>
                </li>
                <li className="add-input-item">
                  <div className="left">
                    <label><span>추가입력 사항</span></label>
                  </div>
                  <div className="right gender add">
                    <label htmlFor="add1">
                      <input onChange={onChangeRadioAddInput} checked={field.추가입력사항선택.includes('추천인 아이디')} type="radio" id="add1" className="add-radio" name="add" value="추천인 아이디"/>
                      <span>추천인 아이디</span>
                    </label>
                    <label htmlFor="add2">
                      <input onChange={onChangeRadioAddInput} checked={field.추가입력사항선택.includes('참여 이벤트명')} type="radio" id="add2" className="add-radio" name="add" value="참여 이벤트명"/>
                      <span>참여 이벤트명</span>
                    </label>
                    {
                      field.isShowAddInput && (
                        <div className="add-input-box">
                          <input onChange={onChangeAddInput} value={field.추가입력사항} type="text" id="inputAdd" name="inputAdd" placeholder=""/>
                          <p>
                            추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                            가입 이후, 수정이 불가합니다.<br/>
                            대소문자 및 띄어쓰기에 유의해주세요.
                          </p>
                        </div>
                      )
                    }
                  </div>
                </li>
                <li>
                  <hr/>
                </li>
                {/* <!-- 약관동의 체크박스 --> */}
                <li className="check-box">
                  <div className="left">
                    <label><span>이용약관동의</span><i>*</i></label>
                  </div>
                  <div className="right service">
                    <ol>
                      <li>
                        <label htmlFor="chkAll">
                          <input onChange={onChangeServiceAll} checked={field.이용약관동의.length>=7} type="checkbox" id="chkAll" name="chkAll" value="전체동의합니다."/>
                          <span>전체동의합니다.</span>
                        </label>
                        <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                      </li>
                      <li className="view-box">
                        <label htmlFor="chk1">
                          <input onChange={onChangeService} checked={field.이용약관동의.includes('이용약관동의(필수)')} type="checkbox" id="chk1" name="chk1" className="chkbox-btn" value="이용약관동의(필수)"/>
                          <span>이용약관동의<i>(필수)</i></span>
                        </label>
                        <span className="view-btn-box">
                          <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                        </span>
                      </li>
                      <li className="view-box">
                        <label htmlFor="chk2">
                          <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보수집·이용 동의(필수)')} type="checkbox" id="chk2" name="chk2" className="chkbox-btn" value="개인정보수집·이용 동의(필수)"/>
                          <span>개인정보 수집·이용 동의<i>(필수)</i></span>
                        </label>
                        <span className="view-btn-box">
                          <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                        </span>
                      </li>
                      <li className="view-box">
                        <label htmlFor="chk3">
                          <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보수집·이용동의(선택)')} type="checkbox" id="chk3" name="chk3" className="chkbox-btn" value="개인정보수집·이용동의(선택)"/>
                          <span>개인정보 수집·이용 동의<i>(선택)</i></span>
                        </label>
                        <span className="view-btn-box">
                          <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                        </span>
                      </li>
                      <li>
                        <label htmlFor="chk4">
                          <input onChange={onChangeService} checked={field.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보수신 동의')} type="checkbox" id="chk4" name="chk4" className="chkbox-btn" value="무료배송, 할인쿠폰 등 혜택/정보수신 동의"/>
                          <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의<i>(선택)</i></span>
                        </label>
                        <dl>
                          <dd>
                            <label htmlFor="chk5">
                              <input onChange={onChangeService} checked={field.이용약관동의.includes('SMS')} type="checkbox" id="chk5" name="chk5" className="chkbox-btn" value="SMS"/>
                              <span>SMS</span>
                            </label>
                            <label htmlFor="chk6">
                              <input onChange={onChangeService} checked={field.이용약관동의.includes('이메일')} type="checkbox" id="chk6" name="chk6" className="chkbox-btn" value="이메일"/>
                              <span>이메일</span>
                            </label>
                          </dd>
                          <dt>
                            <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                          </dt>
                        </dl>
                      </li>
                      <li>
                        <label htmlFor="chk7">
                          <input onChange={onChangeService} checked={field.이용약관동의.includes('본인은 만 14세이상입니다.(필수)')} type="checkbox" id="chk7" name="chk7" className="chkbox-btn" value="본인은 만 14세이상입니다.(필수)"/>
                          <span>본인은 만 14세 이상입니다.<i>(필수)</i></span>
                        </label>
                      </li>
                    </ol>
                  </div>
                </li>
                <li className="bottom-line">
                  <hr/>
                </li>
                <li className="button-box">
                  <button type="submit" className="submit-btn">가입하기</button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

MemberComponent.defaultProps={
  이용약관: [    
    '이용약관동의(필수)',
    '개인정보수집·이용 동의(필수)',
    '개인정보수집·이용동의(선택)',
    '무료배송, 할인쿠폰 등 혜택/정보수신 동의',
    'SMS',
    '이메일',
    '본인은 만 14세이상입니다.(필수)'
  ]
}

export default MemberComponent;