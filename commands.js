const CMD_PREPROCESS = {
  "g,google": {
    name: "Google",
    type: "search",
    url: "http://google.com/",
    url_search: "http://google.com/search?q=%s",
  },
  "si,is,gi": {
    name: "Incognito Search",
    type: "incognito-search",
    url: "http://google.com/",
    url_search: "http://google.com/search?q=%s",
  },
  "dd,duckduckgo,ddg": {
    name: "DuckDuckGo",
    type: "search",
    url: "https://duckduckgo.com/",
    url_search: "https://duckduckgo.com/?q=%s",
  },
  "yt,youtube": {
    name: "YouTube",
    type: "search",
    url: "https://www.youtube.com/",
    url_search: "https://www.youtube.com/results?search_query=%s",
  },
  "lh, localhost": {
    name: "Localhost",
    type: "search",
    url: "http://localhost:3000",
    url_search: "http://localhost:%s",
  },
  "w,wiki,wikipedia": {
    name: "Wikipedia",
    type: "search",
    url: "http://wikipedia.org/",
    url_search: "http://wikipedia.org/wiki/%s",
  },
  "a,amazon": {
    name: "Amazon",
    type: "search",
    url: "https://www.amazon.com/",
    url_search: "https://www.amazon.com/s?k=%s",
  },
  "gh,github": {
    name: "GitHub",
    type: "search",
    url: "https://github.com/",
    url_search: "https://github.com/search?q=%s",
  },
  wordle: {
    name: "Wordle",
    type: "replace",
    url: "https://www.nytimes.com/games/wordle/index.html",
  },
  "m,gm,mail,gmail": {
    name: "Gmail",
    type: "search",
    url: "https://mail.google.com/mail/",
    url_search: "https://mail.google.com/mail/#search/%s",
  },
  "gd,drive,gdrive": {
    name: "Google Drive",
    type: "search",
    url: "https://drive.google.com/drive/",
    url_search: "https://drive.google.com/drive/search?q=%s",
  },
  "gc,c,calendar": {
    name: "Google Calendar",
    type: "replace",
    url: "https://calendar.google.com/calendar/",
  },
  ext: {
    name: "Browser Extensions",
    type: "replace",
    url: "brave://extensions/",
  },
  "history,hist": {
    name: "Browser History",
    type: "replace",
    url: "brave://history/",
  },
  "no,notion": {
    name: "Notion",
    type: "replace",
    url: "http://notion.so",
  },
  school: {
    name: "School",
    type: "list",
    urls: [
      "https://mail.google.com/",
      "https://calendar.google.com/",
      "https://learn.bu.edu/",
      "https://www.bu.edu/studentlink",
    ],
  },
  dev: {
    name: "Dev",
    type: "list",
    urls: [
      "http://localhost:3000/",
      "https://mui.com/",
      "https://stackoverflow.com/",
    ],
  },
  "wa,wolfram,wolframalpha": {
    name: "WolframAlpha",
    type: "search",
    url: "https://www.wolframalpha.com/",
    url_search: "https://www.wolframalpha.com/input?i=%s",
  },
  "bu,coursesearch,cs": {
    name: "CourseSearch",
    type: "search",
    url: "https://www.bu.edu/phpbin/course-search/",
    url_search:
      "https://www.bu.edu/phpbin/course-search/search.php?pagesize=10&search_adv_all=%s&adv=1",
  },
  mui: {
    name: "MaterialUI",
    type: "replace",
    url: "https://mui.com/components/",
  },
  "stackoverflow,so,stack": {
    name: "Stack Overflow",
    type: "search",
    url: "https://stackoverflow.com/",
    url_search: "https://stackoverflow.com/search?q=%s",
  },
  indexa: {
    name: "Indexa Capital",
    type: "replace",
    url: "https://indexacapital.com/",
  },
  "pi,piazza": {
    name: "Piazza",
    type: "search",
    url: "https://piazza.com/",
    url_search: "https://piazza.com/bu/spring2022/%s/",
  },
  "learn,bb": {
    name: "BU Blackboard",
    type: "replace",
    url: "https://learn.bu.edu/",
  },
  sl: {
    name: "BU Student Link",
    type: "replace",
    url: "https://www.bu.edu/studentlink",
  },
  plan: {
    name: "Planned Classes",
    type: "replace",
    url: "file:///Users/danielmelchor/Documents/BAMS/plan-of-study.pdf",
  },
};

const processCommands = (preprocessed_cmds) => {
  var new_cmds = {};
  var allowed_bangs = [];

  for (const pp_key of Object.keys(preprocessed_cmds)) {
    for (const key of pp_key.split(",")) {
      allowed_bangs.push(key);
      new_cmds[key] = preprocessed_cmds[pp_key];
    }
  }
  return [new_cmds, allowed_bangs];
};

const [CMD, ALLOWED_BANGS] = processCommands(CMD_PREPROCESS);
const SEARCH_TYPES = ["search", "incognito-search"];
