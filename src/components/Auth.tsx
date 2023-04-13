import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { authButton, errorStyle, googleButton } from "./styles/auth.css";
import type { AuthError } from "firebase/auth";
import { useEffect, useState } from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Error = ({ error }: { error: AuthError | Error }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setVisible(true);
  }, [error]);

  return (
    <span
      onClick={() => setVisible(false)}
      style={{ visibility: visible ? "visible" : "hidden" }}
      className={errorStyle}
    >
      Error: {error.message}
    </span>
  );
};

export const SignInWithGoogle = ({ className, ...props }: ButtonProps) => {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);

  return (
    <button
      onClick={() => signInWithGoogle()}
      className={`${googleButton} ${className}`}
      disabled={loading}
      {...props}
    >
      sign In With Google
      {error ? <Error error={error} /> : null}
    </button>
  );
};

export const SignOut = ({ className, ...props }: ButtonProps) => {
  const [signOut, loading, error] = useSignOut(auth);

  return (
    <button
      onClick={() => {
        signOut();
      }}
      className={`${authButton} ${className}`}
      disabled={loading}
      {...props}
    >
      logout
      {error ? <Error error={error} /> : null}
    </button>
  );
};

export const Auth = ({ ...props }: ButtonProps) => {
  const [user] = useAuthState(auth);

  return user ? <SignOut {...props} /> : <SignInWithGoogle {...props} />;
};
