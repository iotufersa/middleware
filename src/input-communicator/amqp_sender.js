const amqp = require('amqplib/callback_api');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const {BROKER_AMQP} = require('../config/brokers');

const msgDados = `{
    "service": "GerenciadorDeDados",
    "method": "ObterTodosOsDados",
    "data":
{
"lat": "25.9999",
"lon": "23.8736",
"resource": [ "temperatura", "umidade"],
"timeToGenerateData": "3",
"value": "gggggggg",
"uuid": "e8833720-11f3-11ea-8434-21413afe90cf"
}
}`;
const msgDispositivos = `{
    "service": "GerenciadorDeDispositivos",
    "method": "AtualizarDispositivo",
    "data":
{
    "lat": "25.9999",
    "lon": "23.8736",
    "resource": [ "temperatura", "umidade"],
    "timeToGenerateData": "4",
    "uri": "195.598.565/device/2",
    "protocol": "teste",
    "describe": "sensor para blablabla",
    "typeDevice": "sensor",
    "uuid": "adaaa880-11ef-11ea-8b63-db16e451139f"
}
}`;
// "uuid": "66234b80-1126-11ea-abf3-0de1ea1d9635"
try {
    amqp.connect(BROKER_AMQP, (err, conn) => {
        if (conn != undefined) {
            conn.createChannel((err, ch) => {
                var msg = msgDados;
                ch.assertQueue(config.async_input, { durable: false });
                ch.sendToQueue(config.async_input, new Buffer.from(msg));
                console.log(" [x] Enviada a mensagem: %s", msg);
            });
            setTimeout(function () { conn.close(); process.exit(0) }, 500);
        } else {
            console.log("Erro ao conectar ao servidor AMQP.")
        }
    });
    amqp.close();
}
catch (e) {
    console.log("Erro ao conectar ao servidor AMQP.")

}