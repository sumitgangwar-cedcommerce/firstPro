import { TextField, Select, Filters } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { filterHeaders, filterUrl, productOptions } from "../api/apiConstants";

function ResourceListFilters() {
  const [taggedWith, setTaggedWith] = useState(null);
  const [queryValue, setQueryValue] = useState(null);

  const [filterData, setFilterData] = useState({
    inventory: "",
    sku: "",
    tags: "",
    product_type: "",
    vendor: "",
    template: "",
    status: "",
    attribute: "",
    activity: "",
    type: "",
  });
  const inventoryOptions = [
    {label : 'Equals' , value : 'equals'},
    {label : 'Not Equals' , value : 'not equals'},
    {label : 'Greater Than or Equals to' , value : 'greater than or equals to'},
    {label : 'Less Than or Equals to' , value : 'less than or equals to'},
  ]

  const skuOptions = [
    {label : 'Equals' , value : 'equals'},
    {label : 'Not Equals' , value : 'not equals'},
    {label : 'Contains' , value : 'contains'},
    {label : 'Does not Contains' , value : 'does not contains'},
    {label : 'Ends With' , value : 'starts with'},
    {label : 'Ends With' , value : 'ends with'},
  ]
  const vendorOptions = [
    {label : 'Equals' , value : 'equals'},
    {label : 'Not Equals' , value : 'not equals'},
  ]

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);

  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const handelFilterChange = (data, value) => {
    console.log(data);
    filterData[data] = value;
    setFilterData({ ...filterData });
  };

  const options = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  const filters = [
    {
      key: "inventory",
      label: "Inventory",
      filter: (
        <div>
          <Select options={inventoryOptions} />
          <TextField
            key='inventory'
            type="number"
            value={filterData.inventory}
            onChange={(value) => handelFilterChange("inventory", value)}
          />
        </div>
      ),
    },
    {
      key: "sku",
      label: "SKU",
      filter: (
        <div>
          <Select options={skuOptions} />
          <TextField
            key='sku'
            value={filterData.sku}
            onChange={(value) => handelFilterChange("sku", value)}
          />
        </div>
      ),
    },
    {
      key: "tags",
      label: "Tags",
      filter: (
        <div>
          <TextField
            key='tags'
            value={filterData.tags}
            onChange={(value) => handelFilterChange("tags", value)}
          />
        </div>
      ),
    },
    {
      key: "Product Type",
      label: "Product Type",
      filter: (
        <div>
          <TextField
            key='pro_type'
            value={filterData.product_type}
            onChange={(value) => handelFilterChange("product_type", value)}
          />
        </div>
      ),
    },
    {
      key: "Vendor",
      label: "Vendor",
      filter: (
        <div>
          <Select options={vendorOptions} />
          <TextField
            key='vendor'
            value={filterData.vendor}
            onChange={(value) => handelFilterChange("vendor", value)}
          />
        </div>
      ),
    },
    {
      key: "Template Name",
      label: "Template Name",
      filter: (
        <div>
          <TextField
            value={filterData.template}
            onChange={(value) => handelFilterChange("template", value)}
          />
        </div>
      ),
    },
    {
      key: "Product Status",
      label: "Product Status",
      filter: (
        <div>
          <TextField
            value={filterData.status}
            onChange={(value) => handelFilterChange("status", value)}
          />
        </div>
      ),
    },
    {
      key: "Variant Attributes",
      label: "Variant Attributes",
      filter: (
        <div>
          <TextField
            value={filterData.attribute}
            onChange={(value) => handelFilterChange("attribute", value)}
          />
        </div>
      ),
    },
    {
      key: "Activity",
      label: "Activity",
      filter: (
        <div>
          <TextField
            value={filterData.activity}
            onChange={(value) => handelFilterChange("activity", value)}
          />
        </div>
      ),
    },
    {
      key: "Type",
      label: "Type",
      filter: (
        <div>
          <TextField
            value={filterData.type}
            onChange={(value) => handelFilterChange("type", value)}
          />
        </div>
      ),
    },
  ];

  useEffect(()=>{
    console.log('dsfgdfs')
    fetch(filterUrl , filterHeaders)
    .then(res => res.json())
    .then(res => console.log(res))
  })

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: "taggedWith",
          label: disambiguateLabel("taggedWith", taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  return (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
      hideQueryField
    ></Filters>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith":
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}

export default ResourceListFilters;
