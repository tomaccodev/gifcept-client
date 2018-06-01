import * as React from 'react';

import { IGif } from '../../../api/gifs';
import GifListItem from './GifListItem';

interface IGifListProps {
  gifs: IGif[];
}

export default ({ gifs }: IGifListProps) => (
  <div className="blocks-container">{gifs.map(g => <GifListItem key={g._id} gif={g} />)}</div>
);
