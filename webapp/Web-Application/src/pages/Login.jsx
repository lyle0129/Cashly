import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <SignIn signUpUrl= "/signup" forceRedirectUrl={"/dashboard"}  />
    </div>
  );
}
