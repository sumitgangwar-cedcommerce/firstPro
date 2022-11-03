import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  Tabs,
  Badge,
  Frame,
  TextField,
  Button,
  Stack,
} from "@shopify/polaris";
import ProTable from "./product-table";
import StatusTabs from "./product-table/StatusTabs";
import SearchField from "../SearchField";
import Pooper from "../../utils/Pooper";
import ResourceListFilters from "../Filter";

const Listing = () => {
  const [serText, setSerText] = useState("");
  const [stab, setStab] = useState(Number(sessionStorage.getItem("tab")));
  const [filter, setFilter] = useState([]);

  const selectedTab = (data) => setStab(data);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <Frame>
      <Card>
        <Card.Section>
          <StatusTabs selectedTab={selectedTab} />
        </Card.Section>
        <Card.Section>
          <Stack>
            <SearchField setFilter={setFilter} />
            <ResourceListFilters />
            {/* <Button>More Filters</Button> */}
            <Pooper />
            <Button>Sync Status</Button>
            <Button>Amazon Lookup</Button>
            <Button>Bulk Updates</Button>
          </Stack>
        </Card.Section>
        <Card.Section>
          <ProTable currentTab={stab} />
        </Card.Section>
      </Card>
    </Frame>
  );
};

export default Listing;
