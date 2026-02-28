export {
  convertAmericanToDecimal,
  convertAmericanToEuropean,
  convertEuropeanToAmerican,
  calcParlayOddsDecimal,
  makeId,
} from "./convertAmericanToDecimal";

export { getFetchError, handleFetchError } from "./error-handling";

export { formatOddsWithSign, formatSpread } from "./formatOdds";

export { getStatusColor } from "./status";

export { getTeamInfoByName } from "./team";

export { truncateText } from "./text";

export {
  convertUTCToLocal,
  formatDateWithoutConversion,
  formatTimeAmPmWithoutConversion,
  formatUtcToLocalDate,
  formatUtcToLocalTime,
  formatUtcToLocalTimeAmPm,
  convertUTCToLocalWithAmPm,
  isTimeInPast,
} from "./time";

export { cn } from "./helper";

export { formUrlQuery } from "./url";
