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
    <span className={className}>
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
    <span className={className}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <button
          onClick={(e) => {
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

export const Auth = () => {
  const [user, loading, error] = useAuthState(auth);
  if (error) {
    return <span className={authStyle}>Error: {error.message}</span>;
  }
  return loading ? (
    <span className={authStyle}>Loading...</span>
  ) : user ? (
    <SignOut className={authStyle} />
  ) : (
    <SignInWithGoogle className={authStyle} />
  );
};
