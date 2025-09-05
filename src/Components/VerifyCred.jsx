import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { checkVerifyOTP } from '../Api/verify/verifyRequest'
import '../assets/css/ForgetPassword.css';

const VerifyCred = ({ onClose, type, onVerified }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [loading, setLoading] = useState(false)

  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '')
    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    if (value && element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const handleConfirmOtp = async () => {
    if (loading) {
      return
    }
    const enteredOtp = otp.join('')
    if (enteredOtp.length !== 6) {
      toast.error('Please enter a valid OTP')
    }
    const payload = {
      otp: enteredOtp,
      type: type,
    }

    try {
      setLoading(true)
      const response = await checkVerifyOTP(payload)
      if (response.success) {
        toast.success('OTP Verified')
        onVerified(type)
        onClose()
      }
    } catch (error) {
      toast.error('Failed to verify OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="popup-overlay-fp">
      <div className="popup-box-fp">
        <button className="close-btn-fp" onClick={onClose}>
          ×
        </button>
      
        <div className="popup-content-fp" style={{ backgroundColor: "cornsilk", margin: "-4px", border: '1px solid', padding: '10px', borderRadius: "20px" }}>
          <h3>Enter OTP</h3>
          <div className="otp-container-fp">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <button
            className="send-otp-button-fp btn-fp login-btn-fp text-uppercase input-bottom-shadow-fp"
            onClick={handleConfirmOtp}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              border: "1px solid"
            }}
          >
            Confirm OTP
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyCred
