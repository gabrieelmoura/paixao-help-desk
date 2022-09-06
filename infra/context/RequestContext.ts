import ApplicationContext from "./ApplicationContext"

export default interface RequestContext extends ApplicationContext {
  request: any
  response: any
}