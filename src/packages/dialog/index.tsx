import React, { useRef } from "react";
import { useOverlayTriggerState } from "@react-stately/overlays";
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer} from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import Button from "../button";


export function Dialog(props) {
  let { title, children, confirmLabel, onClose } = props;

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  let ref = useRef();
  let { overlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  useModal();

  // Get props for the dialog and its title
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
      <div className="absolute inset-0 bg-gray-500 opacity-75 z-0" />
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          //@ts-ignore
          ref={ref}
          className="bg-white rounded-lg p-8 z-1 relative focus:outline-none"
        >
          <h3 {...titleProps} className="text-lg font-medium pb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{children}</p>
          <div className="pt-8 flex space-x-3 justify-end">
            <Button onPress={onClose}>Cancel</Button>
            <Button onPress={onClose}>{confirmLabel}</Button>
          </div>
        </div>
      </FocusScope>
    </div>
  );
}

export function DialogTrigger({ label, children, ...otherProps }) {
  let state = useOverlayTriggerState({});

  return (
    <>
      <Button {...otherProps} onPress={() => state.open()}>
        {label}
      </Button>
      {state.isOpen && (
        <OverlayContainer>
          {React.cloneElement(children, { onClose: () => state.close() })}
        </OverlayContainer>
      )}
    </>
  );
}
