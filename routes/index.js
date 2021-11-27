const express = require('express');
const router = express.Router();
const os_utils = require('node-os-utils')
const os = require('node-os-utils').os
const drive = require('node-os-utils').drive
const memory = require('node-os-utils').mem
const dns = require('dns');
let dns_address = ''
let dns_family = ''

router.get('/', function(req, res, next) {
  ( async () => {
    const oos = await os.oos()
    const platform = await os.platform()
    const uptime = await (os_utils.os.uptime() / 60).toFixed(2)
    const ip = await os.ip()
    const hostname = await os.hostname()
    const type = await os.type()
    const arch = await os.arch()
    const drive_info = await drive.info()
    const memory_info = await memory.info()
    res.render('index', {
      oos: oos,
      platform: platform,
      uptime: uptime,
      ip: ip,
      hostname: hostname,
      type: type,
      arch: arch,
      drive_info: drive_info,
      memory_info: memory_info,
      dns_address: dns_address,
      dns_family: dns_family
    })
  })()
})

router.post('/dns', (req, res) => {
  dns.lookup(req.body.address, (err, addresses, family) => {
    dns_address = addresses
    dns_family = family
  })
  res.redirect('/#dns-analyzer')
})

module.exports = router