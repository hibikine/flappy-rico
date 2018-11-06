import * as PIXI from 'pixi.js';
import orange from './assets/img/orange.png';
import background from './assets/img/background-1.png';
import rico from './assets/img/rico.png';
const { loader } = PIXI;

console.log(background);
const files = [orange, background, rico];
const addFiles = (loader: PIXI.loaders.Loader, files: string[]): void => {
  files.map(f => loader.add(f, f));
};
const load = new Promise<PIXI.loaders.ResourceDictionary>((resolve, reject) => {
  addFiles(loader, files);
  loader.onError.add(reject);
  loader.load((_loader: PIXI.loaders.Loader, resources: PIXI.loaders.ResourceDictionary) => resolve(resources));
});
export default load;
