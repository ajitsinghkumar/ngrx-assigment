import { addPost } from './../state/posts.actions';
import { Post } from './../../models/posts.model';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from '@angular/forms';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {Router} from '@angular/router';
import {PaymentService} from '../../service/payment.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit,OnChanges {
  postForm: FormGroup;
  inputdate:Date;
  currentDate:Date;
  warnningMessage=false;
  chackValue=false;
  constructor(private store: Store<AppState>,private formbuilder:FormBuilder,private service:PaymentService,private route:Router) {

    this.postForm=formbuilder.group({
      cardNumber:["",Validators.required],
      cardHoder:["",Validators.required],
      expirationDate:["",Validators.required],
      securityCode:["", [ Validators.minLength(3), Validators.maxLength(3)]],
      amout:["",Validators.required],

    });
  }

  ngOnInit(): void {
    
  }
  ngOnChanges(){

  }
  validateCardNumber() {
    const cardNumber = this.postForm.get('cardNumber');
    if (cardNumber.touched && !cardNumber.valid) {
      if (cardNumber.errors.required) {
        return 'Card number is required';
      }
    }
  }
  validateCardHolderName(){
    const cardHoder = this.postForm.get('cardHoder');
    if (cardHoder.touched && !cardHoder.valid) {
      if (cardHoder.errors.required) {
        return 'Card holder name is required';
      }
    }
  }
  validateCardDate(){
    const expirationDate = this.postForm.get('expirationDate');
    if (expirationDate.touched && !expirationDate.valid) {
      
      if (expirationDate.errors.required) {
        return 'Date is required';
      }
      // var GivenDate = '2018-02-22';
      //  var 
      //  GivenDate = new Date(GivenDate);
      
    }
  }
  checkDateGreater(){
    const expirationDate = this.postForm.get('expirationDate');
         this.inputdate=expirationDate.value;
         this.currentDate = new Date();
         this.inputdate=new Date(this.inputdate);
         if(this.inputdate<=this.currentDate){
          this.warnningMessage=true;
         }else{
          this.warnningMessage=false;
         }

  }
  validateSecurityCode()
  {
    const securityCode = this.postForm.get('securityCode');
    if (securityCode.touched && !securityCode.valid) {
         if (securityCode.errors.required) { return 'Code  is required'; }
         if (securityCode.errors.minlength) {return 'Please enter valid code';}
     }
  }
  validateCardAmount(){
    const amout = this.postForm.get('amout');
    if (amout.touched && !amout.valid) {
      if (amout.errors.required) {
        this.chackValue=false;
         return 'Amount  is required';
        }
    }
  }
  chackAmoutValue(){
    const amout = this.postForm.get('amout').value;
    if(amout<=0){
      this.chackValue=true;
    }else{
      this.chackValue=false;
    }
  }
  onAddPost() {
    
   if(this.warnningMessage || this.chackValue){
     return false;
   }
    const post: Post = {
      cardNumber: this.postForm.value.cardNumber,
      cardHolder: this.postForm.value.cardHoder,
      ExpirationDate: this.postForm.value.expirationDate,
      securityCode: this.postForm.value.securityCode,
      amount: this.postForm.value.amout,
    };

    this.store.dispatch(addPost({ post }));
    this.service.paymentNotification(post).subscribe(data=>{
         if(data){
           this.service.showSuccess("payment success", "payment");
           this.route.navigate(['/']);
         }else{
          this.service.showError("payment failed", "payment");
         }
         
    });
  }

  
}
