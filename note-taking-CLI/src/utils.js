import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('<note>', 'create a new note', yargs => {
    return yargs.positional('note', {
      type: 'string',
      description: 'content of note'
    })
  }, (argv) => {
    console.log('command:', argv.note);
  })
  .demandCommand()
  .parse()
