### Assumptions:

-   Output is printed to stdout after all input is consumed
-   When input is fed from stdin, it's parsed line by line

### Input

I read the file line by line instead of wholly to allow inputs of any size to be read.

The program supports `-f` parameter followed by `path/to/file` to parse the content of a file instead of stdin

### How to run:

Node version: `14.15.3`
TS version: `4.1.3`

-   `node dist/main.js -f data/input` or `npm run startFile` - reads input from a file (preset file in case of npm command)
-   `node dist/main.js` - reads input from stdin
-   `cat data/input | node dist/main.js` feeds file content data to stdin (bypassing `-f` mode)

### Error codes mapping:

`1` - missing file path when specifying `-f` parameter
