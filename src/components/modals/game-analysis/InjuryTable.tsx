import { Badge } from '@/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';

const InjuryTable = () => {
  return (
    <div className="space-y-4">
      <h3 className="align-bottom text-lg font-semibold tracking-normal">
        Injury Report
      </h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Pos</TableHead>
            <TableHead>Injury</TableHead>
            <TableHead>EST. Return Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-surface-secondary">
            <TableCell>Deandre Ayton</TableCell>
            <TableCell>C</TableCell>
            <TableCell>Knee</TableCell>
            <TableCell>May 28</TableCell>
            <TableCell>
              <Badge
                className="w-full max-w-[85px] py-2 capitalize"
                variant={'red'}
              >
                Out
              </Badge>
            </TableCell>
          </TableRow>

          <TableRow className="bg-surface-secondary">
            <TableCell>Clint Capela</TableCell>
            <TableCell>C</TableCell>
            <TableCell>Hand</TableCell>
            <TableCell>May 29</TableCell>
            <TableCell>
              <Badge
                className="w-full max-w-[85px] py-2 capitalize"
                variant={'red'}
              >
                Out
              </Badge>
            </TableCell>
          </TableRow>

          <TableRow className="bg-surface-secondary">
            <TableCell>Ulrich Chomche</TableCell>
            <TableCell>C</TableCell>
            <TableCell>Knee</TableCell>
            <TableCell>July 28</TableCell>
            <TableCell>
              <Badge
                className="w-full max-w-[85px] py-2 capitalize"
                variant={'red'}
              >
                Out
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default InjuryTable;
