import MysqlModule from "../mysql/MysqlModule"
import RedisModule from "../redis/RedisModule"
import RepositoryModule from "../repository/RepositoryModule"
import SecurityModule from "../security/SecurityModule"
import ExpressModule from "../express/ExpressModule"

export default [
  new MysqlModule(),
  new RepositoryModule(),
  new RedisModule(),
  new SecurityModule(),
  new ExpressModule()
]

