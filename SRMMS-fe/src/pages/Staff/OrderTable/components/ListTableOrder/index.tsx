import { Card, Col, Row } from "antd";
import { getStatusColor } from "~/pages/Admin/Tables/components/const";
import LargeTable from "~/pages/Admin/Tables/components/LargeTable";
import MediumTable from "~/pages/Admin/Tables/components/MediumTable";
import SmallTable from "~/pages/Admin/Tables/components/SmallTable";
import { TableData } from "~/services/table";

interface IProps {
  table: TableData[];
  onSelect: (tableName: string) => void;
}

const ListTableOrder = ({ table, onSelect }: IProps) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {table.length > 0 ? (
          table.map((table) => (
            <Col xs={24} sm={12} md={8} lg={6} key={table.tableId}>
              <Card
                onClick={() => onSelect(table.tableName)}
                className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200 ease-in-out cursor-pointer relative h-[200px]"
              >
                <div>
                  {table.tableOfPeople != null && table.tableOfPeople <= 2 && (
                    <SmallTable table={table} />
                  )}
                  {table.tableOfPeople != null &&
                    table.tableOfPeople > 2 &&
                    table.tableOfPeople <= 4 && <MediumTable table={table} />}
                  {table.tableOfPeople != null &&
                    table.tableOfPeople > 4 &&
                    table.tableOfPeople <= 6 && <LargeTable table={table} />}
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
    </div>
  );
};

export default ListTableOrder;
