TeleCMI Agent Call Feed
===================


Javascript agent live call feed  SDK for india Virtual number and toll free number from TeleCMI cloud platform.




Documents
-------------

## **Install**

**npm**

    npm install telecmi-agent-livefeed
    
**yarn**

    yarn add telecmi-agent-livefeed

**Add to your page**

    <script src="dist/telecmi-agent-livefeed.min.js"></script>

## **Get Started**

**Create Telecmi Object**  

```javascript
var telecmi = new TeleCMI(); 
```

## Method
**Register**
Using our  [Agent Login API](https://doc.telecmi.com/chub#!/agent-login) you can get agent token. Using agent token you can create live call feed connection using following method. 
```javascript
telecmi.start('token')
```

## Connect Callback
**onConnect**
This callback will trigger once live call feed connection will try to establish with our TeleCMI platform.

**Connect**
 .
```javascript
  telecmi.onConnect=function(data){
  //Data is JSON it contain event and status
  };
```

***Example***
```javascript
  telecmi.onConnect=function(data){
  if(data.status=='connected'){
   //Live call feed ready start subscribe 
       telecmi.subscribeCalls();
     }else if(data.status=='error')
     {
        // Invalid token please check your token
     }
 };
```


**List of response**

 Status     | Description
|:-------------:|:-------------:| 
connected | Live call feed connection established |
error | Invalid token need to check token |


## Set Agent status  
**Online**

Make agent status online
```javascript
  telecmi.setOnline();
```

**Break**

Make agent status break/Away
```javascript
  telecmi.setBreak();
```

**Dialer**

Make agent status dialer
```javascript
  telecmi.setDialer();
```

## Subscribe 
**Call Events**
Subscribe incomming calls live feed
```javascript
  telecmi.subscribeCalls();
```

**Call Back**
 .
```javascript
  telecmi.onCalls=function(data){
  //Data is JSON it contain customer number,group id,time and call uuid
  };
```

***Example***
```javascript
  telecmi.onCalls=function(data){
   console.log(data.from) //customer number
   console.log(data.agent) //Agent Id
   console.log(data.time) //Incomming call time
   console.log(data.status) // incomming call status is it answered or still ringing
 };
```




**List of Response**

| action                                                                                                                         	| agent    	| group                  	| from            	| id        	| inetno      	| leguid                	| name                       	| uuid            	| state                                                                                                                                                                                         	|
|--------------------------------------------------------------------------------------------------------------------------------	|----------	|------------------------	|-----------------	|-----------	|-------------	|-----------------------	|----------------------------	|-----------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| It's define channel property "ch-c" = channel create ."ch-s" = channel state change like early,answer. "ch-d" = channel deleted 	| Agent id 	| Call receiving team id 	| customer number 	| record is 	| Your app id 	| customer channel uuid 	| customer name if you saved 	| agent call uuid 	| call status is it answered or ringing  'early' = Call ringing to agent 'answer' = Call answered by agent 'bridged' = Call established between customer and agent 'hangup' = Call disconnected 	|

```




