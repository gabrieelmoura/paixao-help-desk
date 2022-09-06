import MysqlModule from "../mysql/MysqlModule"
import RedisModule from "../redis/RedisModule"
import RepositoryModule from "../repository/RepositoryModule"
import SecurityModule from "../security/SecurityModule"

export default [
  new MysqlModule(),
  new RepositoryModule(),
  new RedisModule(),
  new SecurityModule()
]

