import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import React from 'react';
import { ElementType } from 'react';

interface IButtonProps extends AriaButtonProps<ElementType> {
  cdlStyle?: string;
}

function SecondaryButton(props: IButtonProps): JSX.Element {
  let domRef = React.useRef();
  //@ts-ignore
  const { buttonProps } = useButton(props, domRef);

  const defaultClasses = `
                p-1.5 
                bg-yellow-500 
                rounded-md 
                text-lg 
                font-black 
                text-white
                bg-white
                `;

  const classes = ` ${defaultClasses} ${props.cdlStyle}`;

  return (
    <button
      {...buttonProps}
      ref={domRef}
      className={'button button--outlined'}
    >
      {props.children}
    </button>
  );
}

export default SecondaryButton;
