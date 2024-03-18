###############################################################################################################################
# HTML PARSER HELPER FOR SA1 BONUS BROKEN LINK FINDER
# Author: Edoardo Salvioni
###############################################################################################################################
import re
class Parser:
    """Create a Parser Object:
    Keyword arguments:
    filePath (str) -- the path to the file to parse (default None)
    text (str) -- the str to parse (default None) 
    """
    def __init__(self, filePath=None, text=None):
        print(f"Checking :<{filePath}>")
        if filePath is not None:
            with open(filePath, 'r',encoding="utf8") as fp:
                self.text_lines = fp.readlines()
                self.text = fp.read()
                self.current_index = 0
                self.current_line = 0
                self.filePath = filePath
        if text is not None:
            self.text = text
            self.text_lines = text.split("\n")
            self.current_index = 0
            self.current_line = 0
            
    
    def get_next_a(self):
        """Search the next <a> </a> HTML element within the text.
        Returns:
        HyperLink (obj): the object containing information about the link element.        
        """
    
        while self.text_lines[self.current_line][self.current_index:self.current_index+2] != "<a" :
            
            if self.current_index == len(self.text_lines[self.current_line]):
                self.current_line +=1
                self.current_index = 0
            else:
                self.current_index +=1 
                if self.current_line == len(self.text_lines)-1 and self.current_index >= len(self.text_lines[self.current_line])-1:
                    return None
        txt, start, end = self.get_tag_attrs(self.current_line , self.current_index, self.text_lines[self.current_line][self.current_index+1])
        self.current_line = end[0]
        self.current_index = end[1]
        return self.create_hyperlink_object(txt,start,end)

    def get_all_a(self):
        """Search all the <a></a> HTML elements within the text.
        Returns:
        Hyperlink (list): a List containing all the hyperlink elements within the page"""
        a_elements = []
        a = self.get_next_a()
        while a is not None:
            a_elements.append(a)
            a = self.get_next_a()
        return a_elements

    def get_tag_attrs(self,line,index,typ):
        start=(line,index)
        end=(line,index)
        while self.text_lines[start[0]][end[1]] != ">":
            end = (end[0], end[1] + 1)
        return self.text_lines[start[0]][start[1]:end[1]], start, end

    def get_link(self,txt):
        """Extracts the href link from the element
        Parameters:
        txt (str): the full text of the element
        Returns:
        str: the link"""
        txt = txt[0:txt.find(">")]
        match = re.search(r"""href=['"]?([^\'"]+)""",txt)
        matchwithspace = re.search(r"""href= ['"]?([^\'"]+)""",txt)
        if matchwithspace:
            return matchwithspace.group(1)
        if match:
            #print(match.group(1))
            return match.group(1)
        return None


    def create_hyperlink_object(self, txt, start, end):
        """Create an HyperLink Object
        Parameters:
        txt (str): the full text of the element
        start (int,int): starting line, starting index
        end (int,int): ending line, ending index
        Returns:
        dict: HyperLink Object"""
        href = self.get_link(txt)
        hyper = {
            "start_line": start[0],
            "end_line": end[0],
            "href": href,
            "file": self.filePath
        }
        return hyper
        



