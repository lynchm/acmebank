sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/base/Log",
	"sap/ui/core/format/DateFormat",
	"sap/ui/thirdparty/jquery"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	
	function (Controller, MessageToast, JSONModel, Log, DateFormat, jQuery) {
		"use strict";
		var sServiceUrl = "http://localhost:8080/api/accounts";
		return Controller.extend("acmebank.controller.Main", {
			onInit: function () {
				var oModel = new sap.ui.model.json.JSONModel();
				var that = this;
				$.ajax({
					url : sServiceUrl,
					type : "GET",
					async: false,
			  success: function(data, textStatus, jqXHR) {
					var balances = [];
					console.log(data); 
					oModel.setData(data);
					that.getView().setModel(oModel);
					data.forEach(function(account_item) {
					   balances.push(account_item.balance);
					});
					that.calculateBalance(balances);
			     },fail: function(jqXHR, textStatus, error){
					console.log(jqXHR.responseText);
				 }
				})
		
			},
			
			//function for calculating total account balance 
			calculateBalance: function(params) {
				var that = this;
				var balance = 0;
				balance = params.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
				console.log(balance);
				that.getView().byId("balancetotal").setNumber(balance);
			},
			//withdrawal button click
			onWithdrawalButton: function(params) {
				alert("Success");
				var oButton = params.getSource();
				oButton.setEnabled(false);
			}
		});
	});
