export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type DevTreeLinks = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>