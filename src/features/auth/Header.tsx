import {
  Button,
  CaretDownIcon,
  Heading,
  IconButton,
  LogOutIcon,
  Pane,
  PersonIcon,
  Popover,
  Text,
  UserIcon,
} from "evergreen-ui";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { emailSelector } from "./authSelectors";
import { logout } from "./authSlice";
import { loadTemplateDocuments } from "../editor/editorSlice";
import Logo from "../../ui/Logo";

const Header = () => {
  const email = useAppSelector(emailSelector);
  const dispatch = useAppDispatch();

  const appLogout = () => {
    dispatch(loadTemplateDocuments());
    dispatch(logout());
  };

  return (
    <Pane borderBottom background="white">
      <Pane
        paddingY={8}
        paddingX={16}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Logo size="small" />

        <Pane display="flex" gap={5} alignItems="center">
          <Text fontWeight={500} size={300}>
            {email || "your.email.google.com"}
          </Text>
          <Popover
            minWidth={0}
            statelessProps={{ borderRadius: 8 }}
            content={
              <Pane padding={8} display="grid" gap={4}>
                {/*
                     <Button appearance="minimal" iconBefore={PersonIcon}>
                  Account
                </Button>
                */}

                <Button
                  appearance="minimal"
                  onClick={appLogout}
                  iconBefore={LogOutIcon}
                >
                  Sign out
                </Button>
              </Pane>
            }
          >
            <IconButton icon={CaretDownIcon} appearance="minimal" />
          </Popover>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Header;
