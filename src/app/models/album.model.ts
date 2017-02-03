// export class Album{
//     id?: string;
//     created?: string;
//     description?: string;
//     owner_id: string;
//     size?: string;
//     thumb_src?: string;
//     title?: string;
//     updated?: string;
// }
 import {Photo} from "./photo.model";
export class Album{
  aid: string;
  created: string;
  description: string;
  owner_id: string
  size: string
  thumb_id: string
  title: string
  updated: string
  thumbPhoto?: Photo;
}
