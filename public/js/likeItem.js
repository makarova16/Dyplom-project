function likeItem(element) {
    if (authData.state) {
        const itemCategory = element.id.split('-')[1];
        const itemId = element.id.split('-')[2];
        var xhr = new XMLHttpRequest();
        var body = 'itemCategory=' + encodeURIComponent(itemCategory) +
            '&itemId=' + encodeURIComponent(itemId);
        xhr.open("POST", '/likeItem', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        document.getElementById(element.id).textContent = "Подобається вам";
        document.getElementById("emptyLikedListMsgLi").style.display = "none";
        const item = getFromArrayById(categories.arches, itemId);
        var li = document.createElement('li');
        var div = document.createElement('div');
        var img = document.createElement('IMG');
        var textDiv = document.createElement('div');
        textDiv.textContent = item.priceName;
        img.src = item.imagePath;
        div.appendChild(img);
        div.appendChild(textDiv);
        li.appendChild(div);
        document.getElementById("likedItemsUl").appendChild(li);
    }
};


function getFromArrayById(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            return array[i];
        }
    }
}