

let setStyle = (elid, prop, style)=>{
  let element = document.getElementById(elid);
  element.style[prop]=style;
  //console.log(prop + " prop set to" + style);
}

//------mantain dark-light mode between pages-----
const storage = window.sessionStorage;

//constant reference onf the input search
let searchInput, searchRes;

//names of pages whose sidebar is disabled
const nosidebarPages =['history', 'Brain1', 'Brain2', 'CIH_virus', 'creeper1', 'creeper2', 'Elk1', 'Elk2',
'FredCohen', 'FredCohen2', 'happy99', 'iloveyou1', 'iloveyou2', 'Michelangelo_virus', 'Michelangelo_virus1', 'pegasus', 'Robert_Morris',
'socialnetwork_virus', 'socialnetwork_virus2', 'SQL_Slammer', 'The_Morris_Worm', 'UniversalConstructor', 'VonNewmann',
'2fa', 'about_antiviruses', 'antivirus', 'application_software_security', 'backup_plan', 'commonsense', 'companies_dataprotection', 
'firewall', 'free_vs_paid', 'free_vs_paid2', 'govagencies_cyberdefense', 'history_antiviruses', 'https', 'pragmatic_network_analysis', 
'raid', 'software_management', 'usb_security_management', 'vpn',]//array with pages without nav bar;

//dict of paths from website root, and related keywords
const dict_of_pages = {
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
  'group/history/html/VonNeumann.html':['John von Neumann Self replication first computer virus theory of self reproducing automata','John Von Neumann' ],
  'group/history/html/UniversalConstructor.html':['Universal constructor theory of self reproducing automata Self replication machine','Universal Constructor'],
  'group/history/html/Brain1.html':['IBM pc brain alvi brothers Pakistani virus','Brain Virus'],
  'group/history/html/Brain2.html':['brain Pakistani flu floppy disk boot sector','Brain Virus'],
  'group/history/html/pegasus.html':['Pegasus Spyware Spying Vulnerability', "The Pegasus Spyware"],
  'group/history/html/FredCohen1.html':['History Virus term topic Process', 'Fred Cohen'],
'group/history/html/FredCohen2.html':['Demonstrations Process  Cohen’s result', 'His demonstrations'],
'group/history/html/Michelangelo_virus.html':['History Impacts Process', 'Michelangelo virus'],
'group/history/html/Michelangelo_virus1.html':['Legacy Its growth Damages Impacts in computer', 'Trend of Virus'],

'group/history/html/creeper1.html':['Creeper Bob Thomas Ray Tomlinson First Virus','Creeper - Idea & Creators'],
'group/history/html/creeper2.html':['Creeper ARPANET PDP-10 Tenex RSEXEC','Creeper virus - Functioning & Consequences'],
'group/history/html/Elk1.html':['Elk Cloner Rich Skrenta Prank First Virus','Elk Cloner - Idea & Creator'],
'group/history/html/Elk2.html':['Elk Cloner Floppy Disk Apple II DOS 3.3 Message','Elk Cloner - Functioning & Consequences'],

'group/history/history.html' : ['History Landing page Timeline Topic menu', 'History Landing Page'],
'group/history/html/iloveyou1.html' :['ILOVE Malware History', 'ILOVE Malware - Origins & Functioning'],
'group/history/html/iloveyou2.html' :['ILOVE Malware Description', 'ILOVE Malware - Consequences'],
'group/history/html/happy99.html' :['Happy99 Virus','Happy99 Virus -  Origins & Functioning '],
'group/history/html/socialnetwork_virus.html' :['Social Network Viruses Introduction','Social Network Virus - Context & Fake Account’s '],
'group/history/html/socialnetwork_virus2.html' :['Social Network Viruses Technical Description ','Social Network Virus - Stalking and Spying  & Malicious Links Malware'],

'group/security/html/usbSecurityManagement.html':['usb unknown drivers data protection', 'external hard drives'],
'group/security/html/averageUserDataProtection.html':['VPN good habits adblock', 'data backup'],
'group/security/html/companiesDataProtection.html':['backup recovery plan business continuity', 'companies'],
'group/security/html/govAgenciesCyberDefence.html':['government privacy public data', 'confidential data'],

'group/malware/html/TROJANS.html':['trojan job infection points', 'mobile devices'],
'group/malware/html/TROJAN2.html':['trojan', ' Trojans types'],
'group/malware/html/TROJAN3.html':['trojan', 'attacks'],
'group/malware/html/TROJAN4.html':['trojan do’s dont’s', 'protection'],
'group/compvir/html/MULTIPARTITE-VIRUS.html':['multipartite virus', 'job', 'infections'],
'group/compvir/html/MULTIPARTITE-VIRUS-2.html':['multipartite virus', 'boot', 'propagation', 'files', 'infective'],

'group/security/security.html':['Security types', 'Security types'],
'group/security/hardware_security.html':['Different hardware security types', 'hardware types'],
'group/security/software_security.html':['Different software security types', 'software types'],
'group/security/network_security.html':['Different network security types', 'network types'],
'group/security/2fa.html':['2 factor authentication', '2 factor authentication'],

 'group/security/html/backup_plan.html ':[ 'Recovery Backup Data loss Hard disk ' , 'Backup Plan ']    ,
 'group/security/html/application_software_security.html ':[ 'Software security malware development stage application security ', 'Application Security vs. Software Security '],
 'group/security/html/antivirus.html ':[ 'Antivirus Antimalware Detection Behavior ', 'Antivirus Software '],
 'group/security/html/RAID.html ':[ 'Data loss Hard disk Protection RAID ', 'RAID Technology '],

 'group/malware/html/ransomware.html ':[ 'ransom malicious software malicious binary data recovery ', 'What is Ransomware? '],
 'group/malware/html/maliciousapps.html ':[ 'malicious apps malware phones install Malicious Applications '],
 'group/malware/html/maliciousapps2.html ':[ 'app permissions do’s donts download', ' Malicious Applications '],
 'group/malware/html/overwritevirus.html ':[ 'cyber security malicious program delete data antivirus software ', 'What does Overwriting Virus Mean? '] ,
 'group/malware/html/twitchhack.html ':[ 'twitch darknet traffic source codes sensitive data ', 'Case study: Twitch Hack '] ,
 'group/malware/html/yahoohack.html ':[ 'dark web hacker security network ', 'Case study: Twitch Hack '] ,

 'group/security/html/commonsense.html ':[ 'common sense about security password phishing ',  'Common sense '],
 'group/security/html/firewall.html ':[ 'firewall network traffic rules criteria security ',  'Firewall '],
 'group/security/html/soft_management.html ':[ 'software management EternalBlue virus updating sistems ', 'updating applications '],
 'group/security/html/vpn.html ':[ 'VPN security hiding IP private connection connection location '],

 'group/malware/malware.html ':[ 'malware malicious software homepage computer malware ', 'Malicious Sofware '],
 'group/malware/html/crypto-currency-scam.html ':[ 'crypto scam squid currency ', 'Case Study: Crypto Currency Scam (SQUID) '] ,

 'group/malware/botnet.html ':[ 'threat, malicious software, assault business', 'information BOTNET '],
 'group/malware/botnet2.html ':[ 'client-server, P2P, targeted intrusions', 'web servers THE ARCHITECTURE OF A BOTNET '],
 'group/malware/cryptojacking.html ':[ 'online threat, cryptocurrencies, bitcoin, ', 'software CRYPTOJACKING '],
 'group/malware/direct_action_virus.html ':[ 'infect, file infectors, source code, ', 'propagate DIRECT ACTION VIRUS '],

 'group/compvir/compvir.html ':[ 'computer virus homepage about ', 'Computer Viruses '],

 'group/compvir/html/bug.html ':[ 'Bug Debug Ariane5 Hopper ', 'Bug '],
 'group/compvir/html/bug2.html ':[ 'Video Game Glitch Crash Problems ', 'Bugs in Video Game '],
 'group/compvir/html/BackDoor.html ':[ 'Backdoor Nasa Fireeye cyber security ', 'BackDoor '],
 'group/compvir/html/Directory Virus.html ':[ 'Directory Virus Cluster dir-2 ', 'Directory Virus '],

 'group/security/html/https.html ':[ 'https http ssl tls https '],
 'group/security/pragmatic_network_analysis.html ':[ 'network nmap wireshark analysis ', 'pragmatic_network_analysis '],

 'group/malware/html/DDoS.html ':[ 'DDoS Attack Malicious Behavior Information Security ', 'DDoS '],
 'group/malware/html/Spam.html ':[ 'Bug Internal Capacity Exceeded System Crash ', 'Spam '],
 'group/malware/html/Adware_Rerevisioned.html ':[ 'Adware Rogueware Delivered Ads Custom Oriented ', 'Adware '],
 'group/malware/html/Malware_Rerevisioned.html ':[ 'Malware Rogueware System Security External Threat ', 'Malware '],
 'group/malware/html/Spyware_Rerevisioned.html ':[ 'Spyware Information Security Information Collection Widespread Threat ', 'Spyware '],
 'group/malware/html/Trickbot.html ':[ 'Malware Account Security Information Security Malicious ', 'Trickbot '],
 'group/malware/html/Emotet.html ':[ 'Trojan Spam Email Unauthorized probing Emotion ', 'Emotet '],

 'group/compvir/html/appliance-based malware.html ': [ 'Cyber Attack Botnet Malware Smart Device '],
 'group/compvir/html/Social Engineering and Phishing.html ': [ 'Confidential Information Cyber Criminals Manipulation ', 'Untrustworthy website ' ],
 'group/compvir/html/Web Scripting Virus.html ':[ 'Virus Attack Web Browser Security ', 'Malicious Websites Script ' ],
 'group/compvir/html/ScareWare.html ':[ 'Manipulation Ransomware Pseudo-antivirus ', 'Spyware'],

 'group/compvir/html/appliance-based malware.html ': [ 'Cyber Attack Botnet Malware Smart Device '],
 'group/compvir/html/Social Engineering and Phishing.html ': [ 'Confidential Information Cyber Criminals Manipulation ', 'Untrustworthy website ' ],
 'group/compvir/html/Web Scripting Virus.html ':[ 'Virus Attack Web Browser Security ','Malicious Websites Script ' ],
 'group/compvir/html/ScareWare.html ':[ 'Manipulation Ransomware Pseudo-antivirus Spyware'],
 'group/malware/html/RAMscrapper.html ' : [ 'RAMscrapper Malware RAM scrapping personal information '],
 'group/malware/html/malware_in_cars.html ' : [ 'Malware Cars Autopilot Future '],
 'group/malware/html/Macrovirus.html ' : [ 'Macro Virus Computer Virus Excel Microsoft '],
 'group/malware/html/cyberwarfare.html ' : [ 'Cyberware Military Data collection Cybercom '],

 'group/security/html/history_antiviruses.html ' : [ 'History Antiviruses Software','Virus '],
 'group/security/html/about_antiviruses.html ' : [ 'Malware Antivirus Phishing','Virus '],
 'group/security/html/free_vs_paid.html ' : [ 'Free Antivirus Paid','Choice '],
 'group/security/html/free_vs_paid2.html ' : [ 'Free Antivirus Paid','Differences '],

 'group/general/about-us.html' : ['names team leader leaders about', 'About'],
}


let getTitle = () => {
    url = window.location.href;
    url = url.split('/');//separates path into array
    url = url[url.length - 1].split('.')[0]; //gets the last element of the array and removes the extension
    console.log(url);
    return url;
}

//Event listeners
window.addEventListener('load', ()=>{
  //sets the global reference of the search input
  searchInput = document.getElementById('searchBar');
  searchRes = document.getElementById('search_results');

//sets the pages coloring based on storage value
  const DLbtn = document.getElementById('chmode')
  if(!!storage.getItem('DL')){
    if(storage.getItem('DL') === 'dark'){
      DLbtn.checked = false;
    } else if(storage.getItem('DL') === 'light'){
      DLbtn.checked = true;
    }
  }else{
    storage.setItem('DL', 'dark')
  }
  // console.log(storage.getItem('DL'), DLbtn.checked);
  toggleRoot('chmode','--main-col', '--dark-main-cl', '--light-main-cl');
  toggleRoot('chmode','--second-col', '--dark-second-cl', '--light-second-cl');

  //prevents bubbling of the dbclick events, which make it si that on dbclick on the sidebar,
  //it remains on the current page
  document.getElementById('sidebar-cont').addEventListener('dblclick', e =>{
    e.stopPropagation();
  })

  //if the page is in an index, it will prevent sidebar movement
  if (nosidebarPages.includes(getTitle())) {

    let head = document.getElementsByTagName('head')[0];

    let path = window.location.href.split('group')[1];
    console.log(path.split('general')[1]);
    let relpath = '../general/';

    if (path.split('general')[1] == undefined || path.split('general')[1] == null) {
      relpath = '../../general/';
    }
    

    let nosidebarcss = document.createElement('link');
    nosidebarcss.rel = 'stylesheet';
    nosidebarcss.href =  relpath +'nosidebar.css';
    console.log(relpath + 'nosidebar.css')

    head.appendChild(nosidebarcss);

    let navimg = document.getElementById('nav_img');

    let main = document.getElementById('main');
    navimg.onmouseout = null;
    navimg.onmouseover = null;

    if(main.style.left == '0px') {
        main.style.left = '-100px';
    }

    console.log('no sidebar for you');

    }


})



//toggle root elements
let setRoot = (prop, style) =>{
  document.documentElement.style.setProperty(prop, style);
}


//------toggle images in the whole page, based on a class and a proprety-----
let toggleRoot = (elid, prop, defS, togS) =>{
  let check = document.getElementById(elid);
  if(!check.checked){
    setRoot(prop, "var("+defS+")");// set to dark mode
    toggleIcons(false, 'icon-bg', 'background-image');
    toggleImages(false, 'icon-img', 'src');
    toggleOther(false, 'tog-img', 'src');
    storage.setItem('DL', 'dark');
  }
  else{
    setRoot(prop, "var("+togS+")");//set to light mode
    toggleIcons(true, 'icon-bg', 'background-image');
    toggleImages(true, 'icon-img', 'src');
    toggleOther(true, 'tog-img', 'src');
    storage.setItem('DL', 'light');
  }
}

//toggles nav bar icons (background)
let toggleIcons = (darkState, elclass, prop) => {
  let elements = document.getElementsByClassName(elclass);

  let styles = [];
  let newStyles = [];
  let fileNames = [];
  let paths = [];
  let rests = [];

  //checks for elements in the elements array
  for (let i = 0; i< elements.length; i++) {
      styles.push(getComputedStyle(elements[i])[prop]);
  }
  // console.log(styles);

  styles.forEach((item, i) => {
    // console.log("item" + i, item);
    if(!!item && item!="none"){
      let ni = item.split('icons/')[1];//remove rest of the path
      // console.log("ni",ni);
      paths.push(item.split("icons/")[0] + 'icons/');//add the path to the array
      if(!!ni && ni!="none"){
        // console.log("ni "+i,ni);
        fileNames.push(ni.split('.svg\")')[0]);//gets the name
        // console.log("nisplit",ni.split('.svg\")')[0]);
        rests.push('.svg\")');//put the rest (no name) in the

      } else {//require empty spots
        fileNames.push('');
        rests.push('');
         // console.log("undefined ni");
      }
      if(!!fileNames[i]){
        if(darkState){
          fileNames[i] = fileNames[i].split("-light")[0] + "-light";
        } else{
          fileNames[i] = fileNames[i].split("-light")[0];

        }
     } else {
       fileNames[i] = '';
       // console.log("undefined filename");
     }
    } else {//require empty spots
      paths.push('')
      fileNames.push('');
      rests.push('');
      fileNames[i] = '';
       // console.log("undefined item");
    }
    newStyles[i] = paths[i] + fileNames[i] + rests[i];
    // console.log(i, newStyles[i]);
    if(!!newStyles[i]){
      elements[i].style[prop] = newStyles[i];
    }
  });

  // console.log(newStyles);
}

//toggles other icons (images)
let toggleImages = (darkState, elclass, prop) => {
  let elements = document.getElementsByClassName(elclass);

   let fullPaths = [];
   let newPaths = [];
   let fileNames = [];
   let paths = [];
   let rests = [];

   for (let i = 0; i<elements.length;  i++) {
     fullPaths.push(elements[i].getAttribute('src'))
   }

   fullPaths.forEach((item, i) => {
     if(!!item && item!="none"){
       let ni = item.split('icons/')[1];//remove rest of the path
       paths.push(item.split('icons/')[0] + 'icons/');//adds the rest to the path to the array

       if(!!ni && ni!="none"){
       fileNames.push(ni.split('.svg')[0]);//gets the name
       rests.push('.svg');//put the rest (no name) in the
       }

       // console.log(fileNames[i]);
       if(darkState){
         fileNames[i] = fileNames[i].split("-light")[0] + "-light";
         // console.log(darkState,fileNames[i]);
       } else{
          fileNames[i] = fileNames[i].split("-light")[0];
          // console.log(darkState,  fileNames[i]);
        }

        newPaths[i] = paths[i] + fileNames[i] + rests[i];
        // console.log("newPaths",newPaths[i]);
        elements[i].setAttribute(prop, newPaths[i]);

      }
    })
    };

    let toggleOther = (darkState, elclass, prop) => {
      let elements = document.getElementsByClassName(elclass);

       let fullPaths = [];
       let newPaths = [];
       let fileNames = [];
       let paths = [];
       let rests = [];

       for (let i = 0; i<elements.length;  i++) {
         fullPaths.push(elements[i].getAttribute('src'))
       }

       fullPaths.forEach((item, i) => {
         if(!!item && item!="none"){
           let ni = item.split('images/')[1];//remove rest of the path
           paths.push(item.split('images/')[0] + 'images/');//adds the rest to the path to the array

           if(!!ni && ni!="none"){
           fileNames.push(ni.split('.')[0]);//gets the name
           rests.push('.' + ni.split('.')[1]);//put the rest (no name) in the
           }

           // console.log(fileNames[i]);
           if(darkState){
             fileNames[i] = fileNames[i].split("-light")[0] + "-light";
             // console.log(darkState,fileNames[i]);
           } else{
              fileNames[i] = fileNames[i].split("-light")[0];
              // console.log(darkState,  fileNames[i]);
            }

            newPaths[i] = paths[i] + fileNames[i] + rests[i];
            // console.log("newPaths",newPaths[i]);
            elements[i].setAttribute(prop, newPaths[i]);

          }
        })
        };





//Searchbar code based on the code provided by Eduardo Salvioni
let search = () => {
  let input = searchInput.value;
  input = input.toLowerCase();
  // console.log(input);
  // console.log(searchInput);
  // console.log(searchRes);

  //resets shown results
  while (searchRes.firstChild) {
    searchRes.removeChild(searchRes.firstChild);
  }



  for (const key in dict_of_pages) {
      // console.log(dict_of_pages[key][0])
      if(dict_of_pages[key][0].toLowerCase().includes(input)){
        let a = document.createElement('a')
        a.innerHTML = dict_of_pages[key][1];
        a.href = computeRelPath(key);

        let li = document.createElement('li');
        li.classList.add("sres");

        li.appendChild(a);
        searchRes.appendChild(li);
      }
  }

  if(!searchRes.firstChild){
    searchRes.appendChild(document.createElement('li')
        .appendChild(document.createTextNode("No Results Found")));
  }

  removeRes();
}

//computes the relative path to a target (from root) path
let computeRelPath = (target) => {
  return window.location.href.split('group/')[0] + target;
}

//removes all resaults, if the input is empty
let removeRes = () => {
  // console.log(!searchInput.value);
  if(!searchInput.value){
    while (searchRes.firstChild) {
      searchRes.removeChild(searchRes.firstChild);
    }
  }
}
