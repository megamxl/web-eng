//SEARCH
document.querySelector('.search').addEventListener('submit', function(e){
    searchForOccurrences(e, this);
});

const searchForOccurrences = (e, form) => {
    e.preventDefault();

    document.querySelectorAll('.highlight').forEach(function(el) {
        let parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
    });


    let searchKey = form.q.value.trim();
    if (!searchKey) {
        showToast("Enter a search query")
        return;
    }

    var regex = new RegExp('(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');

    let found =false

    function walk(node) {
        if (node.nodeType === 3) { // Text node
            const match = node.nodeValue.match(regex);
            if (match) {
                let span = document.createElement('span');
                span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
                node.replaceWith.apply(node, span.childNodes);
                found = true
            }
        }
        else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'FORM') {
            node.childNodes.forEach(walk);
        }
    }

    //easy fix for the article
    document.querySelectorAll('article').forEach(article => walk(article));

    if(!found) showToast("No match Found")
};


const showToast = (message, duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    const container = document.getElementById('toast-container');
    container.appendChild(toast);

    // Trigger CSS animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => container.removeChild(toast), 400); // wait for transition
    }, duration);
}


