import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { AlertServiceProvider } from '../../providers/alert-service/alert-service';
import { ClientdataProvider } from '../../providers/clientdata/clientdata';
import { isNullOrUndefined } from "util";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LanguageProvider } from '../../providers/language/language';
/**
 * Generated class for the GepgPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-gepg',
	templateUrl: 'gepg.html',
})
export class GepgPage {
	title: string = "";
	accounts: any = [];
	objectblock: any = {};
	body: any;
	data: any;
	pptdata: any;
	header: any;
	token: any;
	field100: string = "";
	field25: string = "";
	scan_qr: string = "";
	amountForm: boolean = false;
	authorities: any = [];
	amountForm2: boolean = false;
	amountForm1: boolean = false;
	amountForm3: boolean = false;
	currency: string = "TZS";
	field104: string = "";
	selectionType: string = "enter";
	langs: any = [];
	data_response: boolean = false;
	general: any = {};
	constructor(public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider
		, public loadingController: LoadingController, public modalCtrl: ModalController,
		public clientdata: ClientdataProvider,
		public alertService: AlertServiceProvider) {
this.general = LanguageProvider.getLang('en').general;
		this.accounts = this.globalVars.getAccounts();
		this.objectblock.account = this.accounts[0];

		this.authorities = [{ name: "Police", val: "SP108" }, { name: "Immigration", val: "SP109" }, { name: "Others", val: "" }];
		this.objectblock.authority = this.authorities[0];
		this.scan_qr = this.langs.scan_qr;


	}

	submits() {
		let data = this.data.value;
		data.type = "1001"
		data.phoneNumber = this.globalVars.mobileNo;
		this.alertService.showDefaultLoading();
		this.globalVars.logger("Request: ", JSON.stringify(data));
		this.clientdata.sendData(data)
			.subscribe(data => {
				this.alertService.dismissDefaultLoading();
				if (data.length != 0) {

					let r_data = JSON.parse(data);
					console.log("Response: ", r_data);
					if (r_data.f39 == "00") {
						// this.getOTP(r_data);

					} else {
						//  this.navCtrl.setRoot( this.navCtrl.getPrevious() );
						this.alertService.errorPop("", r_data.f48, true);
					}


				} else {

					this.alertService.errorPop("", this.general.timeout, true);
				}
			}, error => {
				this.alertService.dismissDefaultLoading();
				this.alertService.errorPop("", this.general.conn, true);
			});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GepgPage');
	}
	makeRequest() {

			this.data_response = true;
			let body = this.body;
			let header = this.token;

			// this.apiConnect.load(body, header).then(data => {
			// 	this.data_response = false;
			// 	this.data = data;
			// 	let response = JSON.parse(this.data.mwalletdetails);
			// 	response = response.map;
			//
			// 	if (response.status == "00") {
			// 	this.alertService.errorPop("", 'Transaction successful',true);
			// 	}
			// 	else {
			// 		this.alertService.errorPop("", response.field48,true);
			// 	}
			//
			//
			// });


	}
	submit() {
		if (this.objectblock.accountto == "" || this.objectblock.accountto == undefined) {

			this.alertService.errorPop("", 'Kindly enter a valid card number', true);
		}
		else {
			this.token = this.globalVars.createToken();
			this.field25 = this.objectblock.accountto.substring(2, 5);
			this.field25 = "SP" + this.field25;
			this.field100 = "GEPG_INQ";


			// if(objectblock.authority.val!=this.field25&&objectblock.authority.val!=""){
			if (this.objectblock.accountto.substring(0, 2) != "99") {

				this.alertService.errorPop("", 'Kindly enter a valid Control number', true);
			}
			else {
				let fnCode = "";


				this.body = JSON.stringify({

				});

				this.processInquiry();
			}
		}

	}
	processInquiry() {

		this.data_response = true;
		let body = this.body;
		let header = this.token;

		// this.apiConnect.load(body, header).then(data => {
		// 	this.data_response = false;
		// 	this.data = data;
		// 	let response = this.data;
		// 	let details = response;
		// 	details = JSON.parse(details.mwalletdetails);
		// 	if (this.data != isNullOrUndefined) {
		//
		// 		if (response.status == '00') {
		//
		//
		// 			console.log('gepg Data:', details.map);
		// 			this.pptdata = details.map;
		// 			this.amountForm = true;
		// 			this.field104 = this.pptdata.field48;
		// 			if (this.pptdata.BillPayOpt == "EXACT") {
		// 				this.objectblock.amount = this.pptdata.BillAmt
		// 				this.amountForm3 = true;
		// 			} else {
		//
		// 				this.amountForm1 = true;
		// 			}
		//
		// 		} else {
		// 			let message = JSON.parse(this.data.mwalletdetails);
		// 			let meso = "";
		// 			if (message.hasOwnProperty('map')) {
		// 				meso = message.map.field48;
		// 			} else {
		// 				meso = message.field48;
		// 			}
		// 			let template = "<div>" + meso + "</div>";
		// 			this.alertService.errorPop("", meso, true);
		//
		// 		}
		// 	} else {
		// 		this.alertService.errorPop("", 'your request failed', true);
		//
		// 	}
		//
		//
		//
		// });
	}

scanQR(){
	console.log("Scanning QR");
	this.barcodeScanner.scan().then((barcodeData) => {
		// Success! Barcode data is here
		// this.objectblock.accountto=barcodeData.text;
		let barcodeResponse = JSON.parse(barcodeData.text);
		this.objectblock.accountto = barcodeResponse.Control_number;
		// this.objectblock.agentName = barcodeResponse.BUSINESSNAME;
		// this.objectblock.floatAccount = barcodeResponse.FLOATACCOUNT;
		// this.onBlurFetchAgentDetails();
	}, (err) => {

	});
}
home(){
	this.navCtrl.setRoot('MainPage');
}
submitAmount(objectblock) {

	this.field100 = "GEPG_PAY";
	if (objectblock.accountto == "" || objectblock.accountto == undefined) {

		this.alertService.errorPop("", 'Kindly enter a valid account number', true);
	}
	else if (objectblock.amount == "" || objectblock.amount == undefined) {
		this.alertService.errorPop("", 'Kindly enter a valid amount', true);
	}



	else {



		this.token = this.globalVars.createToken();
		this.body = JSON.stringify({
		});


		let template = "<div>Make payment to GEGP " + this.currency + "." + objectblock.amount + "<br> From account: " + objectblock.account
			+ " For account number: " + objectblock.accountto + "</div>";
		let obj = { body: this.body, template: template, completed: false, pageTo: 'standard' };
		let myModal = this.modalCtrl.create('ConfirmModalPage', obj);
		myModal.present();
		myModal.onDidDismiss(data => {
			console.log("Data =>" + data);
			if (data) {
				this.makeRequest();
			}
			else {

			}
		})
	}


}


}
