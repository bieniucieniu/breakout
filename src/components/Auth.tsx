import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { googleButton } from "./styles/authButton.css";
import { button } from "./styles/basicComponents.css";

export const SignInWithGoogle = ({ className }: { className?: string }) => {
  const [signInWithGoogle, _user, loading, errorIn] = useSignInWithGoogle(auth);

  if (errorIn) {
    return <span className={className}>Error: {errorIn.message}</span>;
  }
  return (
    <span className={className}>
      {loading ? (
        "Loading..."
      ) : (
        <button className={button} onClick={() => signInWithGoogle()}>
          sign In With Google
        </button>
      )}
    </span>
  );
};

export const SignOut = ({ className }: { className?: string }) => {
  const [signOut, loading, errorOut] = useSignOut(auth);

  if (errorOut) {
    return <span className={className}>Error: {errorOut.message}</span>;
  }

  return (
    <span className={className}>
      {loading ? (
        "Loading..."
      ) : (
        <button
          className={button}
          onClick={(e) => {
            signOut();
          }}
        >
          logout
        </button>
      )}
    </span>
  );
};

export const AuthButton = ({ className }: { className?: string }) => {
  const [user, loading, error] = useAuthState(auth);
  if (error) {
    return <span className={className}>Error: {error.message}</span>;
  }
  return loading ? (
    <span className={className}>Loading...</span>
  ) : user ? (
    <SignOut className={className} />
  ) : (
    <SignInWithGoogle className={className} />
  );
};
