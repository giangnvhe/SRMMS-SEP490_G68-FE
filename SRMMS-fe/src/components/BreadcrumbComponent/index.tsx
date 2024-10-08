import { Breadcrumb } from "antd";

interface IProps {
  className?: string;
  onClick?: (e: MouseEvent) => void;
  items: [
    {
      title: string;
      href?: string;
    }
  ];
}

const BreadcrumbComponent = ({ items }: IProps) => {
  return <Breadcrumb items={items} />;
};

export default BreadcrumbComponent;
