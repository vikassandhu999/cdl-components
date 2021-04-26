import { useButton } from '@react-aria/button';
import React from 'react';

function Button(properties: any): JSX.Element {
  const reference = React.useRef();
  const { buttonProps } = useButton(properties, reference);

  return (
    <button
  {...buttonProps}
      ref={reference}
      className="p-3 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
    >
      {properties.children}
    </button>
  );
}

export default Button;
