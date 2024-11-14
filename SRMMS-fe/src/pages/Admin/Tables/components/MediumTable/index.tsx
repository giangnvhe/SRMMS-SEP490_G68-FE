import { Typography } from 'antd';
import { TableData } from '~/services/table';

interface IProps {
  table: TableData; 
}


const MediumTable = ({table} : IProps)  => {
  return (
    <div
      style={{
        position: 'relative',
        width: 128, // Equivalent to Tailwind's w-32
        height: 100, // Equivalent to Tailwind's h-32
      }}
    >
      {/* Table Surface */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#e0e0e0', // grey.200
          borderRadius: '8px', // rounded-lg
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
            {table.tableName}
          </Typography.Title>
          {/* {table.orderId && (
            <Typography.Title level={5} style={{ textDecoration: 'underline' }}>
              #{mockData[0].orderId}
            </Typography.Title>
          )} */}
        </div>
      </div>

      {/* Chairs */}
      {/* Top Center Chair */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -150%)',
          width: 70,
          height: 8,
          backgroundColor: '#d0d0d0', // grey.300
          borderRadius: '4px', // rounded
        }}
      />
      
      {/* Bottom Center Chair */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 150%)',
          width: 70,
          height: 8,
          backgroundColor: '#d0d0d0',
          borderRadius: '4px',
        }}
      />

      {/* Left Center Chair */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translate(-150%, -50%)',
          width: 8,
          height: 70,
          backgroundColor: '#d0d0d0',
          borderRadius: '4px',
        }}
      />

      {/* Right Center Chair */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translate(150%, -50%)',
          width: 8,
          height: 70,
          backgroundColor: '#d0d0d0',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default MediumTable;
