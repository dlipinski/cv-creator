import { Label, Pane, Textarea as EvergreenTextarea } from "evergreen-ui";
import { FormEventHandler } from "react";

interface InputProps {
  label?: string;
  value: string;
  onChange: FormEventHandler;
  placeholder?: string;
  rows?: number;
}

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 1,
}: InputProps) => {
  return (
    <Pane display="grid" gap={2}>
      <Label size={300} paddingLeft={2}>
        {label}
      </Label>
      <EvergreenTextarea
        resize="none"
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={onChange}
      />
    </Pane>
  );
};

export default Textarea;
