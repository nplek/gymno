import { Link } from "./link";
import { Page } from './page';

export class PagedData<T> {
    data = new Array<T>();
    meta = new Page();
    links = new Link();
}