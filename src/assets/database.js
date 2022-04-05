var _db = 'test',
    _titles = 'jue',
    _options = 'jeff'

let Database = {
  init: async () => {
      return new Promise((resolve) => {
        _db = new window.loki('jukestudio.db', {
            autoload: true,
            autoloadCallback: () => {
                _titles = _db.getCollection('titles')
                _options = _db.getCollection('options')
                if (_titles === null) {
                    _titles = _db.addCollection('titles', { 'clone' : true })
                    _options = _db.addCollection('options', { 'clone' : true })
                    _options.insert({
                        allCaps: true,
                        quotes: true,
                        primaryColor: 'red',
                        artistFillColor: false,
                        titleFillColor: false,
                        font: 'retro',
                        style: 'arrows',
                        paperType: 'letter',
                        spacing: 'normal'
                      })
                      resolve()
                } else {
                    resolve()
                }
                _titles.addListener('insert', function (input) {
                    input.id = input.$loki
                    _db.getCollection('titles').update(input)
                })

            }
      })
    })
  },
  save: function () {
    _db.saveDatabase()
  },
  options: {
    get: (key = false) => {
        let options = _options.findOne()
        if (key in options) {
            return options[key]
        } else {
            return null
        }
    },
    set: function (key, value){
        if (key !== undefined && value !== undefined) {
            let options = _options.findOne()
            options[key] = value
            _options.update(options)
            Database.save()
        }
    } 
  }
}
//Database.init()

export default Database