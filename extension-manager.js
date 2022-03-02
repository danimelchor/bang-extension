class ExtensionManager {
  constructor(tabId) {
    this.tabId = tabId;
    this.bang = null;
    this.query = null;
  }

  execute(command, bang, query, type) {
    this.bang = bang || null;
    this.query = query || null;

    switch (type) {
      case "replace":
        this.replace(command.url);
        break;
      case "search":
        this.search(command.url, command.url_search);
        break;
      case "incognito-search":
        this.incognitoSearch(command.url, command.url_search);
        break;
      case "list":
        this.list(command.urls);
        break;
      default:
        console.error(`Error with type "${type}"`);
    }
  }

  replace(url) {
    if (this.query) {
      this.query = this.bang + " " + this.query;
      return this.search("", CMD.g.url_search);
    }

    chrome.tabs.update(this.tabId, { url });
  }

  search(url, url_search) {
    if (!this.query) return this.replace(url);

    const newUrl = url_search.replaceAll("%s", this.query);
    chrome.tabs.update(this.tabId, { url: newUrl });
  }

  incognitoSearch(url, url_search) {
    if (!this.query) return this.replace(url);

    const newUrl = url_search.replaceAll("%s", this.query);

    chrome.tabs.remove(this.tabId);
    chrome.windows.create({ url: newUrl, incognito: true });
  }

  list(urls) {
    if (this.query) {
      this.query = this.bang + " " + this.query;
      return this.search("", CMD.g.url_search);
    }

    for (const url of urls) chrome.tabs.create({ url, active: false });
  }
}
