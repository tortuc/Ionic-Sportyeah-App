export interface Adapter<T> {

  deserialize(data: any): T;

  serialize(data: T): any;

}