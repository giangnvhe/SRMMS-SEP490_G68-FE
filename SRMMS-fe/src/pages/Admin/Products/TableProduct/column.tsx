import { TableColumnsType } from "antd";

export interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }  

function UseColumn() {

    const columns: TableColumnsType<DataType> = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
    ];
    
    return columns;
}

export default UseColumn;
