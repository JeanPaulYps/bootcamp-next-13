import { AuthenticationContext } from "@/app/context/authContext";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useContext } from "react";

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const signIn = async ({
    email,
    password,
    handleClose,
  }: {
    email: string;
    password: string;
    handleClose: () => void;
  }) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const response = await axios.post("api/auth/signin", {
        email,
        password,
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signUp = async ({
    firstName,
    lastName,
    city,
    phone,
    email,
    password,
    handleClose,
  }: {
    firstName: string;
    lastName: string;
    city: string;
    phone: string;
    email: string;
    password: string;
    handleClose: () => void;
  }) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const response = await axios.post("api/auth/signup", {
        firstName,
        lastName,
        city,
        phone,
        email,
        password,
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  

  return {
    signIn,
    signUp
  };
};

export default useAuth;
