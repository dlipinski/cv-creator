import { Button, Group, Pane, TextInput } from "evergreen-ui";
import { ChangeEvent, useRef } from "react";

interface FilePickerProps {
  value: string;
  onChange: Function;
  isLoading?: boolean;
}

const FilePicker = ({ value, onChange, isLoading }: FilePickerProps) => {
  const realPicker = useRef<any>();

  const onFileInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  const onButtonClicked = () => {
    realPicker.current?.click();
  };

  return (
    <Pane display="grid" gridTemplateColumns="1fr auto" id="file_picker">
      <TextInput
        borderRight={false}
        width="auto"
        value={value}
        disabled={isLoading}
        placeholder="Select the image here!"
        style={{ borderRadius: "8px 0px 0px 8px" }}
      />
      <input
        ref={realPicker}
        type="file"
        onChange={onFileInputChanged}
        accept="image/*"
        style={{ display: "none" }}
      />
      <Button isLoading={isLoading} onClick={onButtonClicked}>
        Select file
      </Button>
    </Pane>
  );
};

export default FilePicker;
