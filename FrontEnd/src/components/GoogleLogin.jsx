import React, { use } from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../helpers/firebase.js";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteIndex } from "@/helpers/RouteName";
import { setUser } from "@/redux/user/user.slice";
import { useDispatch } from "react-redux";
// import { auth, provider } from "@/firebase";

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = async () => {
    // Implement Google login logic here
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/auth/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bodyData),
        },
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        return showToast(data.message || "Login failed!", "error");
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      showToast(data.message || "Login successful!", "success");
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    }
  };
  return (
    <div>
      <Button
        variant="outline"
        onClick={handleLogin}
        className="google-login-button w-full"
      >
        <FcGoogle className="google-icon" />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
};

export default GoogleLogin;
