import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {
  authButton,
  authWraper,
  errorStyle,
  googleButton,
} from "./styles/auth.css";
import type { AuthError } from "firebase/auth";
import { useEffect, useState } from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Error = ({ error }: { error: AuthError | Error }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timeout);
  }, [error, undefined]);

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
    <div className={authWraper}>
      <button
        onClick={() => signInWithGoogle()}
        className={`${googleButton} ${className}`}
        disabled={loading}
        {...props}
      >
        sign In With Google
      </button>
      {error ? <Error error={error} /> : null}
    </div>
  );
};

export const SignOut = ({ className, ...props }: ButtonProps) => {
  const [signOut, loading, error] = useSignOut(auth);

  return (
    <div className={authWraper}>
      <button
        onClick={() => {
          signOut();
        }}
        className={`${authButton} ${className}`}
        disabled={loading}
        {...props}
      >
        logout
      </button>
      {error ? <Error error={error} /> : null}
    </div>
  );
};

export const Auth = ({ ...props }: ButtonProps) => {
  const [user] = useAuthState(auth);

  return user ? <SignOut {...props} /> : <SignInWithGoogle {...props} />;
};
