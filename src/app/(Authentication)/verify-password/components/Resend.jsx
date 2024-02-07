"use client"

import notifySuccess from '@/app/utils/notifySuccess';
import React from 'react'


const Resend = () => {

  // Write function to make the request to the api that handles sending Verification pin to the client

  const getOTP = async () =>{
    notifySuccess("Sending OTP")

  }
  return <span onClick={getOTP} className="text-green-700 font-bold">Resend</span>;
}

export default Resend