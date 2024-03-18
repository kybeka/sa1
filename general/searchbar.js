//Script by Edoardo Salvioni
//TO BE PLACED WITHIN general/
function search_page() {

    /*
    WHERE TO PLACE WITHIN THE PAGES :
    <li id="sidetoggle"> <input type="search" id=searchBar onkeyup="search_page()">
        <div id="search_results"></div>
        <script src="../general/searchbar.js"></script>
    </li>
    FOR STYLE CHANGES:
    this is the html struct of the created elements
    <div id="search_results">
        <ul class="search_res">
            <li class="sres">SOME TEXT</li>
            ...
            <li class="sres">ANOTHER TEXT</li>
        </ul>
    </div>
    IN cas you need to remove the content of the search bar on collapse, you can use this in another js file:
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    let ress = document.getElementById('search_results');
    removeAllChildNodes(ress);
    */
    //Path:"PATH":(str keywords, str title)
    let dict_of_pages = {
          "group/compvir/html/residentvirus.html":["resident virus memory persistent","Resident virus"],
          "group/compvir/html/polymorphicvirus.html":["polymorphic virus shapeshifter encryption","PolyMorphic Virus"],
          "group/compvir/html/polyvirus2.html":["virlock ursnif vobfus polymorphic","Well Known polymorphic"],
          "group/malware/html/rootkits.html":["rootkit bootloader firmware hardware memory application kernel","Resident Virus"],
          "group/history/html/Robert_Morris.html":["Robert Tappan Morris The Morris worm Morris computer worm","Robert Morris"],
          "group/history/html/The_Morris_Worm.html":["The Morris Worm Robert Morris Worm Computer Worm","The Morris Worm"],
          "group/history/html/Robert_Morris.html":['Robert Tappan Morris The Morris worm Morris', 'computer worm'],
          'group/history/html/The_Morris_Worm.html':['The Morris Worm Robert Morris Worm', 'Computer Worm'],
          'group/history/html/SQL_Slammer.html':['The SQL Slammer SQL Microsoft SQL Server', 'MSDE'],
          'group/history/html/SQL_Slammer_Worm.html':['SQL Slammer SQL worm worm on Microsoft', 'Microsoft SQLServer'],
          //ADD THE REST OF THE PAGES HERE ALL SEPARATED BY A , it is important that the struct is kept like this, otherwise it will have errrors and exceptions.
      }
    //Helper that removes childnodes on each call
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    //get the div
    let input = document.getElementById('searchBar').value;

    //console.log(input)
    //change input to lowercase
    input = input.toLowerCase();
    //create ul element
    var ul = document.createElement('ul');
    ul.classList.add("search_res")
    var div = document.getElementById("search_results")
    //remove all old search results
    removeAllChildNodes(div);
    div.appendChild(ul);
    for (var key in dict_of_pages) {
        if (dict_of_pages[key][0].toLowerCase().includes(input)) {
            var li = document.createElement('li');
            //add search results to the Unordered List
            li.classList.add("sres")
            li.classList.add("testing2")
            //Give em a name.
            li.appendChild(document.createTextNode(dict_of_pages[key][1]));
            li.onclick = function () {
                let place = location.href
                console.log(place);
                place =place.split('group')[0]
                console.log(place)
                url = place + key
                console.log(url)
                window.location.href =url
            }
            ul.appendChild(li);
        }

    }
    if (!ul.firstChild) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode("No Results Found"));
        ul.appendChild(li);
    }
}
