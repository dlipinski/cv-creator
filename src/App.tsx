import { Button, IconButton, Pane } from "evergreen-ui";
import Header from "./features/auth/Header";
import firebase from "firebase";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  isUserAuthenticatedSelector,
  pendingSelector,
} from "./features/auth/authSelectors";
import { login, logout } from "./features/auth/authSlice";
import Editor from "./features/editor/Editor";
import SignIn from "./features/auth/SignIn";
import githubLogo from "./assets/githubLight.png";

const App = () => {
  const authenticated = useAppSelector(isUserAuthenticatedSelector);
  const pending = useAppSelector(pendingSelector);

  const dispatch = useAppDispatch();

  const refresh = useCallback(
    async (displayName, email) => {
      const userData = {
        displayName,
        email,
      };
      return dispatch(login(userData));
    },
    [dispatch]
  );

  useEffect(() => {
    const f = async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user && !authenticated) {
          return await refresh(user.displayName, user.email);
        }
        if (!user && !authenticated) {
          dispatch(logout());
        }
      });
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    };
    f();
  });

  useEffect(() => {
    if (!authenticated) return;
  }, [dispatch, authenticated]);

  return (
    <Pane
      width="100vw"
      height="100vh"
      display="grid"
      gridTemplateRows="auto 1fr"
      background="gray200"
    >
      <Header />
      {authenticated ? <Editor /> : pending ? null : <SignIn />}
      <a href="https://asd.pl" target="_blank" rel="noreferrer">
        <Button
          position="fixed"
          left={16}
          bottom={16}
          zIndex={999}
          appearance="minimal"
          padding={6}
          height="auto"
        >
          <img
            src={githubLogo}
            alt="Github Logo"
            style={{ width: 24, height: 24 }}
          />
        </Button>
      </a>
    </Pane>
  );
};

export default App;
