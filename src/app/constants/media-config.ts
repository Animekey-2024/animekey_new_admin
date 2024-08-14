export type Platform = 'Web' | 'Mobile' | 'TV';

type MediaConfig = {
  [platform in Platform]: {
    thumbnails: string;
    banners: string;
  };
}

export const fileUrls: MediaConfig = {
  Web: { thumbnails: '', banners: '' },
  Mobile: { thumbnails: '', banners: '' },
  TV: { thumbnails: '', banners: '' },
};

export const aspectRatios: MediaConfig = {
  Web: { thumbnails: '', banners: '' },
  Mobile: { thumbnails: '', banners: '' },
  TV: { thumbnails: '', banners: '' },
};
