import styled from 'styled-components';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import { useSelector } from "react-redux";


export default function Board(){
  const navigate = useNavigate();
  const user = useSelector(state=>state.user);
    return (
        <div>
          <p>보드</p>
          {console.log(user)}
        </div>
    )
  }