# This file creates a day 2 folder, and makes 4 files within it
#   problem.txt
#   input.txt
#   input.js
#   dx.js where x is the day name

import sys
import os

# Get the cmd argument
dayName = sys.argv[1]

os.mkdir(dayName)

# Create the 4 files in a folder specified by the command line arguemnt
f = open(dayName + "/problem.txt", "w")
f.write("")
f.close()

f = open(dayName + "/input.txt", "w")
f.write("")
f.close()

f = open(dayName + "/input.js", "w")
f.write("let input = [];\n\nmodule.exports = {\n\tinput\n};")
f.close()

# Create the dx.js file
f = open(dayName + "/" + dayName + ".js", "w")
f.write("const {input} = require('./input');")
f.close()
