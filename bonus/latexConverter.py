###############################################################################################################################
# SA1 BONUS2 Latex COnverter
# Author: Edoardo Salvioni, Arina Shteyn, Alika Tsu.
###############################################################################################################################
import pathlib
from singlepageparser import Parser
from multipageparser import StarterParse, RestParse
from htmlparser import Parser as AParser
import sys
import os

##INITIALIZE RECURSIVE BREATH FIRST PAGE DISCRIMINATOR
global visited
visited = []

##CONVERT A SINGLE PAGE
def get_one(path,outputfile="output.tex"):
    dir = pathlib.Path('.').resolve()
    OUTPUTDIR= (dir / "bonus/outputfiles/").resolve()

    parser = Parser()
    with open(path, 'r',encoding="utf-8") as fp:
        text = fp.read()
    parser.setcurfile(path)
    parser.feed(text)
    page = parser.getpage()
    page = page.replace("%","\\\\%").replace("$","\\\\$")
    output = open(OUTPUTDIR / outputfile,'w', encoding="utf-8")
    output.write(page)

##GET FIRST PAGE, PREPENDED WITH BEGIN{DOCUMENT}, no END{DOCUMENT}
def get_first(path,outputfile="output.tex"):
    global visited
    visited.append(path)
    dir = pathlib.Path('.').resolve()
    OUTPUTDIR= (dir / "bonus/outputfiles/").resolve()

    parser = StarterParse()
    with open(path, 'r',encoding="utf-8") as fp:
        text = fp.read()
    parser.setcurfile(path)
    parser.feed(text)
    page = parser.getpage()
    page = page.replace("%"," $%$").replace("$"," $\$$").replace("..//","$..//$").replace("|","$|$")
    output = open(OUTPUTDIR / outputfile,'w',encoding="utf-8")
    output.write(page)
    ap = AParser(filePath=path)
    links= ap.get_all_a()
    for link in links:
        if link['href'] is not None:
            if not link['href'].startswith("http") and os.path.exists(link['href']):
                get_all(pathlib.Path(link['href']).resolve(),outputfile)

##GET A PAGE WITHOUT PREPENDING OR APPENDING BEGIN END DOCUMENT
def get_all(path,outputfile="output.tex"):
    global visited
    if path not in visited:
        dir = pathlib.Path('.').resolve()
        OUTPUTDIR= (dir / "bonus/outputfiles/").resolve()
        parser = RestParse()
        with open(path, 'r',encoding="utf-8") as fp:
            text = fp.read()
        parser.setcurfile(path)
        parser.feed(text)
        page = parser.getpage()
        page = page.replace("%"," $%$").replace("$"," $\$$").replace("..//","$..//$").replace("|","$|$")
        output = open(OUTPUTDIR / outputfile,'a',encoding="utf-8")
        output.write(page)
        ap= AParser(filePath=path)
        visited.append(path)
        links = ap.get_all_a()
        for link in links:
            if link['href'] is not None:
                if link['href'].endswith('.html') and not link['href'].startswith('http'):
                    pathtofile = (path.parent / link['href']).resolve()
                    #print("getting{}".format(pathtofile))
                    try:
                        get_all(pathtofile,outputfile)
                    except:
                        print(f"failed getting {pathtofile}, path does not exist")

##APPEND \END{DOCUMENT}
def set_last(path,outputfile="output.tex"):
    dir = pathlib.Path('.').resolve()
    OUTPUTDIR= (dir / "bonus/outputfiles/").resolve()
    output = open(OUTPUTDIR / outputfile,'a',encoding="utf-8")
    output.write("\n\\end{document}\n")


##CREATE FOLDER STRUCTURE FOR OUTPUT
def check_folder():
    execution_folder = repr(__file__)
    execpath = pathlib.Path(repr(__file__)).parent
    print(execpath)
    neededpath = execpath / "outputfiles/figures"
    if not os.path.exists(str(neededpath).replace("'","")):
        print(f"Creating directories for output:{neededpath}")
        os.makedirs(str(neededpath).replace("'",""))



# BELOW THE EXECUTION
if __name__ == '__main__':
    proceed = True
    check_folder()
    if len(sys.argv)==3:
        mode = sys.argv[1]
        if mode != "--all" and mode !="--one":
            print(f"{mode} is not a valid mode.")
            proceed = False  
        path = pathlib.Path(sys.argv[2]).resolve()
        if  not os.path.exists(path):
            print(f"Cannot find folder or directory {path}")
            proceed = False
        if proceed:
            if mode == "--all":
                get_first(path)
                set_last(path)
                print(f"{len(visited)} converted pages, the others weren't reachable")
                print(f"output file saved as: /outputfiles/output.txt along with figures within /figures")
            else:
                get_one(path)
                print("output file saved as: /outputfiles/output.txt along with figures within /figures")

    elif len(sys.argv)==1:
        print("Correct Usage would be: > python latexConverter.py <mode> <page> --o <outputfile> \n where <mode> is either --all or --one,\n <page> the path to the index for --all, the path to the single page for --one, \n --o name is optional to set a name for the output file, by default it is output.tex ")
    
    else:
        if len(sys.argv) != 5:
            print("Invalid amount of arguments")
        else:
            mode= sys.argv[1]
            if mode != "--all" and mode !="--one":
                print(f"{mode} is not a valid mode.")
                proceed = False  
            path = pathlib.Path(sys.argv[2]).resolve()
            if  not os.path.exists(path):
                print(f"Cannot find folder or directory {path}")
                proceed = False
            outputfile = sys.argv[4]
            if not outputfile.endswith(".tex"):
                outputfile += ".tex"
        if proceed:
            if mode == "--all":
                get_first(path,outputfile)
                set_last(path,outputfile)
                print(f"converted {len(visited)} pages, the others weren't recursively reachables")
                print(f"output file can be found in: /outputfiles/{outputfile} along with figures within /figures")
            else:
                get_one(path,outputfile)
                print(f"output file can be found in: /outputfiles/{outputfile} along with figures within /figures")
    
