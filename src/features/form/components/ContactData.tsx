import { ChangeEvent } from "react";
import { Pane, Label, TextInput } from "evergreen-ui";
import lng from "../../../languages/languages.en.json";
import Card from "../../../components/ui/Card";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectActiveDocument,
  setAddress,
  setEmail,
  setPhone,
} from "../formSlice";
import { RootState, store } from "../../../app/store";

const ContractData = () => {
  const {
    contact: { phone, email, address },
  } = useAppSelector(selectActiveDocument);
  const dispatch = useAppDispatch();

  const onPhone = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhone(e.currentTarget.value));
  };

  const onEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.currentTarget.value));
  };

  const onAddress = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddress(e.currentTarget.value));
  };

  return (
    <Card title={lng.contactData}>
      <Pane display="grid" gap={4}>
        <Pane display="grid" gridTemplateColumns="1fr 1fr" gap={16}>
          <Pane display="grid" paddingBottom={8}>
            <Label size={300}>{lng.telephone}</Label>
            <TextInput
              placeholder="123 456 678"
              width="auto"
              value={phone}
              onChange={onPhone}
            />
          </Pane>
          <Pane display="grid" paddingBottom={8}>
            <Label size={300}>{lng.email}</Label>
            <TextInput
              placeholder="your.email@gmail.com"
              width="auto"
              value={email}
              onChange={onEmail}
            />
          </Pane>
        </Pane>
        <Pane display="grid" paddingBottom={8}>
          <Label size={300}>{lng.location}</Label>
          <TextInput
            placeholder="Address, Country"
            width="auto"
            value={address}
            onChange={onAddress}
          />
        </Pane>
      </Pane>
    </Card>
  );
};

export default ContractData;
