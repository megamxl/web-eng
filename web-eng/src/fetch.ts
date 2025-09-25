const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const params = {
  action: "parse",
  page: title,
  prop: "wikitext",
  section: 3,
  format: "json",
  origin: "*"
};

const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";

const fetchImageUrl = async (fileName : string) => {
  if (!fileName) return placeholderImage;

  const imageParams = {
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
    const page : any = Object.values(pages)[0];
    if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
      const img = await fetch(page.imageinfo[0].url)
      if(img.status !== 200){
        return placeholderImage
      }
      return page.imageinfo[0].url;
    }
    return placeholderImage;
  } catch (err) {
    return placeholderImage;
  }
}

const extractBearsFromWkiText = (wikitext :string) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears :any = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row').slice(1);

    rows.forEach(row => {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^\|]+)/);

      if (nameMatch && binomialMatch) {
        bears.push({
          name: nameMatch[1].trim(),
          binomial: binomialMatch[1].trim(),
          imageFile: imageMatch ? imageMatch[1].trim().replace('File:', '') : null,
          range: rangeMatch ? rangeMatch[1].trim() : 'Unknown'
        });
      }
    });
  }
  return bears;
};

const removeDuplicates = (bears :any) => {
  const seen = new Set();
  //@ts-ignore
  return bears.filter(bear  => {
    if (seen.has(bear.binomial)) {
        return false;
    }
    seen.add(bear.binomial);
    return true;
  });
};

const fetchImagesForBears = async (bears :any) => {
    //@ts-ignore
  const promises = bears.map(async bear => {
    const imageUrl = await fetchImageUrl(bear.imageFile);
    return { ...bear, image: imageUrl };
  });
  //to keep the order and return when all done 
  return await Promise.all(promises);
};

const extractBears = async (wikitext: string) => {
  const basicBears = extractBearsFromWkiText(wikitext);
  const uniqueBears = removeDuplicates(basicBears);
  const bearsWithImages = await fetchImagesForBears(uniqueBears);
  return bearsWithImages;
};

const render = (bears : any) => {
    const moreBears = document.querySelector('.more_bears');
    //@ts-ignore
    moreBears.innerHTML = "";

        //@ts-ignore

    bears.forEach(bear => {
            //@ts-ignore

        moreBears.innerHTML += `
            <div class="bear">
                <img src="${bear.image}" alt="Image of ${bear.name}" style="width:200px; height:auto;">
                <p><b>${bear.name}</b> (${bear.binomial})</p>
                <p>Range: ${bear.range}</p>
            </div>`;
    });
}


const fetchandRenderBearImages = async () => {
        //@ts-ignore

  const res = await fetch(baseUrl + "?" + new URLSearchParams(params).toString());
  const data = await res.json();
  const bears = await extractBears(data.parse.wikitext['*']);
  render(bears)
}

export { fetchandRenderBearImages as fetchBearImages };
