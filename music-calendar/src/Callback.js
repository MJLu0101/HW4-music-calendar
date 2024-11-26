import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
  const clientId = "e8b70bb4afa14f1abc0358a899f4486e";
  const clientSecret = "6eec14dcff87465c823668b4af3580a7"; // Replace this with your actual client secret
  const redirectUri = "http://localhost:3000/dashboard";

  const fetchAccessToken = async (code) => {
    const url = "https://accounts.spotify.com/api/token";
    const data = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const accessToken = response.data.access_token;
      console.log("Access Token:", accessToken);

      // Store access token in localStorage or state
      localStorage.setItem("spotifyAccessToken", accessToken);

      // Navigate to another route or perform further actions
      navigate("/dashboard"); // Redirect to dashboard page
    } catch (error) {
      console.error("Error fetching the access token:", error);
    }
  };

  useEffect(() => {
    // Extract the authorization code from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      fetchAccessToken(code); // Exchange code for access token
    } else {
      console.error("Authorization code not found in URL.");
    }
  }, []);

  return (
    <div>
      <h2>Authenticating...</h2>
      <p>Please wait while we process your login.</p>
    </div>
  );
};

export default Callback;
