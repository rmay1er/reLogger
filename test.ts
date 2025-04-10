// Example usage of reLogger with explanations:

// 1. First import the logger
import reLogger from "./relogger-x";

// 2. Create a logger instance with:
//    - "cyan" as the main timestamp color
//    - Custom log levels with their colors
const logger = new reLogger("cyan", {
  info: "blue", // info level will be blue
  error: "red", // error level will be red
  warn: "yellow", // warn level will be yellow
  debug: "gray", // debug level will be gray
  success: "green", // success level will be green
});

// 3. Using the logger:
logger.info("System initialized"); // Blue info message
logger.warn("Disk space low"); // Yellow warning
logger.error("Failed to connect"); // Red error
logger.debug("User data loaded"); // Gray debug message
logger.success("Operation complete"); // Green success message

// 4. Additional format examples:
const sampleArray = [1, 2, 3];
const sampleObject = { name: "John", age: 30 };
const sampleJsonString = '{"id": 1, "value": "test"}';

// Spread operator with array
logger.debug("Array spread:", ...sampleArray);

// Object logging
logger.info("Object:", sampleObject);

// JSON string parsing and logging
try {
  const parsedJson = JSON.parse(sampleJsonString);
  logger.success("Parsed JSON:", parsedJson);
} catch (e) {
  logger.error("JSON parse error:", e);
}

// JSON.stringify example
logger.debug("Stringified object:", JSON.stringify(sampleObject, null, 2));

// Each log message will show:
// - Cyan timestamp in format "DD.MM.YYYY | HH:mm:ss"
// - Colored log level (based on config)
// - The message itself
// - Any additional arguments passed will be logged too

// Example output would look like:
// [12.05.2023 | 14:30:45] INFO : System initialized
// [12.05.2023 | 14:30:46] WARN : Disk space low
// [12.05.2023 | 14:30:47] ERROR : Failed to connect
// [12.05.2023 | 14:30:48] DEBUG : Array spread: 1 2 3
// [12.05.2023 | 14:30:49] INFO : Object: { name: 'John', age: 30 }
// [12.05.2023 | 14:30:50] SUCCESS : Parsed JSON: { id: 1, value: 'test' }
// [12.05.2023 | 14:30:51] DEBUG : Stringified object: {
//   "name": "John",
//   "age": 30
// }
