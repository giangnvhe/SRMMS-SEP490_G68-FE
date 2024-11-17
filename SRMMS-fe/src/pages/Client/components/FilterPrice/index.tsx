import { Input, Row, Col } from "antd";

interface IProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

const FilterPrice = ({
  minPrice,
  maxPrice,
  onPriceChange,
  onMaxPriceChange,
}: IProps) => {
  return (
    <div className="mb-6 w-full max-w-md flex gap-2 mt-2">
      <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
        GIá:{" "}
      </h3>
      <Row gutter={[12, 12]} className="flex items-center">
        <Col xs={10} sm={8} className="w-full">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
        </Col>
        <Col xs={4} sm={2} className="text-center">
          <span className="text-sm">~</span>
        </Col>
        <Col xs={10} sm={8} className="w-full">
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FilterPrice;
