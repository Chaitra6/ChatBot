import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {


  private allDetailsUrl = 'http://3.18.127.80:3000/allDetails';
  private baseUrl = 'http://3.18.127.80:3000/event';
  private pizzaUrl = 'http://3.18.127.80:3000/pizzadetails';
  private userUrl = 'http://3.18.127.80:3000/userdetails';

  constructor(private http: HttpClient) { }

  getMassage(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getDetailsById(id:String): Observable<any> {
    return this.http.get(`${this.allDetailsUrl}/${id}`);
  }

  putPizzaDetails(oid: String, pType:string, pName:string,
    pSize:string, pToppings:string, pCount:string, orderTime:string, price:number): Observable<any> {
   console.log("data",oid,pType,pName,pSize,pToppings,pCount,orderTime, price)
   const value ={
     oid : oid,
     pType : pType,
     pName: pName,
     pSize: pSize,
     pToppings: pToppings,
     pCount : pCount,
     orderTime : orderTime,
     price : price
      

   };
   return this.http.post(`${this.pizzaUrl}`,value);
 }

    putUserDetails(oid:String, name:string, email:string, phno:string, address:string ): Observable<any> {
    console.log("data",oid,name,email,phno,address)
    const value ={
      
      oid : oid,
      name : name,
      email : email,
      phno: phno,
      address : address
    };
    return this.http.post(`${this.userUrl}`,value);
  }

 

 
}
