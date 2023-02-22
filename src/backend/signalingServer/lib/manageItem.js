module.exports = {
  addTransport : (socketID, transports, transport, roomName, consumer, peers) =>{

    transports = [
      ...transports,
      {socketId : socketID, transport, roomName, consumer,}
    ]
    peers[socketID] = {
        ...peers[socketID],
        transports:[
            ...peers[socketID].transports,
            transport.id,
        ]
    }
    return {transports, peers}
  },
  addProducer : (socketID, producers, producer, roomName, peers) => {
    //add the producer to the producers list
    producers = [
        ...producers,
        {socketId : socketID, producer, roomName,}
    ]
    //add producer id's to peer list
    peers[socketID] = {
        ...peers[socketID],
        producers:[
            ...peers[socketID].producers,
            producer.id,
        ]
    }
    return {producers, peers}
  },

  addConsumer : (socketID, consumers, consumer, roomName, peers) =>{
    //add the consumer to the consumers list
    consumers = [
        ...consumers,
        {socketId : socketID, consumer, roomName,}
    ]
    //add consumer id's to peer list
    peers[socketID] = {
        ...peers[socketID],
        consumers:[
            ...peers[socketID].consumers,
            consumer.id,
        ]
    }
    return {consumers, peers}
  },
  removeItems : (items, socketId, type, kind) =>{
    if(kind){
        items.forEach(item => {
            if ((item.socketId === socketId) && (item.producer.kind === kind)) {
            item[type].close()
            }
        })
        items = items.filter(item => ((item.producer.kind !== kind) || (item.socketId !== socketId)))
    }
    else{
        items.forEach(item => {
            if (item.socketId === socketId) {
            item[type].close()
            }
        })
        items = items.filter(item => item.socketId !== socketId)
    }
    return items
  },

  get_peers : (peers_in_room, new_peer)=>{
    let peers = []
    if (peers_in_room) {
        peers = peers_in_room || []
    } 

    peers_in_room = [...peers_in_room, new_peer]
    return peers_in_room
  },

  getTransport : (transports, socketId) => {
    // check transport's scoket ID's same as passed in
    // this socketID is not consumered yet
    const [producerTransport] = transports.filter(transport => (transport.socketId === socketId) && !transport.consumer)
    return producerTransport.transport
  },

  updeate_peers_info : () =>{

  }
}