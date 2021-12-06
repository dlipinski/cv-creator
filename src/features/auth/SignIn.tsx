import { Heading, Pane, EndorsedIcon } from "evergreen-ui";
import GoogleButton from "react-google-button";
import { useAppDispatch } from "../../app/hooks";
import Logo from "../../ui/Logo";
import Editor from "../editor/Editor";
import { login } from "./authSlice";

const SignIn = () => {
  const dispatch = useAppDispatch();

  const appLogin = () => {
    const userData = {
      displayName: null,
      email: null,
    };
    dispatch(login(userData));
  };

  return (
    <Pane display="grid" overflow="hidden">
      <Editor />
      <Pane
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        background="overlay"
        style={{
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
        gap={16}
        zIndex={2}
      >
        <Pane
          elevation={3}
          display="grid"
          gap={24}
          background="white"
          padding={24}
          borderRadius={8}
          zIndex={999}
        >
          <Logo size="large" />

          <Pane display="grid" gridTemplateColumns="1fr 1fr" gap={8}>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Personal Data</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Contact Data</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Summary</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Skills</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Experience</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Projects</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Languages</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Interests</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Education</Heading>
            </Pane>
            <Pane display="flex" gap={4}>
              <EndorsedIcon color="green500" />
              <Heading size={300}>Position</Heading>
            </Pane>
          </Pane>
          <Pane borderBottom />
          <GoogleButton type="dark" onClick={appLogin} />
          {/*
      <Heading textAlign="center" size={100}>
            OR traditionally
          </Heading>

          <Pane display="grid" gap={4}>
            <Input label="Username" value={""} onChange={() => {}} />
            <Input label="Password" value={""} onChange={() => {}} />

            <Pane display="grid" gap={4}>
              <Button appearance="primary">Sign In</Button>
              <Button>Sign Up</Button>
              <Button appearance="minimal">Forgot Password?</Button>
            </Pane>
          </Pane>
    */}
        </Pane>
      </Pane>
    </Pane>
  );
};

export default SignIn;
