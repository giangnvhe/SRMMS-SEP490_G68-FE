import { Card, Col, Row } from "antd";
import { TableData } from "~/services/table";
import SmallTable from "../SmallTable";
import MediumTable from "../MediumTable";
import LargeTable from "../LargeTable";
import { getStatusColor } from "../const";

interface IProps {
  tables: TableData[];
  onSelect: (tableId: number) => void;
}

const ListTable = ({ tables, onSelect }: IProps) => {
  return (
    <Row gutter={[16, 16]}>
      {tables.length > 0 ? (
        tables.map((table) => (
          <Col xs={24} sm={12} md={8} key={table.tableId}>
            <Card
              onClick={() => onSelect(table.tableId)}
              className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200 ease-in-out cursor-pointer relative h-[200px]"
            >
              <div>
                {table.tableOfPeople != null && table.tableOfPeople <= 2 && (
                  <SmallTable table={table} />
                )}
                {table.tableOfPeople != null &&
                  table.tableOfPeople > 2 &&
                  table.tableOfPeople <= 4 && <SmallTable table={table} />}
                {table.tableOfPeople != null &&
                  table.tableOfPeople > 4 &&
                  table.tableOfPeople <= 6 && <MediumTable table={table} />}
                {table.tableOfPeople != null && table.tableOfPeople > 6 && (
                  <LargeTable table={table} />
                )}
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-2"
                style={{
                  backgroundColor: getStatusColor(table.statusName),
                }}
              />
            </Card>
          </Col>
        ))
      ) : (
        <div className="text-center w-full text-gray-500 text-lg">
          No tables available
        </div>
      )}
    </Row>
  );
};

export default ListTable;
