import React, { useCallback, useEffect, useState } from "react";
import { Card, Tabs, Badge, Frame, TextField, Button } from "@shopify/polaris";
import {
  getRefineProducts,
  productHeaders,
  productOptions,
} from "../../api/apiConstants";
import ProTable from "./product-table";

const Listing = () => {
  const [selected, setSelected] = useState(
    Number(sessionStorage.getItem("tab"))
  );
  const [notListed, setNotListed] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => {
    sessionStorage.setItem("tab", selectedTabIndex);
    setSelected(selectedTabIndex);
  }, []);

  const tabs = [
    {
      id: "all",
      content: <span>All</span>,
      accessibilityLabel: "All customers",
      panelID: "all",
    },
    {
      id: "notListed",
      content: (
        <span>
          Not Listed <Badge status="new">{notListed}</Badge>
        </span>
      ),
      panelID: "not-listed",
    },
    {
      id: "inActive",
      content: (
        <span>
          Inactive <Badge status="info">0</Badge>
        </span>
      ),
      panelID: "inactive",
    },
    {
      id: "inComplete",
      content: (
        <span>
          Incomplete <Badge status="warning">0</Badge>
        </span>
      ),
      panelID: "incomplete",
    },
    {
      id: "active",
      content: (
        <span>
          Active <Badge status="success">0</Badge>
        </span>
      ),
      panelID: "active",
    },
    {
      id: "error",
      content: <span>Error</span>,
      panelID: "error",
    },
  ];

  useEffect(() => {
    fetch(
      "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount",
      productOptions
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let t = 0;
          res.data.map((item) => (t += item.total));
          setNotListed(t);
        } else alert(res.message);
      });
  }, []);

  const [serText, setSerText] = useState("");

  return (
    <Frame>
      <Card>
        <Tabs fitted tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>
            <Card.Section>
              <TextField
                value={serText}
                onChange={(value) => setSerText(value)}
                connectedRight={<Button>More Filters</Button>}
              />
              <Button>Admin Action</Button>
            </Card.Section>
          </Card.Section>
          <Card.Section>
            <ProTable currentTab={tabs[selected]?.id} />
          </Card.Section>
        </Tabs>
      </Card>
    </Frame>
  );
};

export default Listing;
