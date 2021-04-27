import React, { useRef } from "react";
import { useSelectState } from "@react-stately/select";
import { useSelect, HiddenSelect } from "@react-aria/select";
import { useButton } from "@react-aria/button";
import { useListBox, useOption } from "@react-aria/listbox";
import { useOverlay, DismissButton } from "@react-aria/overlays";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import classNames from "classnames";

export { Item } from "@react-stately/collections";

// Markup and styles based on https://tailwindui.com/components/application-ui/forms/select-menus

export function Select(props) {
  let state = useSelectState(props);
  let ref = useRef();
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  let { buttonProps } = useButton({ ...props, ...triggerProps });
  let { focusProps, isFocusVisible } = useFocusRing();
  let buttonClass = classNames(
    "cursor-default",
    "relative",
    "w-full",
    "rounded-md",
    "border",
    props.isDisabled ? "border-gray-200" : "border-gray-300",
    props.isDisabled ? "bg-gray-200" : "bg-white",
    "pl-3",
    "pr-10",
    "py-2",
    "text-left",
    "focus:outline-none",
    isFocusVisible ? "shadow-outline" : "",
    isFocusVisible ? "border-blue-400" : "",
    "transition",
    "ease-in-out",
    "duration-150",
    "sm:text-sm",
    "sm:leading-5"
  );

  let valueClass = classNames(
    "flex",
    "items-center",
    "space-x-3",
    props.isDisabled
      ? "text-gray-400"
      : state.selectedItem
      ? "text-gray-800"
      : "text-gray-500"
  );

  return (
    <div className="space-y-1 w-3/4">
      <div
        {...labelProps}
        className="block text-sm leading-5 font-medium text-gray-700"
      >
        {props.label}
      </div>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <div className="relative">
        <button
          {...mergeProps(buttonProps, focusProps)}
          ref={ref}
          className={buttonClass}
        >
          <span {...valueProps} className={valueClass}>
            {state.selectedItem
              ? state.selectedItem.rendered
              : "Select an option"}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {state.isOpen && (
          <Popover state={state}>
            <ListBox {...menuProps} state={state} />
          </Popover>
        )}
      </div>
    </div>
  );
}

export function Popover({ children, state }) {
  let overlayRef = useRef();
  let { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true
    },
    overlayRef
  );

  return (
    <FocusScope restoreFocus>
      <div
        {...overlayProps}
        ref={overlayRef}
        className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-50"
      >
        <DismissButton onDismiss={() => state.close()} />
        {children}
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </FocusScope>
  );
}

function ListBox({ state, ...props }) {
  let ref = useRef();
  let { listBoxProps } = useListBox(
    {
      ...props,
      autoFocus: state.focusStrategy,
      disallowEmptySelection: true
    },
    state,
    ref
  );

  return (
    <ul
      {...mergeProps(listBoxProps, props)}
      ref={ref}
      className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
    >
      {[...state.collection].map(item => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

function Option({ item, state }) {
  let ref = useRef();
  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let isFocused = state.selectionManager.focusedKey === item.key;
  let { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true
    },
    state,
    ref
  );

  let className = classNames(
    isFocused ? "text-white" : "text-gray-900",
    isFocused ? "bg-blue-600" : "",
    "cursor-default",
    "select-none",
    "relative",
    "py-2",
    "pl-3",
    "pr-9",
    isSelected ? "font-semibold" : "font-normal",
    "focus:outline-none"
  );

  let checkmarkClass = classNames(
    "absolute",
    "inset-y-0",
    "right-0",
    "flex",
    "items-center",
    "pr-4",
    isFocused ? "text-white" : "text-gray-600"
  );

  return (
    <li {...optionProps} ref={ref} className={className}>
      <div className="flex items-center space-x-3">{item.rendered}</div>
      {isSelected && (
        <span aria-hidden="true" className={checkmarkClass}>
          <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </li>
  );
}

export function Text({ children }) {
  return <span className="block truncate">{children}</span>;
}

export function Avatar({ src }) {
  return <img src={src} alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />;
}
