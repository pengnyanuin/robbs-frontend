
import * as Ably from 'ably';

export class AblyService {
    constructor(room, onMessageReceivedCallback) {
        this.onMessageReceivedCallback = onMessageReceivedCallback;
        this.room = room;
    }

    connect() {
        // this.onMessageReceivedCallback = onMessageReceivedCallback;
        this.client = new Ably.Realtime({key: 'ZsUvHQ.XqJasQ:PV7-RJ87-fdXRJzYJMPGC_7BvRCHAa2TEc98H6k1H7o'});
        let connected = false;

        this.client.connection.on('connecting', function() {
            console.log('Connecting to Ably', 'orange');
        });

        this.client.connection.on('connected', function () {
            console.log('works')
            connected = true;
        });

        this.client.connection.on('failed', function () {
            console.log('nope')
        });

        this.channel = this.client.channels.get(this.room);

        this.channel.subscribe((message) => {
            // this.subscribeCallback(message);
            this.onMessageReceivedCallback(message);
        });

        return connected;
    }

    sendMessage(name, message) {
        this.channel.publish(name, message, function (err) {
            if (err) {
                console.log('publish failed with error ' + err);
            } else {
                console.log('publish succeeded');
            }
        })
    }

    subscribeCallback(message) {
        console.log(message.name);
        console.log(message.data);
    }
}
