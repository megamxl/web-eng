import { showToast } from './utils.ts';

const textNodeType = 3;

export const searchForOccurences = (e: Event, form: HTMLFormElement ) => {
  e.preventDefault();

  document.querySelectorAll('.highlight').forEach(function (el) {
    const parent = el.parentNode;

    if (parent != null) {
      parent.replaceChild(document.createTextNode(el.textContent ?? ''), el);      
      parent.normalize();
    }
  });

  const searchKey = form.q.value.trim();
  if (!searchKey) {
    showToast('Enter a search query');
    return;
  }

  const regex = new RegExp(
    '(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
    'gi'
  );

  let found = false;

  function walk(node: Element) {
    if (node.nodeType === textNodeType) {
      // Text node

      if (node.nodeValue !== null) {
        const match = node.nodeValue.match(regex);
        if (match) {
          const span = document.createElement('span');
          span.innerHTML = node.nodeValue.replace(
            regex,
            '<mark class="highlight">$1</mark>'
          );
          node.replaceWith(...Array.from(span.childNodes));
          found = true;
        }
      }
    } else if (
      node.nodeType === 1 &&
      node.tagName !== 'SCRIPT' &&
      node.tagName !== 'STYLE' &&
      node.tagName !== 'FORM'
    ) {
      (node.childNodes as NodeListOf<Element>).forEach(walk);    }
  }

  //easy fix for the article
  document.querySelectorAll('article').forEach((article) => walk(article));

  if (!found) showToast('No match Found');
};
