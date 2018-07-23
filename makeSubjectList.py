'''
A python script to compile human formated tabulated list to a javascript object
John Han, Owl Tutoring INC. 2018
'''
def getSubjectList():

    # add containing object
    currentIndent = -1
    print("var sublist = {", file=open("formatedSubList.js", "a"))
    print("subject: \"\",", file=open("formatedSubList.js", "a"))

    # open file containing two space tabbed list
    with open('subjectList.txt','r') as f:

        # Read file line by line
        for line in f:

            # get number o indents for this line
            newIndentCount = len(line) - len(line.lstrip('  '))
            if newIndentCount != 0:
                newIndentCount = int(newIndentCount/2)

            # if indentation increasing, create new sublist
            if newIndentCount > currentIndent:
                print("sublist: [", file=open("formatedSubList.js", "a"))
                print("{", file=open("formatedSubList.js", "a"))
            
            # if indentation same, add to sublist
            elif newIndentCount == currentIndent:
                print("},", file=open("formatedSubList.js", "a"))
                print("{", file=open("formatedSubList.js", "a"))

            # if decreaing close list and object
            elif newIndentCount < currentIndent:
                print("},", file=open("formatedSubList.js", "a"))
                for i in range(currentIndent - newIndentCount):
                    print("]", file=open("formatedSubList.js", "a"))
                    print("},", file=open("formatedSubList.js", "a"))
                print("{", file=open("formatedSubList.js", "a"))

            # add current line subject
            print("subject: \"" + line.strip() + "\",", file=open("formatedSubList.js", "a"))

            currentIndent = newIndentCount
        
        # close everything
        print("}", file=open("formatedSubList.js", "a"))
        for i in range(currentIndent + 1):
            print("]", file=open("formatedSubList.js", "a"))
            print("},", file=open("formatedSubList.js", "a"))

getSubjectList()