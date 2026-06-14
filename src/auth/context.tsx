import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getStoredUser, setStoredUser, type User } from "./user";

type AuthContextValue = {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
  error: Error | null;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const AuthProviderInner = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Google profile");
        }

        const profile = (await response.json()) as {
          sub: string;
          name?: string;
          email?: string;
          picture?: string;
        };

        const nextUser: User = {
          uid: profile.sub,
          name: profile.name || profile.email || "Player",
          email: profile.email || "",
          picture: profile.picture,
        };

        setStoredUser(nextUser);
        setUser(nextUser);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Google sign-in failed"));
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError(new Error("Google sign-in was cancelled or failed"));
      setLoading(false);
    },
  });

  const signOut = useCallback(() => {
    setStoredUser(null);
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      loading,
      error,
      clearError,
    }),
    [user, signIn, signOut, loading, error, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  if (!googleClientId) {
    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "Google OAuth is not configured. Set VITE_GOOGLE_CLIENT_ID in your environment.",
    );
  }

  return context;
};

export const isGoogleAuthConfigured = () => Boolean(googleClientId);
