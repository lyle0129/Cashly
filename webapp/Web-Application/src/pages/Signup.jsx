import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <SignUp signInUrl= "/login" forceRedirectUrl={"/dashboard"} />
    </div>
  );
}
