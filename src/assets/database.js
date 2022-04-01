let Database = {
  init: () => {
    Database.db = new loki('db.json')
    Database.records = Database.db.getCollection('records')
    if(!Database.records){
        Database.records = Database.db.addCollection('records')
        Database.records.insert([
            { sidea: 'The Twist', sideb: 'Let\'s Twist Again', artist: 'Chubby Checker', artistb: '' },
        ])
    }
  },
  printRecord: () => {
      console.log(Database.records.findOne())
  }
}
Database.init()

export default Database