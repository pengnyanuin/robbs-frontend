
import * as Ably from 'ably';

export class AblyService {
    connect() {
        // this.onMessageReceivedCallback = onMessageReceivedCallback;
        this.client = new Ably.Realtime({key: 'ZsUvHQ.XqJasQ:PV7-RJ87-fdXRJzYJMPGC_7BvRCHAa2TEc98H6k1H7o'});

        this.client.connection.on('connected', function () {
            console.log('works')
        });

        this.client.connection.on('failed', function () {
            console.log('nope')
        });

        this.channel = this.client.channels.get('test');

        this.channel.subscribe((message) => {
            this.subscribeCallback(message);
        });
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
