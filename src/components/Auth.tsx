import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { googleButton } from "./styles/authButton.css";

export const SignInWithGoogle = () => {
  const [signInWithGoogle, _user, loading, errorIn] = useSignInWithGoogle(auth);

  if (errorIn) {
    return <span>Error: {errorIn.message}</span>;
  }
  return loading ? (
    <span>Loading...</span>
  ) : (
    <span>
      <button className={googleButton} onClick={() => signInWithGoogle()}>
        sign In With Google
      </button>
    </span>
  );
};

export const SignOut = () => {
  const [signOut, loading, errorOut] = useSignOut(auth);

  if (errorOut) {
    return <span>Error: {errorOut.message}</span>;
  }

  return loading ? (
    <span>loading...</span>
  ) : (
    <span>
      <button
        onClick={(e) => {
          signOut();
        }}
      >
        logout
      </button>
    </span>
  );
};

export const Auth = ({ className }: { className?: string }) => {
  const [user, loading, error] = useAuthState(auth);
  if (error) {
    return (
      <div className={className}>
        <span>Error: {error.message}</span>;
      </div>
    );
  }
  return (
    <div className={className}>
      {loading ? (
        <span>Loading...</span>
      ) : user ? (
        <SignOut />
      ) : (
        <SignInWithGoogle />
      )}
    </div>
  );
};
