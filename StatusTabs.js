import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Badge } from "@shopify/polaris";
import { productOptions } from "../../../api/apiConstants";

const StatusTabs = ({selectedTab}) => {
  const [selected, setSelected] = useState(
    Number(sessionStorage.getItem("tab"))
  );
  const [count , setCount] = useState({'Not Listed' : 0});

  const handleTabChange = useCallback((selectedTabIndex) => {
    sessionStorage.setItem("tab", selectedTabIndex);
    setSelected(selectedTabIndex);
  }, []);
  
  useEffect(()=>{
    selectedTab(tabs[selected]?.id)
  },[selected])

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
          Not Listed <Badge status="new">{count['Not Listed']}</Badge>
        </span>
      ),
      panelID: "not-listed",
    },
    {
      id: "inActive",
      content: (
        <span>
          Inactive <Badge status="info">{count.Inactive}</Badge>
        </span>
      ),
      panelID: "inactive",
    },
    {
      id: "inComplete",
      content: (
        <span>
          Incomplete <Badge status="warning">{count.Incomplete}</Badge>
        </span>
      ),
      panelID: "incomplete",
    },
    {
      id: "active",
      content: (
        <span>
          Active <Badge status="success">{count.Active}</Badge>
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
          let t = {'Not Listed' : 0};
          res.data.map((item) => { 
            if(item._id===null || item._id==='Not Listed'){
              t['Not Listed']+= item.total
            }
            else t[item._id] = item.total
          });
          setCount({...t});
        } else alert(res.message);
      });
  }, []);
  return (
    <Tabs fitted tabs={tabs} selected={selected} onSelect={handleTabChange} />
  );
};

export default StatusTabs;
