function showLiked() {
    if (document.getElementById("likedItemsDiv").style.display == "block") {
        console.log('d');
        document.getElementById("likedItemsDiv").style.display = "none";
    } else { // той дисплей, що треба поки block
        document.getElementById("likedItemsDiv").style.display = "block";
    }
}