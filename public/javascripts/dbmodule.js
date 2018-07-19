var mongojs = require('mongojs');
var db = mongojs('db', ['DashboardUsers']);
var server = require('../../routes/route.js');
var path = require('path');
var session = require('express-session');

exports.saveUser = (username,firstname,lastname,pass,res) => {  //saving User to dB open 
	db.DashboardUsers.findOne({"username":username}, (err, user) => {
		console.log("Finding users...");
		if(err) {
			console.log("error is " + err);
		} else if(!user) {
			db.DashboardUsers.save({"username":username,"firstname":firstname,"lastName":lastname,"pass":pass}, function(err, saved) {
				if( err || !saved ) {
					console.log("User not saved");
					console.log(err);
					// res.render('error', { message: 'Sorry  ' + username + ' ,is already registered with us !', linked:'http://localhost:1010/register' });
					//res.send('<p style ="font:1.2em trebuchet MS;color:SteelBlue;"> Sorry  ' + username + ' ,this username is already registered at E-Wallet , Kindly try to <a href="http://localhost:1010/register"> register </a> with a different one !!</p>');		
				}
				else {
					console.log("User saved");
					res.redirect('/');
				}
			}); //save Query end }
		} else {
			console.log("User already exists");
			res.render('error', { message: 'Sorry  ' + username + ' ,is already registered with us !'});
		}
	});
}//saving User to dB end

// exports.saveUser = function(username,firstname,lastname,pass,res) {  //saving User to dB open 
// 	console.log('Saving user to mongo');
// 			db.DashboardUsers.save({"username":username,"firstname":firstname,"lastName":lastname,"pass":pass}, function(err, saved) {
// 				if( err || !saved ) {
// 					console.log("User not saved");
// 					console.log(err);
// 					// res.render('error', { message: 'Sorry  ' + username + ' ,is already registered with us !', linked:'http://localhost:1010/register' });
// 					//res.send('<p style ="font:1.2em trebuchet MS;color:SteelBlue;"> Sorry  ' + username + ' ,this username is already registered at E-Wallet , Kindly try to <a href="http://localhost:1010/register"> register </a> with a different one !!</p>');		
// 				}
// 				else {
// 					console.log("User saved");
// 					res.redirect('/');
// 				}
// 			}); //save Query end }
// }//saving User to dB end

exports.authenticateUser = (username,pass,res) => {
	db.DashboardUsers.find({"username":username,"pass":pass},  (err, users) => {
	console.log("user is " + users);
	
  	if(err || (users.length==0)){		  
		console.log("error is " + err);
   		console.log("..Not authorized user");
   		res.render('error', { message: 'Sorry Invalid credentials !', linked:'http://localhost:1010/' });
	}
  	else{
    	console.log("Authorized user");
		//res.render('LoginHome', { title: 'Welcome to Dashboard', userName : username });
		res.redirect('user/'+username+'/loginHome');
 		
	}
	}); // findUser Qquery end
} //authenticateUser function end 

exports.retrieveUser = (username,res) => {
	db.DashboardUsers.find({"username":username},(err, users) => {
		console.log(users);
		console.log(users[0].firstname);
	console.log("user is " + users);
	  	if(err || (users.length==0)){
   		console.log("Error in finding the username ");
   		res.send(err);
	}
  	else{
    	console.log("Found in DB");
		server.names(users);
 	}
	}); // findUser Query for My Profile Page end 
} //retrieveUser function end 
	
// exports.addMoney = function(username,acBalance,amt,res){
// 	var today = new Date().toLocaleString();
// 	console.log("Money is getting added on"+today);
// 	db.AdventureUsers.update({"username":username},{$set:{"balance":acBalance}}, function(err, AdventureUsers) {
// 		db.Transactions.insert({"username":username,"amount":amt,"transactionType":"Money Added","Date" : today}, function(err, Transactions) {
// 		console.log(AdventureUsers.nModified)
// 	  	if(err || (AdventureUsers.nModified==0)||(Transactions.nInserted == 0) ){
//    		console.log("Error in Updating the Balance and also transaction table ");
//    		res.send(err);
// 	}
//   	else{
//     	console.log("Balance Updated in DB");
// 			res.redirect('user/'+username+'/myTransactions');
//  	}
// 		});//Data added in Transactions table Query end
		
// 	}); // Balance Updated For User in Add Money
	
// } //addMoney function end 

// exports.checkUser = function(senderUserName, receiverUserName, senderBalance,receiverAmount,res) {
// 	var today = new Date().toLocaleString();
// 	console.log("Money is being sent  on"+today);
// 	db.AdventureUsers.find({"username":receiverUserName}, function(err, AdventureUsers) {
		
// 	console.log("user is " + AdventureUsers);
// 	console.log("error is " + err);
	
// 	if(err || (AdventureUsers.length==0)){
   		
// 		res.render('error', { message: 'Sorry '+receiverUserName+' is not a Express Wallet User. You can send money to other Express Wallet Users only.', linked:'javascript:history.back()' });
		
// 		//res.send("..Not existing user, so transaction not added to the transaction table");
// 	}
//   	else{
// 		db.Transactions.insert({"username":senderUserName,"amount":receiverAmount,"transactionType":"Money Sent to "+receiverUserName,"Date" :today}, function(err, Transactions) {
			
// 		var receiverBal = AdventureUsers[0].balance + receiverAmount ;
// 		console.log("Type of receiver Bal" + typeof(receiverBal));
// 		console.log("Type of AdventureUsers.balance" + typeof(AdventureUsers[0].balance));
// 		console.log(" receiver Bal" + receiverBal);
// 		console.log(" AdventureUsers.balance" + AdventureUsers[0].balance);
// 		console.log("Senders Balance is received from server as" + senderBalance);
// 		console.log("Type of Senders Balance is received from server as" + typeof(senderBalance));
// 		//Update Balance for receiver
// 		db.AdventureUsers.update({"username":receiverUserName},{$set:{"balance":receiverBal}},
// 		function(err, AdventureUsers) {
// 			console.log(AdventureUsers.nModified)
// 			if(err || (AdventureUsers.nModified==0)){
// 			console.log("Error in Updating the Balance for receiver");
// 			res.send(err); 
// 			}
// 			else{
// 			console.log("receiver's balance is updated as!!" +receiverBal);
// 		}
// 		});//receiver Bal Update Query end
		
// 		//Update Balance for Sender
// 		db.WalletUsers.update({"username":senderUserName},{$set:{"balance":senderBalance}},
// 		function(err, WalletUsers) {
// 		console.log(WalletUsers.nModified)
// 	  	if(err || (WalletUsers.nModified==0)){
//    		console.log("Error in Updating the Balance for Sender");
//     	res.send(err); 
// 		}
// 		else{
// 			console.log("Sender's balance is updated as!!"+senderBalance);
// 			res.redirect('user/'+senderUserName+'/myTransactions');
// 		}
// 		});//Sender Bal Update Query end
// 		}); //Data added in Transactions table Query end
// 		} // Else , if user is existing end 
// 	}); // Find receiver Query Name end 

// } // checkUser function end 
	
// exports.getTransactions = function(username,acBalance,res){
// 	db.Transactions.find({"username":username}||{"transactionType": {$regex : ".*"+username+".*"}}, function(err, Transactions) {
		
// 	  	if(err || (Transactions.length==0)){
//    		console.log("Error getting the transactions ");
//    		res.send(err);
// 	}
//   	else{
//     	console.log("Transactions retrieved")
// 		console.log(Transactions)
// 		var list = Transactions ; // printing an array in js 
// 		res.send(list);
//  	}
// 	}); // Transactions Query End 
// }
	
// exports.rechargeDone = function(username,amount,mobileNumber,acBalance,res){
// 	var today = new Date().toLocaleString();
// 	console.log("Recharging mobile on"+today);
// 	db.WalletUsers.update({"username":username},{$set:{"balance":acBalance}}, function(err, WalletUsers) {
// 	db.Transactions.insert({"username":username,"amount":amount,"transactionType":"Recharge Done For "+mobileNumber,"Date" :today}, function(err, Transactions) {
// 		if(err || (WalletUsers.nModified==0)||(Transactions.nInserted == 0) ){
// 					console.log("Error in Recharging your mobile ");
// 					res.send(err);
// 		}
// 		else{
//     	console.log("Mobile Successfully Recharged");
// 			res.redirect('user/'+username+'/myTransactions');
// 		}
// 	});//Data added in Transactions table For Mobile Recharge Query end
// 	});//Balance updated in WalletUsers table For Mobile Recharge Query end
// } //rechargeDone function end 


// exports.purchaseVoucher = function(username,amount,acBalance,res){
// 	var today = new Date().toLocaleString();
// 	console.log("Purchasing Gift Voucher on"+today);
// 	db.WalletUsers.update({"username":username},{$set:{"balance":acBalance}}, function(err, WalletUsers) {
// 	db.Transactions.insert({"username":username,"amount":amount,"transactionType":" Purchased Gift Voucher ","Date" :today}, function(err, Transactions) {
// 		if(err || (WalletUsers.nModified==0)||(Transactions.nInserted == 0) ){
// 					console.log("Error in Purchasing your gift Voucher");
// 					res.send(err);
// 		}
// 		else{
//     	console.log("Gift Voucher Purchased");
// 			res.redirect('user/'+username+'/myTransactions');
// 		}
// 	});//Data added in Transactions table For Purchasing Gift Voucher Query end
// 	});//Balance updated in WalletUsers table For Purchasing Gift Voucher Query end
// } //purchaseVoucher function end 

// exports.bookMovie = function(username,movie,ticketCount,amount,acBalance,res){
// 	var today = new Date().toLocaleString();
// 	console.log("Purchasing Movie Tickets"+today);
// 	db.WalletUsers.update({"username":username},{$set:{"balance":acBalance}}, function(err, WalletUsers) {
// 	db.Transactions.insert({"username":username,"amount":amount,"transactionType":ticketCount+" Ticket(s) bought for Movie "+movie,"Date" :today}, function(err, Transactions) {
// 		if(err || (WalletUsers.nModified==0)||(Transactions.nInserted == 0) ){
// 					console.log("Error in Purchasing your movie tickets ");
// 					res.send(err);
// 		}
// 		else{
//     	console.log("Movie Tickets Booked !");
// 			res.redirect('user/'+username+'/myTransactions');
// 		}
// 	});//Data added in Transactions table For Buying Movie Ticket Query end
// 	});//Balance updated in WalletUsers table For Buying Movie Ticket Query end
// }