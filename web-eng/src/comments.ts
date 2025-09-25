import { showToast } from "./utils.ts";


const commentForm = (e : Event) => {
    // Comment form stuff
    e.preventDefault();

    const nameField : HTMLInputElement | null = document.querySelector('#name');
    const commentField : HTMLInputElement | null = document.querySelector('#comment');
    const list = document.querySelector('.comment-container');

    if(nameField === null  || commentField === null || nameField?.value === null  || commentField?.value === null || nameField?.value.trim() === '' ||  commentField?.value.trim() === ''){
        showToast("Name and Comment must be filled")
        return 
    }

    const listItem : HTMLLIElement = document.createElement('li');
    const namePara : HTMLParagraphElement = document.createElement('p');
    const commentPara: HTMLParagraphElement = document.createElement('p');

    namePara.textContent = nameField.value;
    commentPara.textContent = commentField.value;

    if(list  !== null){

        list.appendChild(listItem);
        listItem.appendChild(namePara);
        listItem.appendChild(commentPara);

        nameField.value = '';
        commentField.value = '';    
    }

}

const toggleCommentButton = () => {
    const showHideBtn : HTMLButtonElement | null  = document.querySelector('.show-hide');
    const commentWrapper : HTMLDivElement | null = document.querySelector('.comment-wrapper');

    if(showHideBtn === null || commentWrapper === null){
        console.error("Can't wok with the comments ")
        return
    }

    commentWrapper.style.display = 'none';

    showHideBtn.onclick = function() { 
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