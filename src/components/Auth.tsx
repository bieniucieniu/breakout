import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const SignInWithGoogle = ({ className }: { className?: string }) => {
  const [signInWithGoogle, _user, loading, error] = useSignInWithGoogle(auth);

  return (
    <span className={className}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <button onClick={() => signInWithGoogle()}>sign In With Google</button>
      )}
      <span>{error && `Error: ${error.message}`}</span>
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
      <span>{error && `Error: ${error.message}`}</span>
    </span>
  );
};

export const Auth = ({ className }: { className?: string }) => {
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
