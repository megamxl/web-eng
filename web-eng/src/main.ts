import { searchForOccurences } from './search.ts';
import {commentForm, toggleCommentButton} from './comments.ts'
import { fetchBearImages } from './fetch.ts';

// Show/hide comments toggle
toggleCommentButton();

//SEARCH
fetchBearImages();

const search = document.querySelector('.search')

if(search !== null) {    
    search.addEventListener('submit', function(e){
        searchForOccurences(e, search);
    });
}


//COMMENT-form
const commentFormHtml  = document.querySelector<HTMLFormElement>('.comment-form')

if(commentFormHtml !== null)
{
    commentFormHtml.onsubmit = function (e) {
        commentForm(e);
    };
}
