import { action, observable } from 'mobx';

import { getTags } from '../api/me';

export default class {
  @observable
  public tags: string[] = [];

  @observable
  public fetching = false;

  @action
  public getTags = async () => {
    try {
      if (!this.fetching) {
        this.fetching = true;
        this.tags = (await getTags()).sort();
      }
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  };

  @action
  public addMissingTags = (newTags: string[]) => {
    const caseInsensitiveTags = this.tags.map((t) => t.toLowerCase());
    let modified = false;
    for (const newTag of newTags) {
      if (!caseInsensitiveTags.includes(newTag.toLowerCase())) {
        this.tags.push(newTag);
        modified = true;
      }
    }
    if (modified) {
      this.tags = this.tags.sort();
    }
  };
}
