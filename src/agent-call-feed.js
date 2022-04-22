"use strict";
window.CHUB = ( function () {
    var self = this;


    this.socket = {};


    CHUB.prototype.start = function ( token ) {


        if ( !token ) {

            this.onStatus( { status: 'error', msg: 'Invalid token' } );
            return;
        }


        this.socket = io( 'https://live.telecmi.com', { query: { token: token } } )


        // List of agents
        this.socket.on( 'agents-list', function ( data ) {
            self.onAgents( data );
        } )

        // Ongoing live calls
        this.socket.on( 'call-feed', function ( data ) {

            self.onCalls( data );
        } )

        //Callback list
        this.socket.on( 'callback-list', function ( data ) {
            self.onCallback( data )
        } )

        //Agent status
        this.socket.on( 'cmi-status', function ( data ) {
            self.onStatus( data )
        } )

        //incoming call count
        this.socket.on( 'live-call-feed', function ( data ) {
            self.onCount( data )
        } )

        // Agent bridge
        this.socket.on( 'agent-bridged', function ( data ) {
            self.onagentAnswer( data )
        } )

        //customer bridge
        this.socket.on( 'customer-bridged', function ( data ) {
            self.onAnswer( data )
        } )

    }

    //Subscribe agent update
    CHUB.prototype.subscribeAgents = function ( inetno ) {

        this.socket.emit( 'subscribeadmin-agents-list', { inetno: inetno } )
    }

    //Remove Listener
    CHUB.prototype.removeAllListeners = function ( inetno ) {

        this.socket.removeAllListeners();
    }



    //Nation call barging
    CHUB.prototype.callBarging = function ( uuid, to, myid ) {
        if ( !uuid ) {

            this.onStatus( { status: 'error', msg: 'Invalid UUID' } );
            return;
        }
        this.socket.emit( 'admin-call-barging', { uuid: uuid, to: to, myid: myid } )
    }


    //Global call barging
    CHUB.prototype.globalBarging = function ( uuid, to ) {

        if ( !uuid ) {

            this.onStatus( { status: 'error', msg: 'Invalid UUID' } );
            return;
        }



        this.socket.emit( 'admin-call-globalbarging', { uuid: uuid, to: to } )
    }



    //Subscribe agent update
    CHUB.prototype.subscribeCalls = function ( inetno ) {
        this.socket.emit( 'admin-get-feed', { inetno: inetno } )
    }


    //Subscribe live call feeds
    CHUB.prototype.monitorCalls = function ( inetno ) {
        if ( !inetno ) {

            this.onStatus( { status: 'error', msg: 'Invalid APP ID' } );
            return;
        }

        this.socket.emit( 'admin-call-feed', { inetno: inetno } )
    }



    //List of calls
    CHUB.prototype.onCalls = function ( data ) { }

    // List of agents
    CHUB.prototype.onAgents = function ( data ) { }

    //List of agent status 
    CHUB.prototype.onStatus = function ( data ) { }

    //Ongoing calls count
    CHUB.prototype.onCount = function ( data ) { }

    //Answered agents count
    CHUB.prototype.onagentAnswer = function ( data ) { }

    //Total answered call
    CHUB.prototype.onAnswer = function ( data ) { }

    //callback list
    CHUB.prototype.onCallback = function ( data ) { }


} )