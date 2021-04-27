import './app.css';

import React from 'react';

import Button from './packages/button';
import { Dialog } from './packages/dialog/index';
import { OverlayProvider } from 'react-aria';
import { DialogTrigger } from './packages/dialog';
import { Checkbox } from './packages/checkbox';
import { MenuButton, Section } from './packages/menu';
import { Avatar, Item, Select, Text } from './packages/select';
import { TextField } from './packages/text-field';
import PrimaryButton from './packages/button/PrimaryButton';
import SecondaryButton from './packages/button/SecondaryButton';


function SelectExample(props) {
  return (
    <Select label="Assigned to" {...props}>
      <Item textValue="Wade Cooper">
        <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <Text>Wade Cooper</Text>
      </Item>
      <Item textValue="Arlene Mccoy">
        <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <Text>Arlene Mccoy</Text>
      </Item>
      <Item textValue="Devon Webb">
        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
        <Text>Devon Webb</Text>
      </Item>
      <Item textValue="Tom Cook">
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <Text>Tom Cook</Text>
      </Item>
      <Item textValue="Tanya Fox">
        <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <Text>Tanya Fox</Text>
      </Item>
    </Select>
  );
}


function App(): JSX.Element {
  return (
    <OverlayProvider>
      <div
        className="p-5 grid gap-8 grid-cols-2"
        style={{ justifyItems: "center" }}
      >
        <Button onPress={() => {
          alert("Hello World");
        }}>Yayy! button</Button>

        <PrimaryButton onPress={() => {
          alert("Hello World");
        }}>Yayy! button</PrimaryButton>

        <SecondaryButton onPress={() => {
          alert("Hello World");
        }}>Yayy! button</SecondaryButton>

        <Checkbox label="Checkbox">Check this out</Checkbox>

        <DialogTrigger label="Open dialog">
          <Dialog title="Confirm" confirmLabel="Do it" isDismissable>
            Are you sure you want to do that?
          </Dialog>
        </DialogTrigger>

        <MenuButton label="Actions" onAction={(key: any) => alert(key)}>
          <Section>
            <Item key="edit">Edit</Item>
            <Item key="duplicate">Duplicate</Item>
          </Section>
          <Section>
            <Item key="archive">Archive</Item>
            <Item key="move">Move</Item>
          </Section>
          <Section>
            <Item key="delete">Delete</Item>
          </Section>
        </MenuButton>
        <MenuButton label="Actions" onAction={(key: any) => alert(key)} isDisabled>
          <Section>
            <Item key="edit">Edit</Item>
            <Item key="duplicate">Duplicate</Item>
          </Section>
          <Section>
            <Item key="archive">Archive</Item>
            <Item key="move">Move</Item>
          </Section>
          <Section>
            <Item key="delete">Delete</Item>
          </Section>
        </MenuButton>

        <TextField label="Email" placeholder="test@example.com" />
        <TextField label="Email" placeholder="test@example.com" isDisabled />


        <SelectExample />

      </div>
    </OverlayProvider>

  );
}

export default App;
