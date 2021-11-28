const express = require('express');
const router = express.Router();
const node_os = require('os')
const process = require('process')
const os = require('node-os-utils').os
const drive = require('node-os-utils').drive
const memory = require('node-os-utils').mem
const dns = require('dns');
let dns_address = ''
let dns_family = ''

router.get('/', function(req, res, next) {
  ( async () => {
    const arch = await node_os.arch()
    const freemem = await (node_os.freemem()/1024)/1024
    const totalmem = await (node_os.totalmem()/1024)/1024
    const usagemem = await totalmem - freemem
    const homedir = await node_os.homedir()
    const hostname = await node_os.hostname()
    const networkInterfaces = await JSON.stringify(node_os.networkInterfaces())
    const platform = await node_os.platform()
    const tmpdir = await node_os.tmpdir()
    const type = await node_os.type()
    const uptime = await (node_os.uptime() / 60).toFixed(2)
    const user = await node_os.userInfo()
    res.render('index', {
      arch: arch,
      totalmem: totalmem,
      freemem: freemem,
      usagemem: usagemem,
      homedir: homedir,
      hostname: hostname,
      networkInterfaces: networkInterfaces,
      platform: platform,
      tmpdir: tmpdir,
      type: type,
      uptime: uptime,
      user: user,
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