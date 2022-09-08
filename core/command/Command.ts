
export default interface Command<I, O> {

  run(input: I): Promise<O>

}