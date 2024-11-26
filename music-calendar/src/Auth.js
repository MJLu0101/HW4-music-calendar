import React from "react";

const Auth = () => {
  console.log("Auth Component Loaded"); 

  const clientId = "e8b70bb4afa14f1abc0358a899f4486e";
  const redirectUri = "http://localhost:3000/dashboard";
  const scope = "user-read-recently-played user-top-read user-library-read";
 const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=123`;


  return (
    <div>
      <h2>Login to Spotify</h2>
      <a href={authUrl}>Login with Spotify</a>
    </div>
  );
};

export default Auth;
