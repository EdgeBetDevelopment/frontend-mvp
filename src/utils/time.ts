import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const convertUTCToLocal = (utcTime?: string) => {
  if (!utcTime) return dayjs().format('MM/DD/YYYY HH:mm');
  return dayjs.utc(utcTime).local().format('MM/DD/YYYY HH:mm');
};

export const formatUtcToLocalDate = (utcTime?: string) => {
  if (!utcTime) return dayjs().format('MM/DD/YYYY');
  return dayjs.utc(utcTime).local().format('MM/DD/YYYY');
};

export const formatUtcToLocalTime = (utcTime?: string) => {
  if (!utcTime) return dayjs().format('HH:mm');
  return dayjs.utc(utcTime).local().format('HH:mm');
};

export const isTimeInPast = (utcTime?: string) => {
  if (!utcTime) return false;
  return dayjs.utc(utcTime).isBefore(dayjs());
};

export const formatUtcToLocalTimeAmPm = (utcTime?: string) => {
  if (!utcTime) return dayjs().format('hh:mm A');
  return dayjs.utc(utcTime).local().format('hh:mm A');
};

export const convertUTCToLocalWithAmPm = (utcTime?: string) => {
  if (!utcTime) return dayjs().format('MM/DD/YYYY hh:mm A');
  return dayjs.utc(utcTime).local().format('MM/DD/YYYY hh:mm A');
};
