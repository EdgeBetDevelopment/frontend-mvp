import {
  BooleanField,
  Datagrid,
  DateField,
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
      <TextField source="id" label="ID" sx={{ fontWeight: 600 }} />
      <TextField source="user_id" label="User" />
      <FunctionField
        label="Matchup"
        render={(record: any) => (
          <div style={{ fontWeight: 500 }}>
            <div>{record.game_prediction?.game?.home_team}</div>
            <div
              style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9em' }}
            >
              vs {record.game_prediction?.game?.away_team}
            </div>
          </div>
        )}
      />
      <FunctionField
        label="Odds"
        render={(record: any) => (
          <div style={{ fontSize: '0.95em' }}>
            <div>Home: {record.game_prediction?.odds_home}</div>
            <div style={{ opacity: 0.7 }}>
              Away: {record.game_prediction?.odds_away}
            </div>
          </div>
        )}
      />
      <FunctionField
        label="Win Probability"
        render={(record: any) => (
          <div style={{ fontSize: '0.95em' }}>
            <div>Home: {record.game_prediction?.win_probability_home}%</div>
            <div style={{ opacity: 0.7 }}>
              Away: {record.game_prediction?.win_probability_away}%
            </div>
          </div>
        )}
      />
      <TextField
        source="game_prediction.favorite_team"
        label="Favorite"
        sx={{ fontWeight: 500, color: '#60a5fa' }}
      />
      <TextField
        source="game_prediction.predicted_winner"
        label="Winner"
        sx={{ fontWeight: 600, color: '#34d399' }}
      />
      <TextField
        source="game_prediction.analysis.overview"
        label="Overview"
        sx={{
          maxWidth: '300px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      />
      <BooleanField source="is_premium" label="Premium" />
      <DateField source="updated_at" label="Updated" showTime />
      <DeleteGamePredictionButton />
    </Datagrid>
  </List>
);
