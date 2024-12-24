import { GoogleSignin } from "@flow/components/auth/google-signin";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center size-96">
        <GoogleSignin />
      </div>
    </div>
  );
}
