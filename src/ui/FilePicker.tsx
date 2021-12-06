import { Button, Group, Label, Pane, TextInput } from "evergreen-ui";
import { ChangeEvent, useRef } from "react";

interface FilePickerProps {
  label?: string;
  value: string;
  onChange: Function;
  isLoading?: boolean;
  placeholder?: string;
}

const FilePicker = ({
  label,
  value,
  onChange,
  isLoading,
  placeholder,
}: FilePickerProps) => {
  const realPicker = useRef<any>();

  const onFileInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  const onButtonClicked = () => {
    realPicker.current?.click();
  };

  return (
    <Pane display="grid" gap={2}>
      <Label size={300}>{label}</Label>

      <Pane display="grid" gridTemplateColumns="1fr 115px" id="file_picker">
        <TextInput
          borderRight={false}
          width="auto"
          value={value}
          disabled={isLoading}
          placeholder={placeholder}
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
    </Pane>
  );
};

export default FilePicker;
