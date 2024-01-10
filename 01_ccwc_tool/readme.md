# Coding Challenge 1 - Word Counter

# Usage

Make the command executable
 
```
chmod +x ccwc.js
```

Install a package and any packages that it depends
```
npm install
```
Create a 'symbolic link' by using this npm CLI command
```
npm link
```
Usage. Now you can use the ccwc command with or without options.
```
ccwc [options] [filename]
```
or without option
```
ccwc [filename]
```
To read from standard input if no filename is specified
```
cat test.txt | ccwc -l
```
Example 
```
ccwc -l test.txt
```
or do this
```
node ccwc.js -l test.txt
```

Options

-c &nbsp; number of bytes in a file  
-l &emsp;number of lines in a file  
-w &nbsp; number of words in a file  
-m &nbsp; number of characters in a file


