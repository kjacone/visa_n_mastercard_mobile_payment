import { Injectable } from '@angular/core';
import { Contacts, Contact } from '@ionic-native/contacts';


/*
  Generated class for the Contacts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactsProvider {
  contact:Contact;
  name:string;
  mycontact:any;

  constructor(private contacts: Contacts) {
    //console.log('Hello Contacts Provider');
  }
  
  pickContact(): Promise<any>{
  	return new Promise((resolve) => {
	  this.contacts.pickContact().then(data => {
        this.contact=data;
        let phoneNumbers=[];
        let contactSize= this.contact.phoneNumbers.length;
        for(var i=0;i<contactSize;i++){

        	let rawContact=this.contact.phoneNumbers[i].value.replace(/[^\d]/g, '').replace(/\D/g,'').replace('+','');//replace  non-digit characters with spaces
        	//let formattedContact=this.validateResponse(rawContact);
        	//if(formattedContact!=""){
	           //phoneNumbers.push(formattedContact);
	        //}

            console.log("Phone number selected", rawContact);
	        phoneNumbers.push(rawContact);
        }
        if(this.contact.displayName!=undefined||this.contact.displayName!=null){
	        this.name=this.contact.displayName;
	    }
	    else{
	    	this.name=" ";
	    }
	   
	    this.mycontact={phoneNo:phoneNumbers,name:this.name};
	    resolve(this.mycontact);
        
	  },(error: any) => console.error('Error retrieving contact.', error));

    });
  }

  retrieveAllContacts(): Promise<any[]>{
  	return new Promise((resolve) => {
	  this.contacts.find(['phoneNumbers','displayName'],
	  	{multiple: true, hasPhoneNumber: true}).then(contactList => {
          console.log('Retrieving all contacts yeah');

        let phonebook:any[]=[];
        let contactSize= contactList.length;
        let phone="";let name="";
        for(var i=0;i<contactSize;i++){

        	
        	if(contactList[i].displayName!=undefined||contactList[i].displayName!=null){
	           name=contactList[i].displayName;
	           phone=contactList[i].phoneNumbers[0].value.replace(/[^\d]/g, '').replace(/\D/g,'');//replace  non-digit characters with spaces
	           phonebook.push({phone:phone,name:name});
	        }

	        console.log("Name "+name);
	        console.log("Phonebook "+phone);
	       
        }
        

        resolve(phonebook);
	   
	   //this.navCtrl.push('PhoneBookPage',{contactList:phonebook});       
	  },(error: any) => console.error('Error retrieving contact.', error));
});
  }
  validateResponse(res){
  	let validateResponse="";
    if (res.indexOf("7") == 0) {
		res = "0" + res;
		if (!(/^\d{10}$/.test(res))) {
			validateResponse = "";
			return validateResponse;
		} else {
			validateResponse = res;
			return validateResponse;

		}
	} else if (res.substring(0, 4) == "+255") {
        
		if (!(/^\d{10}$/.test(res))) {
			validateResponse = "";
			return validateResponse;
		} else {
			validateResponse = res;
			return validateResponse;

		}

	} else if (res.substring(0, 3) == "255") {
		res = res.replace("255", "0");
		if (!(/^\d{10}$/.test(res))) {
			validateResponse = "";
			return validateResponse;
		} else {
			validateResponse = res;
			return validateResponse;

		}
	} else if (res.substring(0, 2) != "07") {
		validateResponse = "";
		return validateResponse;
	} else if (!(/^\d{10}$/.test(res))) {
		validateResponse = "";
		return validateResponse;
	} else {

		validateResponse = res;
		return validateResponse;
	}
    
  }

}
