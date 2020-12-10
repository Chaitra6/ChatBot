import { Component, OnInit } from '@angular/core';
import { Button } from 'protractor';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private api:ChatbotService) { }
  answer=[];
  data:any=[];
  orderData:any={
    "orderid":null,
    "ptype": null,
    "pname": null,
    "psize": null,
    "pToppings": null,
    "pCount": null,
    "orderTime":null,
    "price":null
}

  userData:any={
    "name":null,
    "email":null,
    "phno":null,
    "address":null
  }

  ngOnInit(): void {
  }

  // if (event.keyCode === 13) {
    
  //   document.getElementById("myBtn").click();
  // }
  massage(massage:any)
  {
    this.data=massage.split(' ');
    console.log(this.data);
    (<HTMLInputElement>document.getElementById("form__input")).value=''
    if(massage==''){
      alert("Please Enter the Question")
    }

  
    this.api.getMassage().subscribe(data => {
      console.log(data)
      this.answer=data;
      for(let i=0;i<this.data.length;i++)
      {
        for(let j=0;j<this.answer.length;j++)
        {
          if(this.data[i]==this.answer[j].question){

            //user-input
            var userinput=document.createElement('div');
            userinput.innerHTML=this.data[i];
            //userinput.id="user";
            userinput.className="chatarea-inner user"
            userinput.style.borderRadius = "12px 12px 0 12px";
            document.getElementById('massage').appendChild(userinput);  
            
            var d = new Date();        
            var time = document.createElement('label');            
            time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
            time.className="time";
            userinput.appendChild(time);

            //bot img
            var x = document.createElement("IMG");
            x.setAttribute("src", "../../assets/bot-img.JPG");
            x.setAttribute("alt", "BotImg");
            x.className = "chatImg";           
            document.getElementById('massage').appendChild(x);

            //bot-reply
            var answer=document.createElement('div');
            answer.innerHTML=this.answer[j].answer;
            answer.className="chatarea-inner chatbot"
            answer.style.borderRadius = "12px 12px 12px 0";
            document.getElementById('massage').appendChild(answer);

            var d = new Date();        
            var time = document.createElement('label');            
            time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
            time.className="time";
            answer.appendChild(time);
           

            this.buttoncreate();
          }
        }
        
      }
    
    } , error => console.log(error));
  }
  
  
    buttoncreate(){
      var value = ["Order a Pizza", "Check your Order Details", "Close"];
      for(let i=0;i<3;i++){
        var btn = document.createElement('button');
        btn.innerHTML = value[i];
        btn.id = "user";
        btn.addEventListener('click',(e:Event)=>this.operation(i));
        btn.className="chatarea-inner btn"
       document.getElementById('massage').appendChild(btn);

      }
    }

    operation(i:any){
      if(i==0){

           this.buttoncreate1();
      }
      else if(i==1){
        this.iddetail();
      }
      else{
       
        alert("Thank You for Ordering a Pizza, Have Great Day :)") ;
        window.location.reload();
      }
    }

    //----------------------------------------Pizza-Type--------------------------------------
    buttoncreate1(){
     

      var x = document.createElement("IMG");
      x.setAttribute("src", "../../assets/bot-img.JPG");
      x.setAttribute("alt", "BotImg");
      x.className = "chatImg";           
      document.getElementById('massage').appendChild(x);


      var q= document.createElement("div");
      q.innerHTML="What type of Pizza would you like ? ";
      q.className="chatarea-inner chatbot";
      document.getElementById('massage').appendChild(q);

      var d = new Date();        
      var time = document.createElement('label');            
      time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
      time.className="time";
      q.appendChild(time);


      var newdata=["Veg","Non-Veg"]
      for(let i=0;i<2;i++){
       var btn=document.createElement('button');
       btn.innerHTML=newdata[i];
       btn.id="user";
       btn.addEventListener("click", (e:Event) => this.operation1(i));
        btn.className="chatarea-inner btn"
       document.getElementById('massage').appendChild(btn);
      
      }
     }

     //Pizza-Type
    operation1(i:any){
      if(i==0){
        this.orderData.ptype = 'Veg' ;
        this.vegOPbtn();
     }
      else{
        this.orderData.ptype = 'Non-Veg' ;
        this.nonvegOPbtn();
      }
    }



    //Veg Options button
   vegOPbtn(){
    var x = document.createElement("IMG");
    x.setAttribute("src", "../../assets/bot-img.JPG");
    x.setAttribute("alt", "BotImg");
    x.className = "chatImg";           
    document.getElementById('massage').appendChild(x);

    var q= document.createElement("div");
    q.innerHTML="Pick the Pizza of Your Choice... (V)";
    q.className="chatarea-inner chatbot";
    document.getElementById('massage').appendChild(q);

    var d = new Date();        
    var time = document.createElement('label');            
    time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
    time.className="time";
    q.appendChild(time);


    var newdata=["Double Cheese Margherita","Deluxe Veggie"]
    for(let i=0;i<2;i++){
     var btn=document.createElement('button');
     btn.innerHTML=newdata[i];
     btn.id="opID";
     btn.addEventListener("click", (e:Event) => this.vegOperation(i));
     btn.className="chatarea-inner btn";
     document.getElementById('massage').appendChild(btn);

     //gif-images
     var gif = document.createElement("img");
     gif.setAttribute("alt", "BotImg");
     gif.id = "gifImg";
     btn.append(gif);
     if(i==0){       
      gif.setAttribute("src", "../../assets/pizzaGif3.gif");
    }
     else{      
      gif.setAttribute("src", "../../assets/deluxvegie.gif");     
     }
      
    
    }

    }

    vegOperation(i:any){
      if(i==0){
        this.orderData.pname = "Double Cheese Margherita";
        this.vegPizzaSize1();     
      }
      else{
        this.orderData.pname = "Deluxe Veggie";
        this.vegPizzaSize2();
      }
    }


    vegPizzaSize1(){
      var x = document.createElement("IMG");
        x.setAttribute("src", "../../assets/bot-img.JPG");
        x.setAttribute("alt", "BotImg");
        x.className = "chatImg2";           
        document.getElementById('massage').appendChild(x);
        
        var q= document.createElement("div");
        q.innerHTML="How Large ? ";
        q.className="chatarea-inner chatbot";
        document.getElementById('massage').appendChild(q);

        var d = new Date();        
        var time = document.createElement('label');            
        time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
        time.className="time";
        q.appendChild(time);       

        var newdata=["Regular - Rs. 189","Medium - Rs. 339" , "Large - Rs. 539"]
        for(let i=0;i<3;i++){
        var btn=document.createElement('button');
        btn.innerHTML=newdata[i];
         btn.id="user";
         btn.addEventListener("click", (e:Event) => this.vegPizzaSizeOperation1(i));
         btn.className="chatarea-inner btn"
        document.getElementById('massage').appendChild(btn);
      
          }
    }

    vegPizzaSizeOperation1(i:any){
      if(i==0){
        this.orderData.psize = "Regular";
        this.orderData.price = 189;
        this.pizzatopping();
      }
      else if(i==1){
        this.orderData.psize = "Medium";
        this.orderData.price = 339;
        this.pizzatopping();
      }
      else{
        this.orderData.psize = "Large";
        this.orderData.price = 539;
        this.pizzatopping();
      }
    }



    vegPizzaSize2(){
      var x = document.createElement("IMG");
        x.setAttribute("src", "../../assets/bot-img.JPG");
        x.setAttribute("alt", "BotImg");
        x.className = "chatImg2";           
        document.getElementById('massage').appendChild(x);
        
        var q= document.createElement("div");
        q.innerHTML="How Large ? ";
        q.className="chatarea-inner chatbot";
        document.getElementById('massage').appendChild(q);

        var d = new Date();        
        var time = document.createElement('label');            
        time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
        time.className="time";
        q.appendChild(time);       

        var newdata=["Regular - Rs. 239","Medium - Rs. 459" , "Large - Rs. 699"]
        for(let i=0;i<3;i++){
        var btn=document.createElement('button');
        btn.innerHTML=newdata[i];
         btn.id="user";
         btn.addEventListener("click", (e:Event) => this.vegPizzaSizeOperation2(i));
         btn.className="chatarea-inner btn"
        document.getElementById('massage').appendChild(btn);
      
          }
    }

    vegPizzaSizeOperation2(i:any){
      if(i==0){
        this.orderData.psize = "Regular";
        this.orderData.price = 239;
        this.pizzatopping();
      }
      else if(i==1){
        this.orderData.psize = "Medium";
        this.orderData.price = 459;
        this.pizzatopping();
      }
      else{
        this.orderData.psize = "Large";
        this.orderData.price = 699;
        this.pizzatopping();
      }
    }
   



      // ------------------------------ Non-Veg  -------------------------------------

      nonvegOPbtn(){
        var x = document.createElement("IMG");
      x.setAttribute("src", "../../assets/bot-img.JPG");
      x.setAttribute("alt", "BotImg");
      x.className = "chatImg";           
      document.getElementById('massage').appendChild(x);

      var q= document.createElement("div");
      q.innerHTML="Pick the Pizza of Your Choice... (NV) ";
      q.className="chatarea-inner chatbot";
      document.getElementById('massage').appendChild(q);

      var d = new Date();        
      var time = document.createElement('label');            
      time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
      time.className="time";
      q.appendChild(time);

      var newdata=["Chicken Dominator","Chicken Golden Delight"]
      for(let i=0;i<2;i++){
      var btn=document.createElement('button');
      btn.innerHTML=newdata[i];
      btn.id="opID";
      btn.addEventListener("click", (e:Event) => this.nonvegOperation(i));
      btn.className="chatarea-inner btn"
      document.getElementById('massage').appendChild(btn);

       //gif-images
      var gif = document.createElement("img");
        gif.setAttribute("alt", "BotImg");
        gif.id = "gifImg";
        btn.append(gif);
        if(i==0){       
          gif.setAttribute("src", "../../assets/chiDominator.gif");
        }
        else{      
          gif.setAttribute("src", "../../assets/chickenGoldenD.gif");     
        }
     
    
    }
  }

      nonvegOperation(i:any){
        if(i==0){
          this.orderData.pname = "Chicken Dominator";
          this.non_vegPizzaSize1();
       }
        else{
          this.orderData.pname = "Chicken Golden Delight";
          this.non_vegPizzaSize2();
        }
      }


      non_vegPizzaSize1(){
        var x = document.createElement("IMG");
          x.setAttribute("src", "../../assets/bot-img.JPG");
          x.setAttribute("alt", "BotImg");
          x.className = "chatImg2";           
          document.getElementById('massage').appendChild(x);
          
          var q= document.createElement("div");
          q.innerHTML="How Large ? ";
          q.className="chatarea-inner chatbot";
          document.getElementById('massage').appendChild(q);
  
          var d = new Date();        
          var time = document.createElement('label');            
          time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
          time.className="time";
          q.appendChild(time);       
  
          var newdata=["Regular - Rs. 309","Medium - Rs. 579" , "Large - Rs. 839"]
          for(let i=0;i<3;i++){
          var btn=document.createElement('button');
          btn.innerHTML=newdata[i];
           btn.id="user";
           btn.addEventListener("click", (e:Event) => this.non_vegPizzaSizeOperation1(i));
           btn.className="chatarea-inner btn"
          document.getElementById('massage').appendChild(btn);
        
            }
      }
  
      non_vegPizzaSizeOperation1(i:any){
        if(i==0){
          this.orderData.psize = "Regular";
          this.orderData.price = 309;
          this.pizzatopping();
        }
        else if(i==1){
          this.orderData.psize = "Medium";
          this.orderData.price = 579;
          this.pizzatopping();
        }
        else{
          this.orderData.psize = "Large";
          this.orderData.price = 839;
          this.pizzatopping();
        }
      }
  
  
  
      non_vegPizzaSize2(){
        var x = document.createElement("IMG");
          x.setAttribute("src", "../../assets/bot-img.JPG");
          x.setAttribute("alt", "BotImg");
          x.className = "chatImg2";           
          document.getElementById('massage').appendChild(x);
          
          var q= document.createElement("div");
          q.innerHTML="How Large ? ";
          q.className="chatarea-inner chatbot";
          document.getElementById('massage').appendChild(q);
  
          var d = new Date();        
          var time = document.createElement('label');            
          time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
          time.className="time";
          q.appendChild(time);       
  
          var newdata=["Regular - Rs. 249","Medium - Rs. 459" , "Large - Rs. 699"]
          for(let i=0;i<3;i++){
          var btn=document.createElement('button');
          btn.innerHTML=newdata[i];
           btn.id="user";
           btn.addEventListener("click", (e:Event) => this.non_vegPizzaSizeOperation2(i));
           btn.className="chatarea-inner btn"
          document.getElementById('massage').appendChild(btn);
        
            }
      }
  
      non_vegPizzaSizeOperation2(i:any){
        if(i==0){
          this.orderData.psize = "Regular";
          this.orderData.price = 239;
          this.pizzatopping();
        }
        else if(i==1){
          this.orderData.psize = "Medium";
          this.orderData.price = 459;
          this.pizzatopping();
        }
        else{
          this.orderData.psize = "Large";
          this.orderData.price = 699;
          this.pizzatopping();
        }
      }
  


      //-------------------------- Toppings----------------------------------------

      pizzatopping(){
        var x = document.createElement("IMG");
        x.setAttribute("src", "../../assets/bot-img.JPG");
        x.setAttribute("alt", "BotImg");
        x.className = "chatImg";           
        document.getElementById('massage').appendChild(x);
        
        var q= document.createElement("div");
        q.innerHTML="Do you want Extra Toppings? ";
        q.className="chatarea-inner chatbot";
        document.getElementById('massage').appendChild(q);

        var d = new Date();        
        var time = document.createElement('label');            
        time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
        time.className="time";
        q.appendChild(time);
        
        var newdata=["Yes","No"];
        for(let i=0;i<2;i++){
            var btn=document.createElement('button');
            btn.innerHTML=newdata[i];
            btn.id="user";
            btn.addEventListener("click", (e:Event) => this.pizzaToppingOperation(i));
            btn.className="chatarea-inner btn"
            document.getElementById('massage').appendChild(btn);
      
          }
      }


      pizzaToppingOperation(i:any){
        if(i==0){
             this.toppingOp();
        }
    
        else{
          this.orderData.pToppings = "None";
          this.pizzaCountOp(); 
        }
      }

      //------------------- Toppings - YES ---------------------
      toppingOp(){
        var x = document.createElement("IMG");
        x.setAttribute("src", "../../assets/bot-img.JPG");
        x.setAttribute("alt", "BotImg");
        x.className = "chatImg";           
        document.getElementById('massage').appendChild(x);
        
        var q= document.createElement("div");
        q.innerHTML="Select one of the Topping... ";
        q.className="chatarea-inner chatbot";
        document.getElementById('massage').appendChild(q);

        var d = new Date();        
        var time = document.createElement('label');            
        time.innerHTML ="<br/>"+d.getHours()+":"+d.getMinutes();
        time.className="time";
        q.appendChild(time);        

        
        var newdata=["Onion - Rs. 30","Corn - Rs. 30","Cheese - Rs. 40"];
        for(let i=0;i<3;i++){
            var btn=document.createElement('button');
            btn.innerHTML=newdata[i];
           // btn.id="opID";
            btn.addEventListener("click", (e:Event) => this.pizzaToppingOperation2(i));
            btn.className="chatarea-inner btn"
            document.getElementById('massage').appendChild(btn);

               
      
          }

      }


      pizzaToppingOperation2(i:any){
        if(i==0){
          this.orderData.pToppings = "Onion";
          this.orderData.price += 30;  
          this.pizzaCountOp();        
        }
        else if(i==1){
          this.orderData.pToppings = "Corn";  
          this.orderData.price += 30; 
          this.pizzaCountOp(); 
        }    
        else{
          this.orderData.pToppings = "Cheese";
          this.orderData.price += 40;  
          this.pizzaCountOp(); 
        }
      }

      //----------------------------------- Pizza Count -----------------------------
      

      pizzaCountOp(){
        var x = document.createElement("IMG");
        x.setAttribute("src", "../../assets/bot-img.JPG");
        x.setAttribute("alt", "BotImg");
        x.className = "chatImg";           
        document.getElementById('massage').appendChild(x);
        
        var q= document.createElement("div");
        q.innerHTML="How many Pizza ? ";
        q.className="chatarea-inner chatbot";
        document.getElementById('massage').appendChild(q);

        var d = new Date();        
        var time = document.createElement('label');            
        time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
        time.className="time";
        q.appendChild(time);
        
        var newdata=["1","2","3"];
        for(let i=0;i<3;i++){
            var btn=document.createElement('button');
            btn.innerHTML=newdata[i];
            btn.id="user";
            btn.addEventListener("click", (e:Event) => this.pizzaCountOperation(i));
            btn.className="chatarea-inner btn"
            document.getElementById('massage').appendChild(btn);
      
          }
      } 


      pizzaCountOperation(i:any){
        if(i==0){
          this.orderData.pCount = "1";
          this.userDetail();
        }
        else if(i==1){
          this.orderData.pCount = "2";
          this.orderData.price *= 2 ;
          this.userDetail();
        }
        else if(i==2){
          this.orderData.pCount = "3";
          this.orderData.price *= 3 ;
          this.userDetail();
        }
      
      }  

      //-------------------------------------- USER-DETAILS -------------------------------------------------
      userDetail(){

        var x = document.createElement("IMG");
        x.setAttribute("src", "../../assets/bot-img.JPG");
        x.setAttribute("alt", "BotImg");
        x.className = "chatImg";           
        document.getElementById('massage').appendChild(x);
        
        var q= document.createElement("div");
        q.innerHTML="Great !! Let me take your Details :) ";
        q.className="chatarea-inner chatbot";
        document.getElementById('massage').appendChild(q);

        var d = new Date();        
        var time = document.createElement('label');            
        time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
        time.className="time";
        q.appendChild(time);        

        var btn=document.createElement('button');
        btn.innerHTML="SURE...";
        btn.id="user";
        btn.addEventListener("click", (e:Event) => this.userDetails());
        btn.className="chatarea-inner btn"
        document.getElementById('massage').appendChild(btn);

      }
      // ----------------------------- To Continue To order Pizza ---------------------------
      continueOp(){

        var q= document.createElement("div");
        q.innerHTML="Do You Want to Check Order Details / Order Pizza Again  ....? :) ";
        q.className="chatarea-inner chatbot";
        q.style.margin = "10px";
        document.getElementById('massage').appendChild(q);


        var d = new Date();        
        var time = document.createElement('label');            
        time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
        time.className="time";
        q.appendChild(time);       

        var newdata=["Yes","No"];
        for(let i=0;i<2;i++){
            var btn=document.createElement('button');
            btn.innerHTML=newdata[i];
            btn.id="user";
            btn.addEventListener("click", (e:Event) => this.continueOp1(i));
            btn.className="chatarea-inner btn"
            document.getElementById('massage').appendChild(btn);
      
          }

      }

      continueOp1(i:any){
          if(i==0){
           
            this.buttoncreate();
          }
          else{
            alert("Thank You for Ordering the Pizza, Have Great Day :)") ;
            window.location.reload();
          }
      }

      //--------------------- To take User-Details and saving data in the Backend  -------------------------------------------
      userDetails(){
    
        this.userData.name = prompt("First up, Whats Your Name?");
        this.validateName(this.userData.name);
        this.userData.phno = prompt("Your Mobile Number? ");
        this.validatePhno(this.userData.phno);
        this.userData.email = prompt("Your Email ? ");
        this.validateEmail(this.userData.email); 
        this.userData.address = prompt("Delivery Address? ");
        this.validateAddress(this.userData.address);
        var oid = Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));
        
        this.orderData.orderid = String(oid);

        var d = new Date();        
        this.orderData.orderTime =  d.getHours()+":"+d.getMinutes()+" "+d.getDate;        
        var maxDTime =  d.getHours() +":"+ d.getMinutes() + 30;    

              
          
          this.api.putPizzaDetails(this.orderData.orderid,this.orderData.ptype, this.orderData.pname, this.orderData.psize, this.orderData.pToppings, this.orderData.pCount, this.orderData.orderTime, this.orderData.price, maxDTime ).subscribe( data =>{
            console.log(data);
          },
          error => console.log(error));

          this.api.putUserDetails(this.orderData.orderid,this.userData.name, this.userData.email,this.userData.phno,this.userData.address).subscribe( data =>{
            console.log(data);
          }, 
          error => console.log(error));      
          
          var h3=document.createElement("h3")
          h3.className="h3" ;
          h3.innerHTML="Your Id : "+ this.orderData.orderid + "<br/>Total Price : Rs. "+ this.orderData.price ;
          document.getElementById('massage').appendChild(h3);

          this.continueOp();

          this.orderData.splice(0, this.orderData.length);
        
        
       
     
      }//message_details

//-------------------------------------    Validation   ---------------------------------
      //Validate Name
      validateName(name:any){
        if(name == ""){
          alert("Name Cannot be Empty...");
          name = prompt("Enter Your Name... ");
          this.validateName(name);
        }
        else{
          this.userData.name = name;
        }
      }


      //Validate Email
      validateEmail(email:any){
        var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(email.match(mailformat)){
          this.userData.email=email;
        }else{
            alert("You have entered an invalid email address!");
            email = prompt("Enter Your Email ID... ");
            this.validateEmail(email);
          }
      }


      //Validate-Phone No
      validatePhno(phno:any){
        var phnoformat = /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/;
        if(phno.match(phnoformat)){
          this.userData.phno=phno;
        }else{
            alert("You have entered an Invalid Phone Number!");
            phno = prompt("Enter Your Phone Number... ");
            this.validatePhno(phno);
        }
      }

      //Validate - Address
      validateAddress(addr : any){
        if(addr == ""){
          alert("Address Cannot be Empty...");
          addr = prompt("Enter Your Address... ");
          this.validateAddress(addr);
        }
        else{
          this.userData.address = addr;
        }
      }

      //-----------------------------------------------------------------------------------
    
    //To-Check Order Details  
    iddetail(){
      var value=prompt("Enter The Order Number...")      
      console.log(value);
   
      this.api.getDetailsById(value).subscribe( data => {
        console.log(data);      

         var h2=document.createElement('p')
         h2.innerHTML="Your Booking Id : "+data[0].orderID +" <br/>   "+"Your Booking Name : "+data[0].userName+" <br/> "
         +"Your Phone No. : "+data[0].userPhno+" <br/>  "+"Address : "+data[0].address+"<br/> "
         +"Pizza Name : "+data[0].pName+"<br/> "+"Pizza Size : "+data[0].pSize
         +" <br/> "+ "Total Price : Rs. "+data[0].price + "<br/>" + "Your Pizza Will Be Delivered in 30 mins :) " ;
         //data[0].maxDeliveryTime
         
         h2.className="h2"        
        document.getElementById('massage').appendChild(h2);
 
        var d = new Date();        
        var time = document.createElement('label');            
        time.innerHTML = "<br/>"+d.getHours()+":"+d.getMinutes();
        time.className="time";
        h2.appendChild(time); 
 
        this.buttoncreate();
 
      });
     
     
    }

   




  }



