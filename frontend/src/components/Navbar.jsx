import React, { useState, useEffect } from 'react'
import logo from "../images/logo.png"
import { RiSearchLine } from "react-icons/ri";
import Avatar from 'react-avatar';
import { apiFetch } from '../Helper';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const getUser = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    apiFetch('/getUser', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
        } else {
          setData(data.user);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch user:', err);
        setError(err.body?.message || err.message || 'Failed to fetch user');
      });
  };
  const logout = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // nothing to do
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      navigate('/login');
      return;
    }

    apiFetch('/logout', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then((data) => {
        if (data && data.success === false) {
          setError(data.message);
          return;
        }
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
      })
      .catch((err) => {
        console.error('Logout failed:', err);
        setError(err.body?.message || err.message || 'Logout failed');
        // still clear local state and navigate
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
      });
  }

  useEffect(() => {
    getUser();
  }, [])


  return (
    <>
      <div className="navbar flex items-center px-[100px] h-[90px] justify-between bg-[F4F4F4]">
        <img src={logo} alt="logo" />
        <div className="right flex items-center justify-end gap-2">
          <div className="inputBox w-[30vw]">
            <i><RiSearchLine /></i>
            <input type="text" placeholder='Search Here...!' />

          </div>
          <button onClick={logout} className='p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg border-0 transition-all hover:bg-red-600'>Logout</button>
          <Avatar name={data ? data.name : ""} className='cursor-pointer' size="40" round="50%" />
        </div>
      </div>
    </>
  )
}

export default Navbar
