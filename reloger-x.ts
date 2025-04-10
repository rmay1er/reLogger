import chalk from "chalk";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

type LogLevels = Record<string, keyof typeof chalk>;

/**
 * A customizable logging utility that supports dynamic log levels and colored output.
 *
 * @class reLogger
 * @example
 * const logger = new reLogger("blue", {
 *   info: "blue",
 *   error: "red",
 *   warn: "yellow",
 * });
 *
 * logger.info("This is an info message");
 * logger.error("This is an error message");
 * logger.warn("This is a warning message");
 */
class reLogger<Levels extends LogLevels> {
  private chalk: typeof chalk;
  private timezone: string;
  private getTimeStamp: () => string;
  private mainColor: keyof typeof chalk;

  /**
   * Creates an instance of reLogger.
   *
   * @param {keyof typeof chalk} [mainColor="green"] - The main color for the timestamp in the log output.
   * @param {Levels} [customLevels={}] - An object defining custom log levels and their corresponding colors.
   * @example
   * const logger = new reLogger("cyan", {
   *   debug: "gray",
   *   success: "green",
   * });
   */
  constructor(mainColor: keyof typeof chalk, customLevels: Levels) {
    this.chalk = chalk;
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.mainColor = mainColor;

    this.getTimeStamp = () => {
      return dayjs().tz(this.timezone).format("DD.MM.YYYY | HH:mm:ss");
    };

    const handler: ProxyHandler<this> = {
      get: (target, prop: string) => {
        if (prop in target) {
          return target[prop as keyof this];
        }

        if (prop in customLevels) {
          return (message: string, ...args: any[]) => {
            const timestamp = this.getTimeStamp();
            const levelUpperCase = prop.toUpperCase();
            const colorName = customLevels[prop as keyof Levels];

            const coloredTimestamp = (this.chalk as any)[this.mainColor](
              `[${timestamp}]`,
            );
            const coloredLevel = (this.chalk as any)[colorName](levelUpperCase);
            const output = `${coloredTimestamp} ${coloredLevel} : ${message}`;

            console.log(output, ...args);
            return output;
          };
        }

        return undefined;
      },
    };

    return new Proxy(this, handler);
  }
}

export default reLogger;
