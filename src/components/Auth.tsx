import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { authButton, errorStyle, googleButton } from "./styles/auth.css";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SignInWithGoogle = ({ className, ...props }: ButtonProps) => {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);

  return (
    <button
      onClick={() => signInWithGoogle()}
      className={`${googleButton} ${className}`}
      {...props}
    >
      sign In With Google
      {error ? (
        <span className={errorStyle}>Error: {error.message}</span>
      ) : null}
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
      {...props}
    >
      logout
      {error ? (
        <span className={errorStyle}>Error: {error.message}</span>
      ) : null}
    </button>
  );
};

export const Auth = ({ ...props }: ButtonProps) => {
  const [user] = useAuthState(auth);

  return user ? <SignOut {...props} /> : <SignInWithGoogle {...props} />;
};
