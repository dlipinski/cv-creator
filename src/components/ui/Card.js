import { Heading, Pane } from "evergreen-ui";



const Card = ({ level = 0, title, children, footerButtons, headerButtons }) => (
    <Pane background='white' elevation={1} borderRadius={4} overflow='hidden'>
        <Pane padding={headerButtons ? 8 : 16} paddingLeft={16} paddingRight={16} borderBottom display='flex' gap={8} justifyContent='space-between' alignItems='center'>
            <Heading whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' size={level === 0 ? 400 : level === 1 ? 100 : 100}>{title}</Heading>
            {
                headerButtons &&
                <Pane display='flex' gap={8}>
                    {headerButtons}
                </Pane>
            }
        </Pane>
        <Pane padding={16} background={level % 2 === 1 ? 'gray100' : 'white'}>
            {children}
        </Pane>
        {
            footerButtons && (
                <Pane display='flex' gap={8} justifyContent='space-between' padding={8} paddingLeft={16} borderTop alignItems='center'>
                    <Heading whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' size={level === 0 ? 400 : level === 1 ? 100 : 100}>{title}</Heading>
                    <Pane>
                        {footerButtons}
                    </Pane>
                </Pane>

            )
        }
    </Pane >
)

export default Card;