import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
  
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient,private toastr:ToastrService) { }

  paymentNotification(paymentdata){
    return this.http.post("https://jsonplaceholder.typicode.com/posts",paymentdata);
  }

   showSuccess(message,title){
     this.toastr.success(message, title);
   }
   showError(message,title){
     this.toastr.error(message,title);
   }
}
