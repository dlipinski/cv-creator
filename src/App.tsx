import { Pane } from "evergreen-ui";
import classes from "./App.module.css";
import Form from "./features/form/Form";
import Header from "./components/Header/Header";
import Page from "./components/Page/Page";
import firebase from "firebase";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { isUserAuthenticatedSelector } from "./features/auth/authSelectors";
import { login, logout } from "./features/auth/authSlice";
import { fetchDocuments } from "./features/form/formSlice";
import LeftPanel from "./features/form/components/LeftPanel";

function App() {
  const authenticated = useAppSelector(isUserAuthenticatedSelector);
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
    dispatch(fetchDocuments({}));
  }, [dispatch, authenticated]);

  return (
    <Pane
      width="100vw"
      height="100vh"
      display="grid"
      gridTemplateRows="auto 1fr"
      overflow="scroll"
      background="white"
    >
      <Header />
      <Pane
        display="grid"
        gridTemplateColumns="auto auto 1fr"
        overflow="scroll"
      >
        <LeftPanel />

        <Pane className={classes.FormContainer} background="gray50">
          <Form />
        </Pane>
        <Pane className={classes.PageContainer} background="gray50">
          <Page />
        </Pane>
      </Pane>
    </Pane>
  );
}

export default App;
