import { authButton, authWraper, errorStyle, googleButton } from "./styles/auth.css";
import { isGoogleAuthConfigured, useAuth } from "../auth/context";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Error = ({ error, onDismiss }: { error: Error; onDismiss: () => void }) => {
  return (
    <span onClick={onDismiss} className={errorStyle}>
      Error: {error.message}
    </span>
  );
};

export const SignInWithGoogle = ({ className, ...props }: ButtonProps) => {
  const { signIn, loading, error, clearError } = useAuth();

  return (
    <div className={authWraper}>
      <button
        onClick={() => signIn()}
        className={`${googleButton} ${className}`}
        disabled={loading}
        {...props}
      >
        sign In With Google
      </button>
      {error ? <Error error={error} onDismiss={clearError} /> : null}
    </div>
  );
};

export const SignOut = ({ className, ...props }: ButtonProps) => {
  const { signOut, loading, error, clearError } = useAuth();

  return (
    <div className={authWraper}>
      <button
        onClick={() => signOut()}
        className={`${authButton} ${className}`}
        disabled={loading}
        {...props}
      >
        logout
      </button>
      {error ? <Error error={error} onDismiss={clearError} /> : null}
    </div>
  );
};

export const Auth = ({ ...props }: ButtonProps) => {
  if (!isGoogleAuthConfigured()) {
    return (
      <div className={authWraper}>
        <span className={errorStyle}>Set VITE_GOOGLE_CLIENT_ID to enable sign-in</span>
      </div>
    );
  }

  const { user } = useAuth();

  return user ? <SignOut {...props} /> : <SignInWithGoogle {...props} />;
};
