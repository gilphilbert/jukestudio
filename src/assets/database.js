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
      get: id => {
        const title = _titles.get(id)
        return title
      },
      add: title => {
        const retVal = _titles.insert(title)
        _db.saveDatabase()
        return retVal
      },
      update: (id, title) => {
        let dbTitle = _titles.get(id)
        const keys = Object.keys(title)
        keys.forEach(key => {
          dbTitle[key] = title[key]
        })
        if (Object.keys(dbTitle).includes('styleOverride') && !keys.includes('styleOverride')) {
          delete(dbTitle.styleOverride)
        }
        _titles.update(dbTitle)
        _db.saveDatabase()
      },
      remove: id => {
        id = parseInt(id)
        const title = _titles.findOne({ 'id': id })
        _titles.remove(title)
        _db.saveDatabase()
      },
      list: () => {
        const titles = _titles.find()/*.map(title => {
          return {
            title: title.sidea,
            sideb: title.sideb,
            artist: title.artist
          }
        })*/
        return titles
      }
  }
}

export default Database