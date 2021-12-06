import { Pane } from "evergreen-ui";
import { Personal } from "../../../editorSlice";
import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";

interface PersonalProps {
  personal: Personal;
}

const PersonalCard = ({ personal }: PersonalProps) => (
  <Pane display="flex" alignItems="center" gap={16}>
    <Pane
      elevation={2}
      width={100}
      height={100}
      borderRadius={8}
      background="gray100"
      backgroundImage={`url(${personal.photo})`}
      backgroundSize="contain"
    />
    <Pane display="grid" gap={4} alignItems="center">
      <Pane display="flex" gap={4}>
        <PreviewPlaceholder
          size={800}
          value={personal.firstName}
          placeholder="John"
        />
        <PreviewPlaceholder
          size={800}
          value={personal.lastName}
          placeholder="Smith"
        />
      </Pane>
      <PreviewPlaceholder
        size={500}
        value={"Front End Developer"}
        placeholder="React/Redux/Solidity Developer"
      />
      <Pane />
      <PreviewPlaceholder
        size={100}
        value={personal.position}
        placeholder="React/Redux/Solidity Developer"
      />
    </Pane>
  </Pane>
);

export default PersonalCard;
