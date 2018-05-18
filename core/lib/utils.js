const fs = require('fs')
const path = require('path')

/**
 * Walk modules path and callback for each file
 * @param {String} modulesPath Path of modules directory
 * @param {String} excludeDir Directory to be excluded
 * @param {Function} callback Callback function
 */
const walk = module.exports.walk = (modulesPath, excludeDir, callback) => {
  fs.readdirSync(modulesPath).forEach(file => {
    var newPath = path.join(modulesPath, file)
    var stat = fs.statSync(newPath)
    if (stat.isFile() && /(.*)\.(js|coffee)$/.test(file)) {
      callback(newPath)
    } else if (stat.isDirectory() && file !== excludeDir) {
      walk(newPath, excludeDir, callback)
    }
  })
}