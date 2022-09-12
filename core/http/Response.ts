
export default interface Response<T> {

  send(body: T): Response<T>

  status(code: number): Response<T>

  header(name: string, value: string): Response<T>

}