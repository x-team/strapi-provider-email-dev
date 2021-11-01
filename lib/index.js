// based on https://github.com/strapi/strapi/blob/master/packages/strapi-provider-email-amazon-ses/lib/index.js

'use strict';

const fs = require('fs-extra')
const path = require('path')

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'dev',
  name: 'Dev',

  init: (config = {}, settings = {}) => {  
    const publicDir = path.resolve(strapi.dir, 'public')
    const { dir = publicDir } = config

    return {
      send: async options => {
        const { 
          from, 
          to, 
          subject, 
          text, 
          html, 
        } = options

        strapi.log.info(`Email to <${options.to}>: "${options.subject}"`)

        if (options.text) {
          const filename = path.join(dir, 'email.txt')
          await fs.writeFile(filename, options.txt, 'utf8')
          strapi.log.info(`- wrote: ${filename}`)
        }
          
        if (options.html) {
          const filename = path.join(dir, 'email.html')
          await fs.writeFile(filename, options.html, 'utf8')
          
          strapi.log.info(`- wrote: ${filename}`)
        }
      },
    };
  },
};
