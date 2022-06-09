import styled from 'styled-components';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser , clearUser } from '../reducer/userSlice';

const HeaderWrapper = styled.div`
  background:red;
  height:50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  cursor:pointer;
    h1{
      text-align:center;
      background:blue;
    }
    ul{
      list-style:none;
      text-decoration:none;
    }
`
export default function Header(){
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector(state=>state.user);

    return(
        <HeaderWrapper>
          <h1>My bulletin board</h1>
          <ul>
            {
              user.isLogin 
              ? <li onClick={()=>{ 
                dispatch(clearUser());
                navigate('/')
               }}>로그아웃</li>
              : <li onClick={()=>{ navigate('/')} }>로그인</li>
            }
            
          </ul>
        </HeaderWrapper>
    )
  }
  