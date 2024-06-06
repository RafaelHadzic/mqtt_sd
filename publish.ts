import mqtt from "mqtt"
import schedule from "node-schedule"
const protocol = 'mqtt'
// const host = 'test.mosquitto.org'
const host = 'test.mosquitto.org'
// const host = '3.92.79.244'
// const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `${protocol}://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
})
const topic = '/semaforo/ecos02/qty'
client.on('connect', () => {
    const job = schedule.scheduleJob('*/1 * * * *', function(){
        const message: string = JSON.stringify([{
            "time": `${new Date().toLocaleString()}`,
            "street1": `${Math.floor(Math.random() * 30)}`,
            "street2": `${Math.floor(Math.random() * 30)}`,
        }])
        client.publish(topic, message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    });
})