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

  // Используем дженерик для динамических методов
  [key: string]: ((message: string, ...args: any[]) => string) | any;

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

    Object.entries(customLevels).forEach(([levelName, colorName]) => {
      /**
       * Dynamically creates a logging method for the specified log level.
       *
       * @param {string} message - The log message.
       * @param {...any} args - Additional arguments to log.
       * @returns {string} The formatted log output.
       * @example
       * logger.debug("Debugging information");
       */
      this[levelName] = (message: string, ...args: any[]) => {
        const timestamp = this.getTimeStamp();
        const levelUpperCase = levelName.toUpperCase();

        const coloredTimestamp = (this.chalk as any)[this.mainColor](
          `[${timestamp}]`,
        );
        const coloredLevel = (this.chalk as any)[colorName](levelUpperCase);
        const output = `${coloredTimestamp} ${coloredLevel} : ${message}`;

        console.log(output, ...args);
        return output;
      };
    });
  }
}

export default reLogger;
