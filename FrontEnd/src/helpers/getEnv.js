export const getEnv = (envname) => {
  const env =import.meta.env
  return env[envname]

}

// export const getEnv = (envname) => {
//   return import.meta.env[envname];
// };