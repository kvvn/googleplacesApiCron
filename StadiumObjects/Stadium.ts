/**
 * Created by kvvn on 9/9/16.
 */
    import {Geometry} from "./Geometry";
    import {Photo} from "./Photo";
class Stadium {
    geometry: Geometry;
    id: string;
    name: string;
    photos: Array<Photo>;
    place_id: string;
    vicinity: string;
}

export {Stadium};