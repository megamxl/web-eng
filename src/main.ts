import { searchForOccurences } from './search.ts';
import { fetchBearImages } from './fetch.ts';

//SEARCH
fetchBearImages();

const search = document.querySelector<HTMLFormElement>('.search');

if (search !== null) {
  search.addEventListener('submit', function (e) {
    searchForOccurences(e, search);
  });
}
