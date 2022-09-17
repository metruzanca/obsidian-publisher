// Note! Don't edit these in place, instead update them on the backend and copy here.

export enum PlatformResponseStatus { Success, Failure }

type DefaultSuccessBody = {
  url: PublishedUrl
  /** For detecting when we have uncommitted changes */
  publishedAt: string
}

export type PlatformResponse<SuccessBody = object, FailureBody = object> = (
  | DefaultSuccessBody & SuccessBody & { status: PlatformResponseStatus.Success }
  | FailureBody & { status: PlatformResponseStatus.Failure }
)

export interface PlatformConstructor {
  new(apiKey: string): Platform;
}

export interface Platform {
  publish(): Promise<PlatformResponse>
  update(): Promise<PlatformResponse>
  unPublish(): Promise<PlatformResponse>
}

type Article = {
  title: string
  body_markdown: string
}

export enum PlatformName {
  DevTo = 'DevTo',
  HashNode = 'HashNode',
  Medium = 'Medium',
}

// Hmm this will get confusing.
export type PlatformUnion = (
  | {
    name: PlatformName.DevTo
    apiKey: string
  }
  | {
    name: PlatformName.HashNode
    apiKey: string
  }
  | {
    name: PlatformName.Medium
    apiKey: string
  }
)

export type Body = {
  platform: PlatformUnion[]
  article: Article
  id: string
}

type PublishedUrl = {
  path: string
  slug: string
}

export type Response = {
  // string is PlatformName
  platforms: {
    // Add data to specific platform like this
    // [PlatformName.DevTo]: PlatformResponse
    [platform: string | PlatformName]: PlatformResponse
  }
}


type PublishedArticleMeta = {
  [PlatformName.DevTo]: {
    id: number
    title: string
    description: string
    slug: string
    path: string
    url: string
  }
  [PlatformName.HashNode]: any
  [PlatformName.Medium]: any
}

export enum CanonicalSource {
  DevTo = 'DevTo',
  HashNode = 'HashNode',
  Medium = 'Medium',
  None = 'None',
}

// Note! update this when changing PlatformName
export interface PublisherSettings {
  canonicalSource: CanonicalSource,
  publishers: {
    [PlatformName.DevTo]: {
      enabled: boolean
      apiKey?: string
    }
    [PlatformName.HashNode]: {
      enabled: boolean
      apiKey?: string
    }
    [PlatformName.Medium]: {
      enabled: boolean
      apiKey?: string
    }
  }
}


export type PublisherData = {
  settings: PublisherSettings;
  articles: PublishedArticle[]
}

type PublishedArticle = {
  path: string
  platforms: PublishedArticleMeta
}