import {  Image } from "antd";
import Pooper from "../../../utils/Pooper";
import { Badge} from "@shopify/polaris";

const badges = {
  Inactive: "info",
  error: "critical",
  active: "success",
  "Not Listed": "new",
  incomplete: "warning",
};

const columns = [
  {
    title: "Image",
    dataIndex: "main_image",
    render: (src) => <Image src={src} alt="#" width={50} />,
    key: "image",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Product Details",
    key: "Product Details",
    dataIndex : 'description',
    render: (record) => {
        return (
            <>
            {
               Object.entries(record).map( item =>( <p><b>{item[0]} : </b>{item[1]}</p>))
            }
            </>
        )
    }
  },
  {
    title: "Template",
    dataIndex: "template",
    key: "template",
  },
  {
    title: "Inventory",
    dataIndex: "quantity",
    key: "Inventory",
  },
  {
    title: "Amazon Status",
    key: "Amazon Status",
    dataIndex : 'status',
    render: (record) => {
      return <p>{record}</p>
    }
  },
  {
    title: "Activity",
    key: "Activity",
    render: () => <p>--</p>,
  },
  {
    title: "Actions",
    key: "Actions",
    render: () => <Pooper />,
  },
];

export default columns
