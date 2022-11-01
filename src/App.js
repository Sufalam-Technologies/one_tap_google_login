import { useEffect } from "react";
import "./App.css";
import { toAbsoluteUrl } from "./utils/utils";

function App() {
  // Login with Library
  // useGoogleOneTapLogin({
  //   onError: (error) => console.log(error),
  //   onSuccess: (response) => console.log(response),
  //   googleAccountConfigs: {
  //     client_id: "", // Google Client Id
  //   },
  // });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = (data) => {
      function decodeJwtResponse(token) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        return JSON.parse(jsonPayload);
      }
      let responsePayload;
      function handleCredentialResponse(response) {
        // decodeJwtResponse() is a custom function defined by you
        // to decode the credential response.
        responsePayload = decodeJwtResponse(response.credential);

        console.log("ID: " + responsePayload.sub);
        console.log("Full Name: " + responsePayload.name);
        console.log("Given Name: " + responsePayload.given_name);
        console.log("Family Name: " + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
      }

      window.google.accounts.id.initialize({
        client_id:
          "123-123abc1321acbvc231321a.apps.googleusercontent.com", //Google Client Id
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.prompt();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={toAbsoluteUrl("../media/Sufalamtech-Homepage-SS.png")}
          alt="logo"
          height={"100%"}
          width={"100%"}
        />
      </header>
    </div>
  );
}

export default App;
