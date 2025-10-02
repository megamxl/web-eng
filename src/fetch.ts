import { showToast } from './utils';

const baseUrl = 'https://en.wikipedia.org/w/api.php';
const title = 'List_of_ursids';

const rawParams = {
  action: 'parse',
  page: title,
  prop: 'wikitext',
  section: 3,
  format: 'json',
  origin: '*',
};

interface ImageInfo {
  url: string;
  [key: string]: unknown; // in case API returns more fields
}

interface Page {
  imageinfo?: ImageInfo[];
  [key: string]: unknown; // allow other unknown fields
}

interface QueryResponse {
  query: {
    pages: Record<string, Page>;
  };
}

const placeholderImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

interface bear {
  name: string;
  binomial: string;
  imageFile: string;
  range: string;
}

const fetchImageUrl = async (fileName: string) => {
  if (!fileName) return placeholderImage;

  const imageParams = {
    action: 'query',
    titles: 'File:' + fileName,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  try {
    const res = await fetch(
      baseUrl + '?' + new URLSearchParams(imageParams).toString()
    );

    const data: QueryResponse = await res.json();

    const pages = data.query.pages;
    const page = Object.values(pages)[0]; // page is typed as Page | undefined

    //TODO add the picture as byte reperenstaion
    if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
      const img = await fetch(page.imageinfo[0].url);
      if (img.status !== 200) {
        return placeholderImage;
      }
      return page.imageinfo[0].url;
    }
    return placeholderImage;
  } catch (err) {
    console.error(err)
    return placeholderImage;
  }
};

const extractBearsFromWkiText = (wikitext: string) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row').slice(1);

    rows.forEach((row) => {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^\|]+)/);

      if (nameMatch && binomialMatch) {
        bears.push({
          name: nameMatch[1].trim(),
          binomial: binomialMatch[1].trim(),
          imageFile: imageMatch
            ? imageMatch[1].trim().replace('File:', '')
            : '',
          range: rangeMatch ? rangeMatch[1].trim() : 'Unknown',
        });
      }
    });
  }
  return bears;
};

const removeDuplicates = (bears: bear[]) => {
  const seen = new Set();
  return bears.filter((bear) => {
    if (seen.has(bear.binomial)) {
      return false;
    }
    seen.add(bear.binomial);
    return true;
  });
};

const fetchImagesForBears = async (bears: bear[]) => {
  const promises = bears.map(async (bear) => {
    const imageUrl = await fetchImageUrl(bear.imageFile);
    return { ...bear, imageFile: imageUrl };
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

const render = (bears: bear[]) => {
  const moreBears = document.querySelector('.more_bears');

  if (moreBears === null) {
    showToast("Can't render the bear Types from wikipedia");
    console.warn(moreBears);
    return;
  }

  moreBears.innerHTML = '';

  bears.forEach((bear) => {
    moreBears.innerHTML += `
            <div class="bear">
                <img src="${bear.imageFile}" alt="Image of ${bear.name}" style="width:200px; height:auto;">
                <p><b>${bear.name}</b> (${bear.binomial})</p>
                <p>Range: ${bear.range}</p>
            </div>`;
  });
};

const fetchandRenderBearImages = async () => {
  const params = Object.fromEntries(
    Object.entries(rawParams).map(([k, v]) => [k, String(v)])
  );

  const res = await fetch(
    baseUrl + '?' + new URLSearchParams(params).toString()
  );
  const data = await res.json();
  const bears = await extractBears(data.parse.wikitext['*']);
  render(bears);
};

export { fetchandRenderBearImages as fetchBearImages };
