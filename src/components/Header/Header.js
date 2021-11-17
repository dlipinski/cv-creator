import { Button, Heading, Pane } from "evergreen-ui";

const Header = () => (
    <Pane background='white' borderBottom zIndex={999} padding={16} paddingHorizontal={16} display='flex' justifyContent='space-between' alignItems='center'>
        <Heading style={{ textTransform: 'uppercase' }}>Developer CV Tool</Heading>
    </Pane>
)

export default Header;