import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EN } from './EN';
import { Countries } from './countries';
/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class LanguageProvider {

  static getLang(data) {
    let response;
    switch ( data ) {
   
      case 'en':
        response = EN.en;
        break;
      case 'ki':
        response = EN.en;
        break;
      default:
        response = EN.en;
        break;
    }
   
    return response;
  }

  static getCountry() {
    return Countries.countries;
  }
}
