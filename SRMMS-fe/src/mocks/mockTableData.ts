import { TableData } from "~/services/table";
export const mockTableData: TableData[] = [
  {
    tableId: 1,
    tableName: "Table 1",
    statusName: "Available",
    statusId: 1,
    bookingId: null,
    tableOfPeople: null,
  },
  {
    tableId: 2,
    tableName: "Table 2",
    statusName: "Occupied",
    statusId: 2,
    bookingId: 101,
    tableOfPeople: 4,
  },
  {
    tableId: 3,
    tableName: "Table 3",
    statusName: "Available",
    statusId: 1,
    bookingId: null,
    tableOfPeople: null,
  },
  {
    tableId: 4,
    tableName: "Table 4",
    statusName: "Reserved",
    statusId: 3,
    bookingId: 102,
    tableOfPeople: 6,
  },
  {
    tableId: 5,
    tableName: "Table 5",
    statusName: "Occupied",
    statusId: 2,
    bookingId: 103,
    tableOfPeople: 2,
  },
  {
    tableId: 6,
    tableName: "Table 6",
    statusName: "Available",
    statusId: 1,
    bookingId: null,
    tableOfPeople: null,
  },
  {
    tableId: 7,
    tableName: "Table 7",
    statusName: "Reserved",
    statusId: 3,
    bookingId: 104,
    tableOfPeople: 8,
  },
];

/**
 * 1 → "Available".
 * 2 → "Occupied".
 * 3 → "Reserved".
 */
