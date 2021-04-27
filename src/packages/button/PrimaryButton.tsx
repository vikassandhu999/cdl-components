import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import React from 'react';
import { ElementType } from 'react';

interface IButtonProps extends AriaButtonProps<ElementType> {
  cdlStyle?: string;
}

function PrimaryButton(props: IButtonProps): JSX.Element {
  let domRef = React.useRef();
  //@ts-ignore
  const { buttonProps } = useButton(props, domRef);

  const defaultClasses = `p-1.5 bg-yellow-500 rounded-md text-sm`;

  const classes = ` ${defaultClasses} ${props.cdlStyle}`;

  return (
    <button
      {...buttonProps}
      ref={domRef}
      className={'button'}
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
