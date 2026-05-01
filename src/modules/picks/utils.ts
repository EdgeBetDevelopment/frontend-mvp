import { convertUTCToLocalWithAmPm } from '@/shared/utils/time';

export const formatPostedAt = (value?: string) => {
  if (!value) {
    return "";
  }
  return convertUTCToLocalWithAmPm(value);
};
