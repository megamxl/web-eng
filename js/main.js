import { searchForOccurences } from './search.js';
import {commentForm, toggleCommentButton} from './comments.js'
import {fetchBearImages} from './fetch.js'

fetchBearImages();

// Show/hide comments toggle
toggleCommentButton();

//SEARCH
document.querySelector('.search').addEventListener('submit', function(e){
    searchForOccurences(e, this);
});

//COMMENT-form
document.querySelector('.comment-form').onsubmit = function (e) {
    commentForm(e);
};