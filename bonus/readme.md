HOW TO USE BROKENLINKSFINDER:

Make sure You are within the project's folder
in the terminal call:
>python ./bonus/findbrokenlinks.py

if on ubuntu:
>python3 ./bonus/findbrokenlinks.py

It will ask you for the path to the index.html file,
it suffices to give it like this:
index.html
if that doesn't work try with the full PATH to the index.html file

HOW TO USE LATEXCONVERTER:

Make sure you are within the project's folder (more precisely /group)
in terminal call:
>python bonus/latexConverter.py --mode <file path> -o <outputfile name>
where mode is either --all if a convertion of all the linked html pages is to be converted to .tex
                     --one if only a single html page should be converted to .tex
<file path> refers either to a single file if in mode --one or to the path to index.html in the case of mode --all.
-o is an optional flag to decide the name of the output file that will be found within the /outputfiles folder
<outputfile name> to be used with -o, it describes the name of the file containing the converted HTML.

>python3 if on ubuntu 
EXAMPLES:
>python3 bonus/latexConverter.py --all index.html -o hello.tex 
the above converts all pages that are interlinked into a single tex file and outputs it as hello.tex

>python3 bonus/latexConverter.py --one /malware/html/rootkits.html
the above converts a single page to .tex and saves it as default output.tex

