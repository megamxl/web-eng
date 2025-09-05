var baseUrl = "https://en.wikipedia.org/w/api.php";
var title = "List_of_ursids";

var params = {
  action: "parse",
  page: title,
  prop: "wikitext",
  section: 3,
  format: "json",
  origin: "*"
};

const placeholderImage = "https://via.placeholder.com/200x150?text=No+Image";

async function fetchImageUrl(fileName) {
  if (!fileName) return placeholderImage;

  var imageParams = {
    action: "query",
    titles: "File:" + fileName,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*"
  };

  try {
    const res = await fetch(baseUrl + "?" + new URLSearchParams(imageParams).toString());
    const data = await res.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
      return page.imageinfo[0].url;
    }
    return placeholderImage;
  } catch (err) {
    return placeholderImage;
  }
}

async function extractBears(wikitext) {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row').slice(1); // skip the first non-row part

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^\|]+)/);

      if (nameMatch && binomialMatch) {
        const fileName = imageMatch ? imageMatch[1].trim().replace('File:', '') : null;
        const imageUrl = await fetchImageUrl(fileName);

        bears.push({
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: rangeMatch ? rangeMatch[1].trim() : "Unknown"
        });
      }
    }
  }

  // Render bears in order
  const moreBears = document.querySelector('.more_bears');
  moreBears.innerHTML = "";
  bears.forEach(bear => {
    const html = `<div class="bear">
      <img src="${bear.image}" alt="Image of ${bear.name}" style="width:200px; height:auto;">
      <p><b>${bear.name}</b> (${bear.binomial})</p>
      <p>Range: ${bear.range}</p>
    </div>`;
    moreBears.innerHTML += html;
  });
}

async function fetchBearImages() {
  const res = await fetch(baseUrl + "?" + new URLSearchParams(params).toString());
  const data = await res.json();
  await extractBears(data.parse.wikitext['*']);
}

export { fetchBearImages };
