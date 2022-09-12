
export default interface Request<T> {

  body: T

  headers: Record<string, string>

  cookies: Record<string, string>

}