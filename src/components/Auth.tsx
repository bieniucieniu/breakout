import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { authStyle } from "./styles/auth.css";

export const SignInWithGoogle = ({ className }: { className?: string }) => {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);

  return (
    <span className={`${authStyle} ${className}`}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <button onClick={() => signInWithGoogle()}>sign In With Google</button>
      )}
      <span>{error ? `Error: ${error.message}` : " "}</span>
    </span>
  );
};

export const SignOut = ({ className }: { className?: string }) => {
  const [signOut, loading, error] = useSignOut(auth);

  return (
    <span className={`${authStyle} ${className}`}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <button
          onClick={() => {
            signOut();
          }}
        >
          logout
        </button>
      )}
      <span>{error ? `Error: ${error.message}` : " "}</span>
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
