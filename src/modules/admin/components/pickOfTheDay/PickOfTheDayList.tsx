import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
  FunctionField,
  useNotify,
  useUpdate,
} from "react-admin";

import { DeleteGamePredictionButton } from "./DeteleGamePredictionButton";

const StatusSelector = ({ record }: { record: any }) => {
  const notify = useNotify();
  const [update, { isLoading }] = useUpdate();
  const status = record?.status || "pending";
  const colorMap: Record<string, string> = {
    win: "#22c55e",
    loss: "#ef4444",
    pending: "rgb(245,158,11)",
    canceled: "#94a3b8",
  };
  const normalizedStatus = status === "win" || status === "loss" ? status : "";

  return (
    <select
      value={normalizedStatus}
      disabled={isLoading}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      aria-label="Result status"
      title={status}
      onChange={(e) => {
        update(
          "pick_of_the_day",
          { id: record.id, data: { status: e.target.value } },
          {
            onSuccess: () => notify("Status updated"),
            onError: () => notify("Failed to update status", { type: "error" }),
          },
        );
      }}
      style={{
        width: "100%",
        height: 30,
        borderRadius: 3,
        backgroundColor: colorMap[status] || "#94a3b8",
        color: "transparent",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "0 8px",
        appearance: "none",
        cursor: "pointer",
      }}
    >
      <option value="" disabled hidden />
      <option
        value="win"
        style={{ backgroundColor: "#22c55e", color: "#0b3d1a" }}
      >
        win
      </option>
      <option
        value="loss"
        style={{ backgroundColor: "#ef4444", color: "#3b0a0a" }}
      >
        loss
      </option>
    </select>
  );
};

export const PickOfTheDayList = () => (
  <List>
    <Datagrid
      bulkActionButtons={false}
      rowClick="show"
      sx={{
        "& .pickoday-game-col": {
          width: "24rem",
        },
        "& .pickoday-game-col > div": {
          width: "24rem",
        },
        "& .RaDatagrid-headerCell": {
          fontWeight: "bold",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
        "& .RaDatagrid-rowCell": {
          padding: "12px 8px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        },
        "& .RaDatagrid-row:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.03)",
        },
      }}
    >
      <TextField source="user_id" label="User" />
      <FunctionField
        label="Sport"
        render={(record: any) => (
          <span style={{ textTransform: "uppercase" }}>{record?.sport}</span>
        )}
      />
      <FunctionField
        label="Game"
        headerClassName="pickoday-game-col"
        cellClassName="pickoday-game-col"
        render={(record: any) =>
          record.game?.home_team ? (
            <div style={{ fontWeight: 500, display: "flex", gap: "4px" }}>
              <div>{record.game?.home_team}</div>
              <div>vs {record.game?.away_team}</div>
            </div>
          ) : (
            <div style={{ fontWeight: 500 }}>{record.game?.name}</div>
          )
        }
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
          const sport = String(record?.sport || "").toLowerCase();
          if (sport && sport !== "nba") {
            return <StatusSelector record={record} />;
          }
          const status = record?.status || "pending";
          const colorMap: Record<string, string> = {
            win: "#22c55e",
            loss: "#ef4444",
            pending: "#f59e0b",
            canceled: "#94a3b8",
          };
          const color = colorMap[status] || "#94a3b8";

          return (
            <span
              title={status}
              style={{
                display: "inline-block",
                width: "100%",
                height: 30,
                borderRadius: 3,
                backgroundColor: color,
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1)",
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
