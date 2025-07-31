export type PodcastResult = {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl?: string;
  collectionViewUrl: string;
  feedUrl?: string;
  trackViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  previewUrl?:string
  isStreamable?:boolean
  artworkUrl600?: string;
  collectionPrice?: number;
  trackPrice?: number;
  collectionHdPrice?: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount?: number;
  trackTimeMillis?: number;
  country?: string;
  currency?: string;
  primaryGenreName?: string;
  contentAdvisoryRating?: string;
  genreIds?: string[];
  genres?: string[];
  createdAt: Date;
};


export type ITunesSearchResponse = {
  resultCount: number;
  results: PodcastResult[];
};


export interface ITunesEpisode {
      episodeId: number;
        collectionId: number;
        collectionName: string;
        title: string;
        description?: string;
        shortDescription?: string;
        releaseDate: string | Date;
        episodeUrl?: string;
        previewUrl?: string;
        artworkUrl600?: string;
        trackViewUrl?: string;
}

export type Episode = {
  episodeId: string;
  trackId:       number;
  trackName:     string;
  collectionId:    number;
  title:           string;
  episodeUrl: string;
  shortDescription: string;
  previewUrl: string;
  collectionName: string;
  podcastName?:    string;
  description?:    string;
  releaseDate:     string;
  audioUrl?:       string;
  artworkUrl600?:  string;
  trackViewUrl?:   string;
};



export type PodcastType = {
  trackId: number;
  collectionName: string;
  trackName: string;
  artistName: string;
  artworkUrl600: string;
  previewUrl?: string;
  artistId?: number | null;
  collectionId: number;
  releaseDate: string;
  trackTimeMillis?: number;
  primaryGenreName?: string;
  isStreamable?: boolean;
};