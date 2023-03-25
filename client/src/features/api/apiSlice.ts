import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// TODO: Make API classes with RTK Query (redux based object)

type HTTPMethod = "GET" | "POST" | "PATCH";

type UrlPath = String[];

export interface Request<T = DataRequest<Object> | QueryRequest> {
    method: HTTPMethod,
    endpoint: UrlPath,
    data: T
}

interface DataRequest<T> {
    body: T
}

export class QueryRequest {

  constructor(readonly items: QueryItem[]) {}

  with(endpoint: string): FetchArgs {
    const [ base, args ] = endpoint.split('?');
    const items = Object.values(Object.assign({}, ...(args ?? '').split('&').map(v => {
      const item = QueryItem.fromString(v);
      return { [item.key]: item };
    })
    .concat(this.items.map(v => ({[v.key]: v})))) as {[val: string]: QueryItem});
    return {
      url: base,
      params: items.map(v => ({ [v.key]: v.value }))
    }
  }
}

export class QueryItem {

  constructor(
    readonly key: string, 
    readonly value: string
  ) {}

  static fromString(token: string) {
    const [ key, value ] = token.split('=');
    return new QueryItem(key, value);
  }

  toString(): string {
    return `${this.key}=${this.value}`;
  }
}

export const queryFrom = (endpoint: Endpoints) => (query: QueryRequest) => query.with(endpoint);

export interface Response<T> {
  status: number,
  message: string,
  data: T
}

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/api'}),
  endpoints: builder => ({}),
});

export enum Endpoints {
  bankStatements = "bankStatements",
}


export default apiSlice;

export const reducer = apiSlice.reducer;
