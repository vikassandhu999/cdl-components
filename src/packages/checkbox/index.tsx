import React, { useRef } from "react";
import { useToggleState } from "@react-stately/toggle";
import { useCheckbox } from "@react-aria/checkbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import classNames from "classnames";

export function Checkbox(props) {
  let state = useToggleState(props);
  let ref = useRef();
  let { inputProps } = useCheckbox(props, state, ref);
  let { focusProps, isFocusVisible } = useFocusRing();

  let checkboxClassName = classNames(
    state.isSelected ? "bg-blue-500" : "bg-white",
    "text-white",
    "border-2",
    "rounded",
    props.isDisabled
      ? "border-gray-300"
      : isFocusVisible || state.isSelected
      ? "border-blue-500"
      : "border-gray-500",
    "w-5",
    "h-5",
    "flex",
    "flex-shrink-0",
    "justify-center",
    "items-center",
    "mr-2",
    isFocusVisible ? "shadow-outline" : "",
    "transition",
    "ease-in-out",
    "duration-150"
  );

  let labelClassName = classNames(
    props.isDisabled ? "text-gray-400" : "text-gray-800",
    "select-none"
  );

  return (
    <label className="flex items-center">
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div className={checkboxClassName} aria-hidden="true">
        {state.isSelected && (
          <svg className="fill-current w-3 h-3" viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>
      <span className={labelClassName}>{props.children}</span>
    </label>
  );
}
