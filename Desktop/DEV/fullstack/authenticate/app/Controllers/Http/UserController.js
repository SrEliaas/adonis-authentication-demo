'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {


    async index({ response }) {
        const users = await Database.select('username', 'age', 'email').from('users')
        return response.json(users)
    }

    async create({ request, response }) {
        const email = request.input('email')
        if (await User.findBy('email', email)) {
            response.status(400).json({ error: "User alredy exists!" })
        } else {
            const user = await User.create(request.only(['username', 'email', 'age', 'password']))
            user.password = undefined
            return response.json(user)
        }
    }

    async login({ request, response, auth }) {
        try {
            const { email, password } = request.all()
            await auth.attempt(email, password)
            return response.json({ success: "Logged in: " + email })
        } catch (error) {
            return response.status(400).json({ error: "Invalid Email/Password!" })
        }
    }

    async delete({ response, params }) {
        const user = await User.find(params.id)
        user.delete()

        return response.json('USER DELETED!')
    }

}

module.exports = UserController
