const bcrypt=require('bcrypt');

const Feed=require('../models/feed_model');
const User=require('../models/user_model');
const AdminBro = require('admin-bro')

const AdminBroExpressjs = require('admin-bro-expressjs')


AdminBro.registerAdapter(require('admin-bro-mongoose'))

const adminBro = new AdminBro({
    resources: [{
        resource: User,
        options: {
          properties: {
            encryptedPassword: {
              isVisible: false,
            },
            password: {
              type: 'string',
              
              isVisible: {
                list: false, edit: true, filter: false, show: false,
              },
            },
          },
          actions: {
            new: {
              before: async (request) => {
               console.log(request.payload.password)
               if(request.payload.password){
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                    password: undefined,
                    
                  }
                }
                console.log(request.payload.record);
                return request
              },
            }
          }
        }
      },
      {
        resource: Feed,
        options: {
          // We'll add this later
        }
      }
    
    ],
      rootPath: '/admin',
})
// const route = AdminBroExpressjs.buildRouter(adminBro)
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email })
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword)
        if (matched) {
          return user
        }
      }
      return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
  })
module.exports= router;