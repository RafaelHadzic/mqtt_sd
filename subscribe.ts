import mqtt from "mqtt"
const protocol = 'mqtt'
const host = 'test.mosquitto.org'
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
    console.log('Connected')
    client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
 })
})
client.on('message', (topic: string, payload: { toString: () => any }) => {
    console.log(payload.toString())
})