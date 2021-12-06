import { Label, Pane, TextInput } from "evergreen-ui";
import { FormEventHandler } from "react";

interface InputProps {
  label?: string;
  value: string;
  onChange: FormEventHandler;
  placeholder?: string;
}

const Input = ({ label, value, onChange, placeholder }: InputProps) => {
  return (
    <Pane display="grid" gap={2}>
      <Label size={300} paddingLeft={2}>
        {label}
      </Label>
      <TextInput
        placeholder={placeholder}
        width="auto"
        value={value}
        onChange={onChange}
      />
    </Pane>
  );
};

export default Input;
