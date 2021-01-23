$(document).ready(() => {
    var rantContainer = $(".rants");
    var theRants;

    $.get("/api/rants").then(data => {
        console.log(data);
        theRants = data;
        initializeRows();
    });

    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        rantContainer.empty();
        var rantsToAdd = [];
        for (var i = 0; i < theRants.length; i++) {
            rantsToAdd.push(createNewRow(theRants[i]));
        }
        rantContainer.append(rantsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(rant) {
        var formattedDate = new Date(rant.createdAt).toLocaleDateString();
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var newPostTitle = $("<h2>");
        var resLink = $("<a>");
        resLink.attr('href', '/restaurant?name=' + rant.restaurant_name);
        var newPostDate = $("<small>");
        var userLink = $("<a>");
        userLink.attr('href', '/user?user_id=' + rant.User.id);
        var newPostAuthor = $("<h5>");
        newPostAuthor.text("Written by: " + rant.User.username);
        newPostAuthor.css({
            float: "right",
            color: "blue",
            "margin-top": "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(rant.restaurant_name + " ");
        newPostBody.text(rant.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(resLink);
        resLink.append(newPostTitle);
        newPostCardHeading.append(userLink);
        userLink.append(newPostAuthor);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("rant", rant);
        return newPostCard;
    }

});