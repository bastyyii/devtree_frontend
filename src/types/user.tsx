export type User = {
    name: string
    lastname: string
    email: string
    handle: string
    _id: string
    description: string
    image: string
    links: string
}

export type UserHandle = Pick<User, 'description' | 'handle' | 'image' | 'name' | 'lastname' | 'links'>

export type RegisterUser = Pick<User, 'handle' | 'email' | 'name' | 'lastname'> & {
    password: string
    password_confirmation: string

}

export type LoginUser = Pick<User, 'email'> &{
    password: string
}

export type ProfileForm = Pick<User, 'handle' | 'description'>