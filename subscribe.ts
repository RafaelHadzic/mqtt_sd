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
    
    const message = JSON.parse(payload.toString())
    
    const tempoRua1 = message[0]['street1'] * 4 + 10
    const tempoRua2 = message[0]['street2'] * 4 + 10

    console.log(`Tempo de espera na rua 1: ${tempoRua1} segundos`)
    console.log(`Tempo de espera na rua 2: ${tempoRua2} segundos`)

    const newMessage = JSON.stringify([{
        "time": `${new Date().toLocaleString()}`,
        "streetTime1": `${tempoRua1}`,
        "streetTime2": `${tempoRua2}`,
    }])
    client.publish('/semaforo/time', newMessage, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
    console.log(`Publish to topic '/semaforo/time'`)
})