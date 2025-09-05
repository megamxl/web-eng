import { showToast } from "./utils.js";


const commentForm = (e) => {
    // Comment form stuff
    e.preventDefault();

    var nameField = document.querySelector('#name');
    var commentField = document.querySelector('#comment');
    var list = document.querySelector('.comment-container');

    var nameValue = nameField.value;
    var commentValue = commentField.value;

    if(nameValue === null  || commentPara === null || nameValue.trim() === '' ||  commentValue.trim() === ''){
        showToast("Name and Comment must be filled")
        return 
    }

    var listItem = document.createElement('li');
    var namePara = document.createElement('p');
    var commentPara = document.createElement('p');
    
    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    nameField.value = '';
    commentField.value = '';
    
}

const toggleCommentButton = () => {
    var showHideBtn = document.querySelector('.show-hide');
    var commentWrapper = document.querySelector('.comment-wrapper');
    commentWrapper.style.display = 'none';

    showHideBtn.onclick = function() {
        var showHideText = showHideBtn.textContent;
 
        if (commentWrapper.style.display === 'none') { 
            showHideBtn.textContent = 'Hide comments';
            commentWrapper.style.display = 'block';
        } else {
            showHideBtn.textContent = 'Show comments';
            commentWrapper.style.display = 'none';
        }
    };

}

export {commentForm, toggleCommentButton}