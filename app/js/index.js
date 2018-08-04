const feedItems = [];
const feedElement = document.querySelector(".feed");
const feedFile = "app/feeds.json";

function logResult(res) {
  return res;
}

function logError(err) {
  console.log(`Uh oh, looks like there was a problem : \n ${err} `);
}

function validateResponse(res) {
  if (!res.ok) {
    throw Error(res.text);
  }
  return res;
}

function readResponseAsText(res) {
  return res.text();
}

function parseFieldsFromXml(xmlDoc) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlDoc, "text/xml");
  const feedTitle = doc.querySelector("channel title").textContent;

  doc.querySelectorAll("item").forEach(item => {
    const itemTitle = item.querySelector("title").textContent;
    const itemDesc = item.querySelector("description").textContent;
    const itemLink = item.querySelector("link").textContent;
    const doesItemExist = feedItems.findIndex(el => el.itemLink == itemLink);

    if (doesItemExist == -1) {
      feedItems.push({
        feedTitle: feedTitle,
        itemTitle: itemTitle,
        itemLink: itemLink,
        itemDescr: itemDesc
      });
    }
  });

  const uniqueTitles = feedItems
    .map(feed => feed.feedTitle)
    .filter(getUniqueArrayValues);

  renderHTML(feedItems, uniqueTitles);
}

function getUniqueArrayValues(value, index, self) {
  return self.indexOf(value) === index;
}

function generateArticleMarkup(articles) {
  return `
  <ul>
      ${articles.map(
        article =>
          `<li>
            <a href="${article.itemLink}" target="_blank"> ${article.itemTitle}
            </a>
          </li>`
      )}
  </ul>
  `;
}

function renderHTML(feedArticles, titles) {
  let articlesPerSite = [];

  // generate markup for the articles with one header per site showing the site's title
  titles.forEach(title => {
    let articlesPerTitle = feedArticles.filter(article => {
      return article.feedTitle == title;
    });

    const feedMarkup = `
    <h4>${title}</h4>
      ${generateArticleMarkup(articlesPerTitle)
        .split(",")
        .join("")}
    `;

    articlesPerSite.push(feedMarkup);
  });

  feedElement.innerHTML = articlesPerSite.join("");
}

// use the feedURL attribute for the objects in the JSON
// file and fetch/return the XML for each site
function fetchXmlForFeeds(resourceJSON) {
  const jsonObj = JSON.parse(resourceJSON);

  Object.keys(jsonObj).forEach(key => {
    fetch(jsonObj[key].feedUrl)
      .then(validateResponse)
      .then(readResponseAsText)
      .then(parseFieldsFromXml)
      .then(logResult)
      .catch(logError);
  });
}

function fetchFeedFile() {
  fetch(feedFile)
    .then(validateResponse)
    .then(readResponseAsText)
    .then(fetchXmlForFeeds)
    .then(logResult)
    .catch(logError);
}
