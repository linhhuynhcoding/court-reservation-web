import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const toGMT7 = (utcString: string, format = 'YYYY-MM-DD HH:mm:ss') =>
  dayjs.utc(utcString).tz('Asia/Bangkok').format(format);
