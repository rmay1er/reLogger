import chalk from "chalk";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

type LogMethod = (message: string, ...args: any[]) => string;

/**
 * A customizable logging utility that supports dynamic log levels and colored output.
 */
class reLogger {
  private readonly chalk: typeof chalk;
  private readonly timezone: string;
  private readonly getTimeStamp: () => string;
  private readonly mainColor: keyof typeof chalk;
  private readonly customLevels: Record<string, keyof typeof chalk>;

  // Динамические методы будут добавляться сюда
  [key: string]: LogMethod | any;

  constructor(
    mainColor: keyof typeof chalk = "green",
    customLevels: Record<string, keyof typeof chalk> = {},
  ) {
    this.chalk = chalk;
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.mainColor = mainColor;
    this.customLevels = customLevels;

    this.getTimeStamp = () => {
      return dayjs().tz(this.timezone).format("DD.MM.YYYY | HH:mm:ss");
    };

    // Создаем методы для каждого кастомного уровня
    for (const level in customLevels) {
      this[level] = this.createLogMethod(level);
    }
  }

  private createLogMethod(level: string): LogMethod {
    return (message: string, ...args: any[]) => {
      const timestamp = this.getTimeStamp();
      const levelUpperCase = level.toUpperCase();
      const colorName = this.customLevels[level];

      const coloredTimestamp = (this.chalk as any)[this.mainColor](
        `[${timestamp}]`,
      );
      const coloredLevel = (this.chalk as any)[colorName](levelUpperCase);
      const output = `${coloredTimestamp} ${coloredLevel} : ${message}`;

      console.log(output, ...args);
      return output;
    };
  }
}

export default reLogger;
