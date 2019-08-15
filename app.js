const fs = require ('fs')

const argv = require('yargs')
      .usage('Usage: $0 <command> [options]')
      .command('list', 'list JSON File content', function (yargs) {
        console.log('List JSON File Content')
      })
      .command('add', 'Add a new entry in JSON File', function (yargs) {
        return yargs.options({
                                  'title': {
                                    alias: 't',
                                    describe: 'Entry Title',
                                    demandOption: true
                                  },
                                  'body': {
                                    alias: 'b',
                                    describe: 'Entry Body',
                                    demandOption: true
                                  }
                                })
      })
      .command('read', 'Read a specific entry in JSON File', function (yargs) {
        return yargs.options({
                                  'title': {
                                    alias: 't',
                                    describe: 'Entry Title',
                                    demandOption: true
                                  }
                                })
      })
      .command('remove', 'Remove a specific entry in JSON File', function (yargs) {
        return yargs.options({
                                  'title': {
                                    alias: 't',
                                    describe: 'Entry Title',
                                    demandOption: true
                                  }
                                })
      })
      .help('h')
      .alias('h', 'help')
      .version(false)
      .argv;

const parseJsonAsync = (jsonString) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(jsonString))
    })
  })
}

fs.readFile('app.json', (err, data) => {
  if (err) throw err;

	if (argv._[0] === 'list') {
      parseJsonAsync(data).then(jsonData => {
                                            console.log('\nPrinting '+jsonData.length+' notes \n')
                                            jsonData.map(el => 
                                            {
                                              console.log('Title: '+el.title + '\n' + 'Body: '+el.body)
                                              console.log('****************')
                                            })
                                          }
                                )
  }
  
  if (argv._[0] === 'read') {
     parseJsonAsync(data).then(jsonData => jsonData.map(el => 
                                            {
                                              if(el.title === process.argv[4]){
                                                console.log('Note Found \n')
                                                console.log('Title: '+el.title + '\n' + 'Body: '+el.body)
                                              }
                                            }))
                                        
  }

  if(argv._[0] === 'add'){
    parseJsonAsync(data).then(jsonData => {
                                            jsonData.push( { title: process.argv[4], body: process.argv[6] });
                                            fs.writeFile('app.json', JSON.stringify(jsonData), function(err){
                                              if (err) throw err;
                                              console.log('\n Note Created')
                                            })
                                          }
                              )
                              
  }

  if(argv._[0] === 'remove'){
     parseJsonAsync(data).then(jsonData => {
                            fs.writeFile('app.json', JSON.stringify(jsonData.filter(el=>!(el.title === process.argv[4]))), function(err){
                                  if (err) throw err;
                                console.log('Note was removed \n')
                             })
                            }
                        )
                       
  }

});
