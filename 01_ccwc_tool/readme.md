# Coding Challenge 1 - Word Counter

# Development setup
1. Clone repository
```
git clone https://github.com/nlazyan/coding-challenges.git
cd "01_ccwc_tool"
```
2. Make the command executable
 
```
chmod +x ccwc.js
```

3. Install a package and any packages that it depends
```
npm install
```
4. Create a 'symbolic link' by using this npm CLI command
```
npm link
```
5. Build and Run with nodejs
```
node ccwc.js [option] [filename]
```
# Usage
1. Use the ccwc command with option
```
ccwc [option] [filename]
```
2. or without option
```
ccwc [filename]
```
3. Run with nodejs
```
node ccwc.js [option] [filename]
```
4. You can read from standard input if no filename is specified
```
cat test.txt | ccwc -l
```
# Example
1. Run using CLI command (with or without option) 
```
ccwc -l test.txt
```

2. Run with nodejs
```
node ccwc.js -l test.txt
```

# Options

-c &nbsp; number of bytes in a file  
-l &emsp;number of lines in a file  
-w &nbsp; number of words in a file  
-m &nbsp; number of characters in a file


