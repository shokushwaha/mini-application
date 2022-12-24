import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  const callAboutPage = async () => {
    try {

      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = res.json();

      if (!res.status === 201) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }
  useEffect(() => {
    callAboutPage();
  }, [])


  return (
    <div>
      Shobhit Kushwaha
      MERN Developer
    </div>
  )
}
