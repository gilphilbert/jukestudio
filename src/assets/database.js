var _db = null,
    _titles = null,
    _options = null

let Database = {
  init: () => {
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
  options: {
    get: function (key = false) {
        const options = _options.findOne()
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
            _db.saveDatabase()
        }
    } 
  },
  titles: {
      add: title => {
        return _titles.insert(title)
      },
      remove: id => {
        id = parseInt(id)
        const title = _titles.findOne({ 'id': id });
        _titles.remove(title)
        _db.saveDatabase()
      },
  }
}

export default Database