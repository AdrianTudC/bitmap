### Problem Description

The program takes input from stdin or a given file, parses it and then computes a distance matrix.

The program provides both the naive and BFS approach to compute the distance matrix.

Input shape is:

```
c
h w
a[0,0]a[0,1]a[0,2]...a[0,w-1]
...
a[h,0]a[h,1]a[h,2]...a[h,w-1]

```

where

-   `c` is the amount of test cases
-   `h` is the number of rows of the matrix that will be read
-   `w` is the number of columns of the matrix that will be read
-   `a[x,y]` is the element of the matrix on row `x` and column `y` and can be only 0 or 1

A matrix is followed by an empty line.

If `c>1` then other matrixes will follow after the empty line.

This input is parsed and turned into an array of matrix. Each matrix is turned into a bitmap and then the distance matrix is computed.

A distance matrix is a matrix of the same size as the original where `a[i][j]` is the distance from `a[i][j]` to the closest element with the value of 1. If the element itself has the value of 1 the distance is 0. The distance formula is : `d(p1,p2)=|i1-i2|+|j1-j2|` where `p1 = a[i1][j1]` and `p2 = a[i2][j2]`.

When displaying a distance matrix, elements have a whitespace in between.

You can see an example of a matrix in `data/baseCase` or `data/multipleMatrix`.

The parser takes a config as parameter like this:

```
{
    MIN_TEST_CASE_COUNT = 1;
    MAX_TEST_CASE_COUNT = 1000;
    MIN_MATRIX_SIZE = 1;
    MAX_MATRIX_SIZE = 182;
    ALLOWED_MATRIX_VALUES = [0, 1];
}
```

### Assumptions:

-   Output is printed to stdout after the entire input is consumed
-   When input is fed from stdin, it's parsed line by line. This allows for any input regardless of size and it fails fast if input is erroneous.
-   The verbosity at the beginning of the output doesn't affect the end result

### Environment & Setup

Node version: `14.15.3`
TS version: `4.1.3`

`run npm install` in the root folder to install all necessary dependencies.

### Build

`npm run build` in the root folder will build the app into a folder called `dist`

Successive calls of this command will empty the `dist` folder before rebuilding.

### Run

-   `node dist/main.js -f data/baseCase` or `npm run startFile` - reads input from a file (the file is preset to use `data/baseCase` in case of npm command)
-   `node dist/main.js` - reads input from stdin
-   `cat data/baseCase | node dist/main.js` feeds chosen file content data to stdin (bypassing `-f` mode)

### Testing

`npm run test` will run the complete test suite

`npm run test:coverage` does test coverage

### Documentation

`npm run docs` will generate jsdoc documentation in the `docs` folder

### Error codes mapping:

`1` - missing file path when specifying `-f` parameter
