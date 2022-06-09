import styled from 'styled-components';
import axios from "axios";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { loginUser , clearUser } from '../reducer/userSlice';
import { useState } from 'react';


const RegisterWrapper = styled.div`
background:aqua;
width:70%;
max-width:400px;
margin: 100px auto 0;
box-sizing:border-box;
text-align:center;
  fieldset{
    margin-bottom:20px;
    text-align:left;
  }
  fieldset>span{
    display:inline-block;
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
  button{
    display:block;
    margin: 0 auto;
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
  em{
    font-size:12px;
    padding: 5px 0;
    margin-left:15px;
  }
  .warning{
    color:red;
  }
  input.warning{
    border:1px solid red;
  }
  .success{
    color:green;
  }
  input.success{
    border:1px solid green;
  }
`

export default function Register(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [reuserPassword, setReuserPassword] = useState('');
  
  const [idCheck, setIdCheck] = useState('')
  const [formCheck, setFormCheck] = useState('')
  const [idCheckLoading, setIdCheckLoading] = useState(true); 
  const [submitLoading, setSubmitLoading] = useState(true);

  const [idMsg, setIdMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [color, setColor] = useState('')


  //id중복검사
  function idCheckFunc(e){
    e.preventDefault();

      //axios
      let body = { id : userId }
            
      axios.post("https://st-fe34.herokuapp.com/api/user/idCheck", body)
          .then((res)=>{
              console.log(body);
              console.log(res);

              setIdMsg('')
              setPasswordMsg('')
              setNameMsg('')
              

              if(res.data.check){
                setIdCheck(true);
                setIdMsg('사용가능한 id')
            
              }else{
                setIdCheck(false)
                setIdMsg('이미 존재하는 id')
         
              }
          })    
    
  }

    return (
      <RegisterWrapper color={color}>
        <form>
          <fieldset>
            <span>ID</span>
            <em className={ idCheck ? 'success' : 'warning' }>{idMsg}</em>
            <input type="text" value={userId} onChange={(e)=>{
              const userIdValue = e.target.value.trim();
              setUserId(userIdValue);

              //공백검사
              if(userIdValue){
                setIdCheckLoading('')
                setIdMsg('')
                setColor('000')
              }else{
                setIdCheckLoading(true)
              }
              
            }}></input>
             
            <button disabled={idCheckLoading} onClick={idCheckFunc}>ID 중복검사</button>
            
          </fieldset>
        
          <fieldset>
            <span>이름</span>
            <em >{nameMsg}</em>
            <input type="text" value={userName} onChange={(e)=>{
              const userNameValue = e.target.value.trim();
              setUserName(userNameValue);
            }} ></input>
          </fieldset>

          <fieldset>
            <span>비밀번호</span>
            <em >{passwordMsg}</em>
            <input type="password" value={userPassword}></input>
          </fieldset>

          <fieldset>
            <span>비밀번호 재확인</span>
            <em >{passwordMsg}</em>
            <input type="password" value={reuserPassword}></input>
          </fieldset>

          <input type="submit" className="login-btn" value="완료" onClick={(e)=>{
            e.preventDefault();
            //공백검사
            if(!userName && !userPassword && !reuserPassword){
                setPasswordMsg('*필수')
                setNameMsg('*필수')
              
            }
            

          }}/>
        </form>
      </RegisterWrapper>
    )
}