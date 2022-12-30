# Programming-Contest-Finder
Program which allows the user to find coding competitions during the specific time they input.
The program begins by asking the user if they would like to find a competition that takes place in the next 24 hours.
If answered with a yes, the program provides the names of the competitions that take place in the next 24 hours.
If answered no, the program asks the user what year they are looking for competitions in. The answer is required to be starting from the current year.
The program then asks the user what month they are looking for a competition in. If the input year was the same as the current year only inputs from the current month till december are allowed. If it was future years then any of the 12 months are allowed.
With this information the program utilizes the fetch API feature in Javascript to access information from the free to access API from https://kontests.net/api to locate competitions that fall under the requirements specified by the user.
The list of competitions are then outputted.
