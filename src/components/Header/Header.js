import { Button, CaretDownIcon, CircleArrowDownIcon, Dialog, DocumentIcon, EditIcon, Heading, IconButton, Label, LogOutIcon, Menu, Pane, PeopleIcon, PersonIcon, Popover, Position, RemoveIcon, Text, TextInput, TrashIcon, UserIcon } from "evergreen-ui";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { emailSelector, isUserAuthenticatedSelector, pendingSelector } from "../../features/auth/authSelectors";
import { login, logout } from "../../features/auth/authSlice";

const Header = () => {
    const [isDialogShown, setIsDialogShown] = useState(false);
    const authenticated = useAppSelector(isUserAuthenticatedSelector);
    const email = useAppSelector(emailSelector);
    const pending = useAppSelector(pendingSelector);
    const dispatch = useAppDispatch();

    const appLogin = () => {
        const userData = {
            displayName: null,
            email: null,
        };
        dispatch(login(userData));
    };

    const appLogout = () => {
        dispatch(logout());
    }

    return (
        <Pane borderBottom background='white' padding={8} paddingLeft={32} paddingHorizontal={16} display='flex' justifyContent='space-between' alignItems='center'>
            <Pane display='flex' alignItems='center' gap={4}>
                <DocumentIcon size={16} />
                <Heading size={400}>CV-TOOL</Heading>
            </Pane>
            {
                !authenticated
                    ? <Button isLoading={isDialogShown} onClick={() => setIsDialogShown(true)} appearance='primary'>Sign In</Button>
                    : <Pane display='flex' gap={8} alignItems='center'>
                        <Heading size={100}>{email}</Heading>
                        <Popover
                            minWidth={0}
                            content={
                                <Pane padding={8} display='grid' gap={4}>
                                    <Button appearance='minimal' iconBefore={UserIcon}>Account</Button>

                                    <Button appearance='minimal'>Sign out</Button>
                                </Pane>
                            }
                        >
                            <IconButton icon={CaretDownIcon} appearance='minimal' />
                        </Popover>
                    </Pane>
            }
            <Dialog
                width='auto'
                title='Sign In'
                isShown={isDialogShown && !authenticated}
                hasFooter={false}
                onCloseComplete={() => setIsDialogShown(false)}
            >
                <Pane display='grid' gap={24} paddingBottom={8}>
                    <GoogleButton type='dark' onClick={appLogin} />
                    <Heading textAlign='center' size={100}>OR traditionally</Heading>
                    <Pane display='grid' gap={8}>
                        <Pane display='grid' gap={4}>
                            <Pane display='grid'>
                                <Label size={300}>Username</Label>
                                <TextInput width='auto' />
                            </Pane>
                            <Pane display='grid'>
                                <Label size={300}>Password</Label>
                                <TextInput type='password' width='auto' />
                            </Pane>
                        </Pane>

                        <Pane display='grid' gap={4}>
                            <Button appearance='primary'>
                                Sign In
                            </Button>
                            <Button >
                                Sign Up
                            </Button>
                            <Button appearance='minimal'>
                                Forgot Password?
                            </Button>
                        </Pane>
                    </Pane>
                </Pane>

            </Dialog>
        </Pane>
    )
}

export default Header;