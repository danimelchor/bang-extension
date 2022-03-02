const extractBang = (rawQuery) => {
  const words = rawQuery.trim().split(" ");

  var bang = "g";
  var query = rawQuery;

  const possibleBang = words[0].toLowerCase();

  if (ALLOWED_BANGS.includes(possibleBang)) {
    bang = possibleBang;
    query = words.splice(1).join(" ");
  }

  return [bang, query];
};

const getDescription = (bangObj, query) => {
  const type = bangObj.type;
  const name = bangObj.name;

  if (type === "search" && query)
    return `Search <match>${query}</match> in <url>${name}</url>`;
  else if (type === "replace" || type === "search")
    return `Go to <url>${name}</url>`;
  else if (type === "list") return `Execute <url>${name}</url> list`;
  else if (type === "incognito-search" && query)
    return `Search <match>${query}</match> in a new <url>incognito</url> tab`;
  else if (type === "incognito-search")
    return `Open a new <url>incognito</url> tab`;
  else return `Error on type ${type}`;
};

const getSuggestions = (bang, query) => {
  const possibleBangs = ALLOWED_BANGS.filter((b) => b.startsWith(bang));

  const correctActionBangs = possibleBangs.filter((b) =>
    query ? SEARCH_TYPES.includes(CMD[b].type) : true
  );

  // Get suggestion objects and avoid bangs with same command
  var getSuggestionObjs = [];
  var seenNames = new Set();

  for (const possibleBang of correctActionBangs) {
    const bangObj = CMD[possibleBang];

    if (!seenNames.has(bangObj.name)) {
      seenNames.add(bangObj.name);

      getSuggestionObjs.push({
        content: query ? `${possibleBang} ${query}` : possibleBang,
        description: getDescription(bangObj, query),
      });
    }
  }

  return getSuggestionObjs;
};

// Redirect to appropiate page
chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const tabId = tabs[0] ? tabs[0].id : null;
    if (!tabs || !text || !tabId) return;

    // Extract bang keyword if valid
    const [bang, query] = extractBang(text);

    // Get appropiate command and execute
    const command = CMD[bang];
    const type = command.type;

    // Execute command
    const E = new ExtensionManager(tabId);
    E.execute(command, bang, query, type);
  });
});

// Suggest keyword
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  const words = text.trim().split(" ");
  const bang = words[0];
  var query = words.slice(1).join(" ");
  query = !query || query === "" ? null : query;

  const suggestedBangs = getSuggestions(bang, query);
  suggest(suggestedBangs);
});
