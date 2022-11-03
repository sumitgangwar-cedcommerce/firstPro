import { Autocomplete, Button, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useState, useCallback, useMemo, useEffect } from "react";
import { productOptions, proSearch } from "../api/apiConstants";
import classes from "./searchField.module.css";

function SearchField({setFilter}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const updateText = (value) => {
    setInputValue(value);
  };

  console.log(inputValue)

  const updateSelection = (data)=>{
    console.log('data==>>',data)
    setSelectedOptions(data)
    // setInputValue(data[0].title)
    setFilter(prev => [...prev , {container_id : data[0].container_id}])
  }

  const changeOptions = () => {
    fetch(proSearch(inputValue), productOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let t = res.data.map((item) => {
            return {
              value: item,
              key : item.items[0].sku,
              label: (
                <div key={item.items[0].sku} className={classes.label}>
                  <div>
                    <img src={item.items[0].main_image} alt="#" />
                  </div>
                  <div>
                    <p>{item.items[0].title}</p>
                    <p>
                      {item.items[0].sku} - {item.items[0].barcode}
                    </p>
                  </div>
                </div>
              ),
            };
          });
          setOptions(t);
        } else alert(res.message);
      });
  };

  useEffect(() => {
    let t = "";
    if (inputValue !== "") t = setTimeout(changeOptions, 500);

    return () => {
      clearTimeout(t);
    };
  }, [inputValue]);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );

  return (
    <div style={{ height: "225px" }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}

export default SearchField;
