import React, { useRef } from "react";
import { useMenuTriggerState } from "@react-stately/menu";
import { useTreeState } from "@react-stately/tree";
import {
  useMenu,
  useMenuItem,
  useMenuSection,
  useMenuTrigger
} from "@react-aria/menu";
import { useSeparator } from "@react-aria/separator";

import classNames from "classnames";
import Button from "../button";
import { Popover } from "../select";

export { Section } from "@react-stately/collections";

export function MenuButton(props) {
  // Create state based on the incoming props
  let state = useMenuTriggerState(props);

  // Get props for the menu trigger and menu elements
  let ref = React.useRef();
  let { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Button {...props} {...menuTriggerProps} ref={ref}>
        {props.label}
        <svg
          aria-hidden="true"
          className="inline ml-1 -mr-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      {state.isOpen && (
        <Popover state={state}>
          <Menu
            {...props}
            aria-label="Menu"
            domProps={menuProps}
            autoFocus={state.focusStrategy || true}
            onClose={() => state.close()}
          />
        </Popover>
      )}
    </div>
  );
}

function Menu(props) {
  // Create state based on the incoming props
  let state = useTreeState({ ...props, selectionMode: "none" });

  // Get props for the menu element
  let ref = useRef();
  let { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      ref={ref}
      className="pt-1 pb-1 shadow-xs rounded-md focus:outline-none"
    >
      {[...state.collection].map(item => (
        <MenuSection
          key={item.key}
          section={item}
          state={state}
          onAction={props.onAction}
          onClose={props.onClose}
        />
      ))}
    </ul>
  );
}

function MenuSection({ section, state, onAction, onClose }) {
  let { itemProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"]
  });

  let { separatorProps } = useSeparator({
    elementType: "li"
  });

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          className="border-t border-gray-300 mt-1 mb-1"
        />
      )}
      <li {...itemProps}>
        <ul {...groupProps}>
          {[...section.childNodes].map(node => (
            <MenuItem
              key={node.key}
              item={node}
              state={state}
              onAction={onAction}
              onClose={onClose}
            />
          ))}
        </ul>
      </li>
    </>
  );
}

function MenuItem({ item, state, onAction, onClose }) {
  // Get props for the menu item element
  let ref = React.useRef();
  let { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled: item.isDisabled,
      onAction,
      onClose
    },
    state,
    ref
  );

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  let isFocused = state.selectionManager.focusedKey === item.key;

  let className = classNames(
    "text-gray-900",
    isFocused ? "bg-gray-300" : "",
    "text-sm",
    "cursor-default",
    "select-none",
    "relative",
    "py-2",
    "pl-3",
    "pr-9",
    "focus:outline-none"
  );

  return (
    <li {...menuItemProps} ref={ref} className={className}>
      {item.rendered}
    </li>
  );
}