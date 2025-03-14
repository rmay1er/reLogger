# reLogger

`reLogger` is a customizable logging utility for Node.js that supports dynamic log levels and colored output using `chalk`. It allows you to define custom log levels and their corresponding colors, making it easy to create a logging system tailored to your needs.

## Installation

You can install `reLogger` via npm:

```bash
npm install relogger-x
```

## Usage

### Basic Usage

First, import the `reLogger` class and create an instance with your desired main color and custom log levels.

```typescript
import reLogger from 'relogger';

const logger = new reLogger("blue", {
  info: "blue",
  error: "red",
  warn: "yellow",
});

logger.info("This is an info message");
logger.error("This is an error message");
logger.warn("This is a warning message");
```

### Custom Log Levels

You can define custom log levels and their corresponding colors when creating an instance of `reLogger`.

```typescript
const logger = new reLogger("cyan", {
  debug: "gray",
  success: "green",
});

logger.debug("Debugging information");
logger.success("Operation successful");
```

### Timestamp and Timezone

`reLogger` automatically uses the system's timezone to generate timestamps. The timestamp is displayed in the format `[DD.MM.YYYY | HH:mm:ss]`.

## API

### `new reLogger(mainColor, customLevels)`

Creates a new instance of `reLogger`.

- `mainColor`: The main color for the timestamp in the log output.
- `customLevels`: An object defining custom log levels and their corresponding colors.

### Dynamic Log Methods

For each log level defined in `customLevels`, a corresponding method is dynamically created on the `reLogger` instance. These methods take a message and optional additional arguments, and return the formatted log output.

```typescript
logger.customLevel("This is a custom level message", additionalArg1, additionalArg2);
```

## Example

Here is a complete example demonstrating the usage of `reLogger`:

```typescript
import reLogger from 'relogger';

const logger = new reLogger("magenta", {
  info: "blue",
  error: "red",
  warn: "yellow",
  debug: "gray",
  success: "green",
});

logger.info("This is an info message");
logger.error("This is an error message");
logger.warn("This is a warning message");
logger.debug("Debugging information");
logger.success("Operation successful");
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on the [GitHub repository](https://github.com/rmay1er/relogger).

## License

This project is licensed under the MIT License.

---

Enjoy logging with `reLogger`! If you have any questions or feedback, feel free to reach out.
