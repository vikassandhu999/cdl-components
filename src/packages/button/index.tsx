import "./button.css";
import React, { useRef } from "react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import classNames from "classnames";
import { AriaButtonProps } from "@react-types/button";

export default function Button(props: AriaButtonProps<React.ElementType<any>>) {
  let ref = useRef();
  //@ts-ignore
  let { buttonProps, isPressed } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      className={'button button--ghost'}
    >
      {props.children}
    </button>
  );
}

