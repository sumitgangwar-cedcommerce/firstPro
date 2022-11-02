// import { Table } from "antd";
// import React, { useEffect, useState } from "react";
// import { getRefineProducts, productOptions } from "../../api/apiConstants";
// import { columns } from "./product-table/columns";
// import { Frame } from "@shopify/polaris";
// import { tableOnRow } from "./product-table/tableOnRow";

// const ProductTable = ({ currentTab }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     setLoading(true);
//     fetch(getRefineProducts[currentTab], productOptions)
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.success) {
//           console.log(res);
//           setLoading(false);
//           // res.data.rows.map((item) => {
//           //   item.key = item.container_id;
//           //   item.template = item.profile ? item.profile.profile_name : "N/A";
//           //   let t = 0;
//           //   item.items.map((i) => (t += i.quantity ? Number(i.quantity) : 0));
//           //   item.quantity = t;
//           // });
//           setData(res.data.rows);
//         } else alert(res.message);
//       });
//   }, [currentTab]);

//   const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//       console.log(
//         `selectedRowKeys: ${selectedRowKeys}`,
//         "selectedRows: ",
//         selectedRows
//       );
//     },
//     onSelect: (record, selected, selectedRows) => {
//       console.log(record, selected, selectedRows);
//     },
//     onSelectAll: (selected, selectedRows, changeRows) => {
//       console.log(selected, selectedRows, changeRows);
//     },
//     reenderCell: () => <p>+</p>,
//   };

  

//   return (
//     <Table
//       dataSource={data}
//       rowSelection={{
//         ...rowSelection,
//       }}
//       expandable={{
//         expandIcon: ({ expanded, onExpand, record }) =>
//           expanded ? (
//             record.type === "variation" ? (
//               <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
//             ) : null
//           ) : record.type === "variation" ? (
//             <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
//           ) : null,

//         rowExpandable: (record) => record.type === "variation",
//         expandedRowRender: (record) => {
//           console.log(record);
//           let dataSource = record.items.filter(
//             (item) => item.sku !== record.container_id
//           );
//           return (
//             <Table
//               dataSource={dataSource}
//               columns={columns.filter((item) => item.key !== "template")}
//               rowSelection={{ ...rowSelection }}
//               pagination={false}
//               size={"small"}
//               scroll={{ x: true }}
              
//             />
//           );
//         },
//       }}
//       columns={columns}
//       size={"small"}
//       scroll={{ x: true }}
//       loading={loading}
//       onRow={tableOnRow('main')}
//     />
//   );
// };
// export default ProductTable;
