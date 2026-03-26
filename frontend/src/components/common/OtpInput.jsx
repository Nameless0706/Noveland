import React, { useState } from 'react'

const OtpInput = ({length = 5}) => {

  const [otp, setOtp] = useState(new Array(length).fill(""));

  console.log(otp);
  return (
    <div>OtpInput</div>
  )
}

export default OtpInput