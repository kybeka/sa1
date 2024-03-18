###############################################################################################################################
# HTML PARSER HELPER FOR SA1 BONUS LateX Converter
# Author: Edoardo Salvioni, Arina Shteyn, Alika Tsu.
###############################################################################################################################
from html.parser import HTMLParser
import pathlib
from shutil import copyfile

class StarterParse(HTMLParser):
    """CLASS TO MANAGE THE FIRST PAGE (INDEX.HTML)"""
    curfile = ""
    page = ''
    started = False
    title = True
    dir = pathlib.Path('.').resolve()

    OUTPUTDIR= (dir / "bonus/outputfiles/").resolve()
    IMAGEDIR = (OUTPUTDIR/ "figures/").resolve()
    start= {
        "html":"\\documentclass[12pt]{article} \n\\usepackage{graphicx} \n",
        "title":"\\title{"
    }
    elements= {
        "br":"\n",
        "h3":"\n\\section{",
        "h1":"\n\\subsection{",
        "h2":"\n\\subsection{",
        "b":"\\textbf{",
        "u":"\\underline{",
        "em":"\\emph{",
        "li":"\n\\item ",
        "ul":"\n\\begin{itemize}",
        "ol":"\n\\begin{enumerate}"
    }
    end= {
        "html":"\n",
        "title":"}",
        "ul":"\\end{itemize}",
        "ol":"\\end{enumerate}",
        "b":"}",
        "em":"}",
        "u":"}",
        "h3":"}",
        "h2":"}",
        "h1":"}",
        "li":"\n"
    }
    # ADD TEXT TO THE PARSED TEXT
    def addText(self,txt):
        if len(self.page)>0:
            if self.page[-1]!=" ":
                self.page = self.page + " " + txt
            else:
                self.page += txt
        else:
            self.page += txt

    
    def handle_starttag(self,tag,attrs):
        #DEPENDING ON HTML STARTTAG DO SOMETHING
        if tag in self.start:
            self.addText(self.start[tag])
        #HANDLE TITLE
        elif tag == "main":
            self.addText("\\begin{document} \n\\maketitle\n")
            self.started = True
        #HANDLE AUTHOR
        elif tag == "meta":
            if len(attrs)==2:
                if (attrs[0][1].lower()=='author'):
                    self.addText("\\author{%s} \n" % (attrs[1][1]))
        #HANDLE IMAGE
        elif tag == "img":
            for i in attrs:
                if i[0]=='src':
                    img = i[1]
                    if img.endswith(".png") or img.endswith(".jpeg") or img.endswith(".jpg"):
                        
                        srcpath = (self.curfile / img).resolve()
                        filename = img[img.rfind("/"):].replace("/",'')
                        try:
                            copyfile(srcpath,(self.IMAGEDIR / filename))
                            self.addText("\n\\includegraphics{figures/%s}"% (filename))
                        except:
                            print(f"{filename} Not Found, skipping picture")
        #HANDLE EVERYTHING ELSE
        elif self.started:
            if tag in self.elements:
                self.addText(self.elements[tag]) 

    def handle_endtag(self,tag):
        #HANDLE HTML CLOSING TAGS
        if self.started:
            if tag in self.end:
                self.addText(self.end[tag])
        if tag =="title":
            self.title= False
            self.addText(self.end[tag])


    
    def handle_data(self,data):
        #HANDLE DATA CONTAINED WITHIN TAGS
        if self.title:
            self.addText(data.strip())
        if self.started:
            self.addText(data.strip())

    def getpage(self):
        #GET THE LATEX CONVERTED STRING
        return self.page

    def setcurfile(self,file):
        #KEEP TRACK OF PATH FOR IMAGES
        self.curfile = file.parent


class RestParse(HTMLParser):
    """CLASS TO HANDLE THE PARSING OF ALL PAGES THAT DO NOT START THE DOCUMENT"""
    urfile = ""
    page = ''
    started = False
    dir = pathlib.Path('.').resolve()

    OUTPUTDIR= (dir / "bonus/outputfiles/").resolve()
    IMAGEDIR = (OUTPUTDIR/ "figures/").resolve()
    elements= {
        "br":"\n",
        "h3":"\n\\section{",
        "h1":"\n\\subsection{",
        "h2":"\n\\subsection{",
        "b":"\\textbf{",
        "u":"\\underline{",
        "em":"\\emph{",
        "li":"\n\\item ",
        "ul":"\n\\begin{itemize}",
        "ol":"\n\\begin{enumerate}"
    }
    end= {
        "ul":"\\end{itemize}",
        "ol":"\\end{enumerate}",
        "b":"}",
        "em":"}",
        "u":"}",
        "h3":"}",
        "h1":"}",
        "h2":"}",
        "li":"\n"
    }
    def addText(self,txt):
        #ADD TEXT TO THE CONVERTED STRING
        if len(self.page)>0:
            if self.page[-1]!=" ":
                self.page = self.page + " " + txt
            else:
                self.page += txt
        else:
            self.page += txt


    def handle_starttag(self,tag,attrs):
        #HANDLE HTML ELEMENT STARTTAGS
        #HANDLE INIT OF CONTENT OF PAGE
        if tag =="main":
            self.started=True
        #HANDLE IMAGE
        elif tag == "img":
            for i in attrs:
                if i[0]=='src':
                    img = i[1]
                    if img.endswith(".png") or img.endswith(".jpeg") or img.endswith(".jpg"):
                        srcpath = (self.curfile / img).resolve()
                        filename = img[img.rfind("/"):].replace("/",'')
                        try:
                            copyfile(srcpath,(self.IMAGEDIR / filename))
                            self.addText("\n\\includegraphics{figures/%s}"% (filename))
                        except:
                            print(f"{filename} Not Found, skipping picture")
        #HANDLE THE REST OF THE ELEMENTS
        elif self.started:
            if tag in self.elements:
                self.addText(self.elements[tag]) 

    def handle_endtag(self,tag):
        #HANDLE ENDING TAGS
        if self.started:
            if tag in self.end:
                self.addText(self.end[tag])


    
    def handle_data(self,data):
        #HANDLE DATA CONTAINED WITHIN ELEMENTS
        if self.started:
            self.addText(data.strip())

    
    def getpage(self):
        #RETURN THE CONVERTED LATEX
        return self.page

    def setcurfile(self,file):
        #SET CURFILE TO KNOW PATH OF IMAGES
        self.curfile = file.parent

