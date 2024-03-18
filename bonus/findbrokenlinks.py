###############################################################################################################################
# SA1 BONUS BROKEN LINK FINDER
# Author: Edoardo Salvioni
###############################################################################################################################

from htmlparser import Parser
import os
import pathlib
import urllib.request
import time


def check_link_validity(curpath,link):
    """Checks if a link is valid, based on status codes if a web page, or existing of path if path. 
    link the Link to the Page or the Path to the file.
    Parameters:
    link (str): Either a webLink or a Path to file.
    Returns:
    bool: True if valid.
    """
    if link is not None and len(link)>1:
        link = link.replace("'",'')
        link = link.replace('"','')
        if link.startswith("http"):
            try:
                r = urllib.request.urlopen(link)
                if r:
                    return True,link
                else:
                    return False,link
            except:
                return False,link
        elif link.startswith("tel"):
            return True, link
        elif link.startswith("mail"):
            return True, link
        elif link.startswith("#"):
            return True, link
        else:
            if link.endswith('html'):
                curpath = pathlib.Path(curpath).parent
                path = curpath / link
                path = path.resolve()
                return os.path.exists(path), path
            return False, link
    else:
        return False, link 

def checkPage(page):
    """Check all the links in a single Page and recursively to the pages in there contained.
    Parameters:
    page (str): The path to the index page
    """
    global broken
    global visited
    if not page.startswith("http"):
        if page not in visited and '.png' not in page and len(page)>1:
            parser = Parser(page)
            links = parser.get_all_a()
            visited.append(page)
            if links is not None:
                for link in links:
                    valid, nextlink = check_link_validity(page,link['href']) 
                    if valid:
                        tocheck = str(nextlink)
                        if not tocheck.startswith("tel") and not tocheck.startswith("mail") and not tocheck.startswith("#"):
                            checkPage(tocheck)
                    else:
                        if link['href'] is not None:
                            if link not in broken:
                                broken.append(link)


def run_checks(pathToIndex):
    index = pathlib.Path(pathToIndex).absolute()

    inittime = time.time()
    global broken
    broken = []
    global visited
    visited = []
    cnt = 0

    checkPage(str(index))
    for brokenlink in broken:
        print(f"Found Broken Link <{brokenlink['href']}> between Line {brokenlink['start_line']} and Line {brokenlink['end_line']} in File '{brokenlink['file']}'")
    print(f"{len(broken)} Broken Links have been Found.")
    print(f"Time : {time.time() - inittime}")


print("Please Enter The Path To The Index Page Within the Site")
index = input().strip()
run_checks(index)
