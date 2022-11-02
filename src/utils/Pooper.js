import { ActionList, Button , Icon, Popover } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";

const Pooper = ({status}) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button icon={MobileVerticalDotsMajor}  onClick={togglePopoverActive}>
        
    </Button>
  );

  return (
    <div>
    <Popover
      preferredPosition={'mostSpace'}
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <ActionList
        actionRole="menuitem"
        items={[{ content: "Edit Product" }, { content: "Amazon Lookup" }]}
      />
    </Popover></div>
  );
};

export default Pooper;
