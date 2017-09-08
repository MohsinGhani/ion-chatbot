import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  [x: string]: any;
  message: string;

  conversation: FirebaseListObservable<any[]>;
  @ViewChild("messagebox") chatBox: ElementRef;
  
  constructor(public navCtrl: NavController,private _AngularFireDatabase: AngularFireDatabase, private http: Http) {
    this.conversation = _AngularFireDatabase.list('/conversation');
    setTimeout(() => {
            this.ScrollToMessage();
        }, 2000)
  }
  sendMessage(){
    let send = { name: 'You', imageUrl: '../assets/images/user.png', text: this.message }
    this._AngularFireDatabase.list('/conversation').push(send);
    this.sendToBot()
    this.message = '';
  }

  sendToBot(){
    let botReply = { name: 'Bot', imageUrl: '../assets/images/bot.jpg', text: '' }
    let headers = new Headers() 
    headers.append(
      'Authorization', 'Bearer b74e0f82499f48d3a01c735824a47b95'
    )
    this.http.get('https://api.api.ai/api/query?v=20150910&query=' + this.message + '&lang=en&sessionId=898aae69-9d7d-4dd3-abeb-721ca2a44bb6&timezone=2017-03-24T21:10:33+0500', { headers: headers })
      .subscribe((response) => {
        botReply.text = response.json().result.fulfillment.speech;
        this._AngularFireDatabase.list('/conversation').push(botReply);
    });
  }

  ScrollToMessage() {
        if (this.chatBox) {
          console.log('ScrollToMessage', this.chatBox.nativeElement.scrollHeight)
            this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight - this.chatBox.nativeElement.clientHeight;
        }
    };

}
