import axios from "axios"; 

export const verifyRequest = async (form) => {
    try {

        const response = await axios.post(
            `https://bookmyyogna.onrender.com/register/verifyEmail`,
            form,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};
export const verifyRequestPhone = async (form) => {
    try {

        const response = await axios.post(
            `https://bookmyyogna.onrender.com/register/verifyPhone`,
            form,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};


export const checkVerifyOTP = async (form) => {
    try {

        const response = await axios.post(
            `https://bookmyyogna.onrender.com/register/verifyOtp`,
            form,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};