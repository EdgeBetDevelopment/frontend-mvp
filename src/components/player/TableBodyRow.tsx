import { TableCell, TableRow } from '../ui/table';

const TableBodyRow: React.FC<{
  data: {
    id: number;
    name: string;
    wins: string;
    draws: string;
    losses: string;
    description: string;
    total_score: string;
  };
}> = ({ data }) => {
  return (
    <TableRow className="bottom-line" key={data.id}>
      <TableCell className="text-[14px]">{data.name}</TableCell>
      <TableCell className="text-[14px] text-[#34D399]">{data.wins}</TableCell>
      <TableCell className="text-[14px] text-[#FF8808]">{data.draws}</TableCell>
      <TableCell className="text-[14px] text-[#DC2626]">
        {data.losses}
      </TableCell>
      <TableCell className="truncate-text h-[68px] min-h-[68px] py-0">
        {data.description}
      </TableCell>
      <TableCell>
        <div className="w-[85px] rounded-[8px] bg-[#33758780] px-6 py-1">
          {data.total_score}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableBodyRow;
