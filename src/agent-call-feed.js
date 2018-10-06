"use strict";
window.TeleCMI = (function() {
    var self = this;


    this.socket = {};


    TeleCMI.prototype.start = function(token) {
        if (!token) {

            this.onStatus({ status: 'error', msg: 'Invalid token' });
            return;
        }
        this.socket = io('https://live.telecmi.com', { query: { token: token } })



        // Agent List 
        this.socket.on('agents-list', function(data) {
            self.onAgents(data);
        })


        this.socket.on('connect', function() {
            self.onConnect({ status: 'connected' })
        });


        this.socket.on('error',function(err){
            self.onConnect({ status: 'error',msg:err})
        });

        this.socket.on('connect_failed',function(err){
            self.onConnect({ status: 'error',msg:err})
        })

        // On going Calls
        this.socket.on('call-feed', function(data) {
            self.onCalls(data);
        })

        // On call status
        this.socket.on('cmi-status', function(data) {
            self.onStatus(data)
        })

        // On incomming call count
        this.socket.on('live-call-feed', function(data) {
            self.onCount(data)
        })

        // Answered agent count
        this.socket.on('agent-bridged', function(data) {
            self.onagentAnswer(data)
        })

        // Answered customer count
        this.socket.on('customer-bridged', function(data) {
            self.onAnswer(data)
        })

    }

    //Subscribe call update
    TeleCMI.prototype.subscribeCalls = function() {

        this.socket.emit('subscribe-call-feed', { task: 'call feed subscribe' })
    }

    //Subscribe agent update
    TeleCMI.prototype.subscribeAgents = function() {

        this.socket.emit('subscribe-agents-list', { task: 'agent list subscribe' })
    }


     //Subscribe agent update
    TeleCMI.prototype.getFeed = function() {

        this.socket.emit('get-feed',{task:'get feed'});
    }

   


    // Calls  callback
    TeleCMI.prototype.onCalls = function(data) {}

    // Agents  callback
    TeleCMI.prototype.onAgents = function(data) {}

    // Agents  callback
    TeleCMI.prototype.onStatus = function(data) {}

    // Agents  callback
    TeleCMI.prototype.onCount = function(data) {}

    TeleCMI.prototype.onConnect = function(data) {}

    //Answered Agents
    TeleCMI.prototype.onagentAnswer = function(data) {}

    //Custamer Answered
    TeleCMI.prototype.onAnswer = function(data) {}


})