$(document).ready(function(){
	var a, b, anchorTagsArray, userName;
		userName = $("span#name").text();
		console.log("Username fetched is : "+userName);
		a = "http://localhost:1234/user/";
		b = a + userName;
		anchorTagsArray = $("ul a");
		console.log(anchorTagsArray);
		$(anchorTagsArray[5]).attr('href', b+"#");
		$(anchorTagsArray[5]).attr('href', b+"/");
		$(anchorTagsArray[1]).attr('href', b+"/packages" );
		$(anchorTagsArray[2]).attr('href', b+"/online_bookings");
		$(anchorTagsArray[3]).attr('href', b+"/media");
		$(anchorTagsArray[4]).attr('href', b+"/contact_us");
		$(anchorTagsArray[6]).attr('href', b+"/logout");
	});
	
	
	// This file helps us fetch the logged in username , on line 4 and update the header tab links in header.pug .