import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {


  private allDetailsUrl = 'http://localhost:8080/allDetails';
  private baseUrl = 'http://localhost:8080/event';
  private pizzaUrl = 'http://localhost:8080/pizzadetails';
  private userUrl = 'http://localhost:8080/userdetails';

  constructor(private http: HttpClient) { }

  getMassage(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getDetailsById(id:String): Observable<any> {
    return this.http.get(`${this.allDetailsUrl}/${id}`);
  }

  putPizzaDetails(oid: String, pType:string, pName:string,
    pSize:string, pToppings:string, pCount:string, orderTime:string, price:number, maxDeliveryTime:any ): Observable<any> {
   console.log("data",oid,pType,pName,pSize,pToppings,pCount,orderTime, price, maxDeliveryTime)
   const value ={
     oid : oid,
     pType : pType,
     pName: pName,
     pSize: pSize,
     pToppings: pToppings,
     pCount : pCount,
     orderTime : orderTime,
     price : price,
     maxDeliveryTime : maxDeliveryTime      

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

 

  // putDetails(id: String, name:string, email:string, phno:string, address:string, ptype:string, pName:string,
  //    pSize:string, pToppings:string, pCount:string ): Observable<any> {
  //   console.log("data",id,name,email,phno,address,ptype,pName,pSize,pToppings,pCount)
  //   const value ={
  //     id : id,
  //     name : name,
  //     email : email,
  //     phno: phno,
  //     address : address,
  //     ptype : ptype,
  //     pName: pName,
  //     pSize: pSize,
  //     pToppings: pToppings,
  //     pCount : pCount      

  //   };
  //   return this.http.post(`${this.detailUrl}`,value);
  // }
}
