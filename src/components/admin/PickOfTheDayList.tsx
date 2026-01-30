import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
  FunctionField,
} from 'react-admin';

import { DeleteGamePredictionButton } from './DeteleGamePredictionButton';

export const PickOfTheDayList = () => (
  <List>
    <Datagrid
      bulkActionButtons={false}
      rowClick="show"
      sx={{
        '& .pickoday-game-col': {
          width: '24rem',
        },
        '& .pickoday-game-col > div': {
          width: '24rem',
        },
        '& .RaDatagrid-headerCell': {
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '& .RaDatagrid-rowCell': {
          padding: '12px 8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
        '& .RaDatagrid-row:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
        },
      }}
    >
      <TextField source="user_id" label="User" />
      <FunctionField
        label="Sport"
        render={(record: any) => (
          <span style={{ textTransform: 'uppercase' }}>{record?.sport}</span>
        )}
      />
      <FunctionField
        label="Game"
        headerClassName="pickoday-game-col"
        cellClassName="pickoday-game-col"
        render={(record: any) => (
          record.game?.home_team ? (
            <div style={{ fontWeight: 500, display: 'flex', gap: '4px' }}>
              <div>{record.game?.home_team}</div>
              <div>vs {record.game?.away_team}</div>
            </div>
          ) : (
            <div style={{ fontWeight: 500 }}>{record.game?.name}</div>
          )
        )}
      />
      <FunctionField
        label="Start Time"
        render={(record: any) =>
          record.game?.start_time ? (
            <DateField source="game.start_time" showTime />
          ) : null
        }
      />
      <FunctionField
        label="Result"
        render={(record: any) => {
          const status = record?.status || 'pending';
          const colorMap: Record<string, string> = {
            win: '#22c55e',
            loss: '#ef4444',
            pending: '#f59e0b',
            canceled: '#94a3b8',
          };
          const color = colorMap[status] || '#94a3b8';

          return (
            <span
              title={status}
              style={{
                display: 'inline-block',
                width: '100%',
                height: 30,
                borderRadius: 3,
                backgroundColor: color,
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
            />
          );
        }}
      />
      <EditButton />
      <DeleteGamePredictionButton />
    </Datagrid>
  </List>
);
