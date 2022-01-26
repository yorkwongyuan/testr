const { prompt } = require('enquirer')
const path = require('path')
const minimist = require('minimist')
const chalk = require('chalk')
const semver = require('semver')
const execa = require('execa')

const args = minimist(process.argv.slice(2))
const currentVersion = require('./package.json').version
const step = (msg) => console.log(chalk.cyan(msg))
const preId = args.preId
console.log('🚀 ~ file: ind123123ex.js ~ line 9 ~ preId', preId)

const inc = (i) => semver.inc(currentVersion, i, preId)
const bin = (name) => path.resolve(__dirname, './node_modules/.bin/' + name)
const run = (bin, args, opts) => execa(bin, args, {stdio: 'inherit', ...opts})
console.log(bin('jest'))
run(bin('jest'), ['--clearCache'])
async function main () {
  let targetVersion = args._[0]
  console.log('🚀 ~ file: index.js ~ line 13 ~ main ~ targetVersion', targetVersion)
  let increamentVersions = [
    'major',
    'minor',
    'patch',
    ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : ['custom'])
  ]
  // 如果用户没有输入版本号
  if (!targetVersion) {
    step('请选择要提升的版本位...')
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      choices: increamentVersions.map(i => `${i} ${inc(i)}`).concat(['custom'])
    })
    // 如果选择了自定义
    if (release === 'custom') {
      step('请输入新版本号...')
      targetVersion = (await prompt({
        type: 'input',
        name: 'version',
        initial: currentVersion
      })).version
      console.log('🚀 ~ file: index.js ~ line 31 ~ main ~ targetVersion', targetVersion)
    } else {
      targetVersion = release.match(/\((.*)\)/)
      console.log('🚀 ~ file: index.js ~ line 40 ~ main ~ targetVersion', targetVersion)
    }
  }
}

// main()