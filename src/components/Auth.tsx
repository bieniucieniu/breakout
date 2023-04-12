import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { authStyle, errorStyle, googleButton } from "./styles/auth.css";
import { Display } from "./Display";
import { Button } from "./Buttons";

export const SignInWithGoogle = ({ className }: { className?: string }) => {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);

  return (
    <span className={`${authStyle} ${className}`}>
      {loading ? (
        <Display>Loading...</Display>
      ) : (
        <Display>
          <button onClick={() => signInWithGoogle()} className={googleButton}>
            sign In With Google
          </button>
        </Display>
      )}
      {error ? (
        <span className={errorStyle}>Error: {error.message}</span>
      ) : null}
    </span>
  );
};

export const SignOut = ({ className }: { className?: string }) => {
  const [signOut, loading, error] = useSignOut(auth);

  return (
    <span className={`${authStyle} ${className}`}>
      {loading ? (
        <Display>Loading...</Display>
      ) : (
        <Button
          onClick={() => {
            signOut();
          }}
          name="logout"
        />
      )}
      {error ? (
        <span className={errorStyle}>Error: {error.message}</span>
      ) : null}
    </span>
  );
};

export const Auth = ({ className }: { className?: string }) => {
  const [user] = useAuthState(auth);

  return user ? (
    <SignOut className={className} />
  ) : (
    <SignInWithGoogle className={className} />
  );
};
