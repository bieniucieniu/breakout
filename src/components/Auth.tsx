import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {
  authButton,
  authContainer,
  authStyle,
  errorStyle,
  googleButton,
} from "./styles/auth.css";

export const SignInWithGoogle = ({
  className,
  ...props
}: React.HTMLProps<HTMLSpanElement>) => {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);

  return (
    <span className={`${authStyle} ${className}`} {...props}>
      {loading ? (
        <div className={authContainer}>Loading...</div>
      ) : (
        <button onClick={() => signInWithGoogle()} className={googleButton}>
          sign In With Google
        </button>
      )}
      {error ? (
        <span className={errorStyle}>Error: {error.message}</span>
      ) : null}
    </span>
  );
};

export const SignOut = ({
  className,
  ...props
}: React.HTMLProps<HTMLSpanElement>) => {
  const [signOut, loading, error] = useSignOut(auth);

  return (
    <span className={`${authStyle} ${className}`} {...props}>
      {loading ? (
        <div className={authContainer}>Loading...</div>
      ) : (
        <button
          onClick={() => {
            signOut();
          }}
          className={authButton}
        >
          logout
        </button>
      )}
      {error ? (
        <span className={errorStyle}>Error: {error.message}</span>
      ) : null}
    </span>
  );
};

export const Auth = ({ ...props }: React.HTMLProps<HTMLSpanElement>) => {
  const [user] = useAuthState(auth);

  return user ? <SignOut {...props} /> : <SignInWithGoogle {...props} />;
};
