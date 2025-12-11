import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// 全局配置dayjs
dayjs.locale("zh-cn");
dayjs.extend(utc);
dayjs.extend(timezone);

// 设置默认时区为北京时间（避免服务器和客户端时区不一致）
dayjs.tz.setDefault("Asia/Shanghai");

// 导出格式化函数
export const formatDate = (dateString: string, format: string = "YYYY年MM月DD日"): string => {
  try {
    // 使用UTC时间确保服务器端和客户端结果一致
    return dayjs.utc(dateString).format(format);
  } catch {
    return dateString;
  }
};

// 导出dayjs实例供特殊需求使用
export { dayjs };
