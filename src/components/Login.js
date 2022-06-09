import styled from 'styled-components';
import axios from "axios";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { loginUser , clearUser } from '../reducer/userSlice';
import { useState } from 'react';

const LoginWrapper = styled.div`
background:aqua;
width:70%;
max-width:400px;
margin: 100px auto 0;
box-sizing:border-box;
text-align:center;
  fieldset{
    margin-bottom:20px;
  }
  fieldset>span{
    display:block;
    width:20%;
    text-align:left;
    margin-bottom:3px;
  }
  input{
    display:block;
    width:100%;
    box-sizing:border-box;
    height:40px;
    padding: 0 5px;
  }
  .login-btn{
    display:block;
    width: 50%;
    margin:30px auto 0;
  }
  .signup-btn{
    display: inline-block;
    width: auto;
    height:auto;
    margin-top:15px;
    color:#000;
    background-color:transparent;
    border:none;
    text-decoration:underline;
    cursor:pointer;
  }
  .confirmMsg{
    font-size:12px;
    color:red;
    padding: 5px 0;
  }
`
export default function Login(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);

  const [id, setId] = useState('');
  const [password, setPw] = useState('');
  const [idMsg , setIdMsg] = useState('');
  const [passwordMsg , setPasswordMsg] = useState('');

  function LoginFunc(e){
    e.preventDefault();

    if(!id && !password){
      setIdMsg('ID를 입력해주세요.');
      setPasswordMsg('Password를 입력해주세요.');
    }else{
      //axios
      let body = {
          id,
          password
      }    

      axios.post("https://st-fe34.herokuapp.com/api/user/login", body)
        .then((res)=>{
            console.log(body);
            console.log(res);
          
            switch(res.data.code){
                case 400 :
                    alert('다시확인')
                    break;
                case 401 :
                    setIdMsg('존재하지 않는 ID 입니다.');
                    setPasswordMsg('');
                    break;
                case 402 :
                    setIdMsg('');
                    setPasswordMsg('Password를 다시 확인해주세요.');
                    break;
                default :  
                    dispatch(loginUser(res.data.userInfo));
                    navigate('/Board');
            }
        })

    }
  }

  return (
      <LoginWrapper>
        <form>
          <fieldset>
            <span>ID</span>
            <input type="text" className="id-input" placeholder='Id를 입력해주세요.' value={id} onChange={(e)=>{setId(e.target.value.trim())}}/>
              {
                !idMsg || <p className='confirmMsg'>{idMsg}</p>
              }
          </fieldset>
          <fieldset>
            <span>비밀번호</span>
            <input type="password" className="pw-input"placeholder='password를 입력해주세요.' value={password} onChange={(e)=>{setPw(e.target.value.trim())}}/>
              {
                !passwordMsg || <p className='confirmMsg'>{passwordMsg}</p>
              }
          </fieldset>
           
            <input type="submit" className="login-btn" value="로그인" onClick={LoginFunc}/>
            <input type="button" className="signup-btn" value="회원가입하기" onClick={()=>{navigate('/Register')}}/>
        </form>
      </LoginWrapper>
  )
}
